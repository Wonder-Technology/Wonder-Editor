open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "FileInput ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _triggerClickShowInputEvent = (domChildren) => {
        let btn = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
        BaseEventTool.triggerClickEvent(btn)
      };
      let _triggerChangeTextAreaEvent = (value, domChildren) => {
        let article = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
        let textarea = WonderCommonlib.ArrayService.unsafeGet(article##children, 0);
        BaseEventTool.triggerChangeEvent(textarea, BaseEventTool.buildFormEvent(value))
      };
      let _triggerSubmitClickEvent = (domChildren) => {
        let article = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
        let submitBtn = WonderCommonlib.ArrayService.unsafeGet(article##children, 1);
        BaseEventTool.triggerClickEvent(submitBtn)
      };
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test workflow",
        () => {
          describe(
            "test snapshot",
            () => {
              test(
                "set showInput button text",
                () =>
                  ReactTestRenderer.create(<FileInput buttonText="showInput" />)
                  |> ReactTestTool.createSnapshotAndMatch
              );
              test(
                "click the showInput button, show the textarea and submit-button",
                () => {
                  let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
                  BaseEventTool.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "key in text",
                () => {
                  let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
                  BaseEventTool.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  BaseEventTool.triggerComponentEvent(
                    component,
                    _triggerChangeTextAreaEvent("you can input value in textarea")
                  );
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          );
          describe(
            "test logic",
            () =>
              test(
                "click submit-button,the onSubmit method should be called",
                () => {
                  let inputValue = "you can click submit after input value";
                  let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
                  let component =
                    ReactTestRenderer.create(<FileInput buttonText="showInput" onSubmit />);
                  BaseEventTool.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  BaseEventTool.triggerComponentEvent(
                    component,
                    _triggerChangeTextAreaEvent(inputValue)
                  );
                  BaseEventTool.triggerComponentEvent(component, _triggerSubmitClickEvent);
                  onSubmit |> expect |> toCalledWith([|inputValue|])
                }
              )
          )
        }
      );
      describe(
        "deal with the specific case",
        () =>
          describe(
            "test logic",
            () => {
              test(
                "if submit method not pass in, shouldn't handle onSubmit method",
                () => {
                  let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
                  let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
                  BaseEventTool.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  BaseEventTool.triggerComponentEvent(
                    component,
                    _triggerChangeTextAreaEvent("this is value")
                  );
                  BaseEventTool.triggerComponentEvent(component, _triggerSubmitClickEvent);
                  onSubmit |> expect |> not_ |> toCalled
                }
              );
              test(
                "if input value == '', click submit-button shouldn't handle onSubmit method",
                () => {
                  let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
                  let component =
                    ReactTestRenderer.create(<FileInput buttonText="showInput" onSubmit />);
                  BaseEventTool.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  BaseEventTool.triggerComponentEvent(component, _triggerChangeTextAreaEvent(""));
                  BaseEventTool.triggerComponentEvent(component, _triggerSubmitClickEvent);
                  onSubmit |> expect |> not_ |> toCalled
                }
              )
            }
          )
      )
    }
  );