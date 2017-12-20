open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "FileInput ui component",
    (_) => {
      let sandbox = getSandboxDefaultVal();
      let _clickShowInputEvent = (domChildren) => {
        let btn = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
        btn##props##onClick()
      };
      let _changeTextAreaEvent = (value, domChildren) => {
        let div = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
        let textarea = WonderCommonlib.ArraySystem.unsafeGet(div##children, 0);
        EventToolUI.triggerChangeEvent(textarea, value)
      };
      let _submitClickEvent = (domChildren) => {
        let div = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
        let submitBtn = WonderCommonlib.ArraySystem.unsafeGet(div##children, 1);
        submitBtn##props##onClick()
      };
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test workflow",
        () => {
          test(
            "set showInput button text",
            (_) => {
              let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "click the showInput button, show the textarea and submit-button",
            (_) => {
              let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
              EventToolUI.triggerComponentEvent(component, _clickShowInputEvent);
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "key in text",
            (_) => {
              let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
              EventToolUI.triggerComponentEvent(component, _clickShowInputEvent);
              EventToolUI.triggerComponentEvent(
                component,
                _changeTextAreaEvent("you can input value in textarea")
              );
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "click submit-button,the onSubmit method should be called",
            (_) => {
              let inputValue = "you can click submit after input value";
              let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FileInput buttonText="showInput" onSubmit />);
              EventToolUI.triggerComponentEvent(component, _clickShowInputEvent);
              EventToolUI.triggerComponentEvent(component, _changeTextAreaEvent(inputValue));
              EventToolUI.triggerComponentEvent(component, _submitClickEvent);
              onSubmit |> expect |> toCalledWith([inputValue])
            }
          )
        }
      );
      describe(
        "deal with the specific case",
        () => {
          test(
            "if submit method not pass in, shouldn't execute onSubmit method",
            (_) => {
              let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
              let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
              EventToolUI.triggerComponentEvent(component, _clickShowInputEvent);
              EventToolUI.triggerComponentEvent(component, _changeTextAreaEvent("this is value"));
              EventToolUI.triggerComponentEvent(component, _submitClickEvent);
              onSubmit |> expect |> not_ |> toCalled
            }
          );
          test(
            "if input value == '', click submit button shouldn't execute onSubmit method",
            (_) => {
              let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FileInput buttonText="showInput" onSubmit />);
              EventToolUI.triggerComponentEvent(component, _clickShowInputEvent);
              EventToolUI.triggerComponentEvent(component, _changeTextAreaEvent(""));
              EventToolUI.triggerComponentEvent(component, _submitClickEvent);
              onSubmit |> expect |> not_ |> toCalled
            }
          )
        }
      )
    }
  );