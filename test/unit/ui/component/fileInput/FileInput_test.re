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
        let btn = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
        EventToolUI.triggerClickEvent(btn)
      };
      let _triggerChangeTextAreaEvent = (value, domChildren) => {
        let article = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
        let textarea = WonderCommonlib.ArraySystem.unsafeGet(article##children, 0);
        EventToolUI.triggerChangeEvent(textarea, EventToolUI.buildFormEvent(value))
      };
      let _triggerSubmitClickEvent = (domChildren) => {
        let article = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
        let submitBtn = WonderCommonlib.ArraySystem.unsafeGet(article##children, 1);
        EventToolUI.triggerClickEvent(submitBtn)
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
                  EventToolUI.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "key in text",
                () => {
                  let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
                  EventToolUI.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  EventToolUI.triggerComponentEvent(
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
                  EventToolUI.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  EventToolUI.triggerComponentEvent(
                    component,
                    _triggerChangeTextAreaEvent(inputValue)
                  );
                  EventToolUI.triggerComponentEvent(component, _triggerSubmitClickEvent);
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
                  EventToolUI.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  EventToolUI.triggerComponentEvent(
                    component,
                    _triggerChangeTextAreaEvent("this is value")
                  );
                  EventToolUI.triggerComponentEvent(component, _triggerSubmitClickEvent);
                  onSubmit |> expect |> not_ |> toCalled
                }
              );
              test(
                "if input value == '', click submit-button shouldn't handle onSubmit method",
                () => {
                  let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
                  let component =
                    ReactTestRenderer.create(<FileInput buttonText="showInput" onSubmit />);
                  EventToolUI.triggerComponentEvent(component, _triggerClickShowInputEvent);
                  EventToolUI.triggerComponentEvent(component, _triggerChangeTextAreaEvent(""));
                  EventToolUI.triggerComponentEvent(component, _triggerSubmitClickEvent);
                  onSubmit |> expect |> not_ |> toCalled
                }
              )
            }
          )
      )
    }
  );