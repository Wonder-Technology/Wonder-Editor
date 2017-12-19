open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let clickShowInputEvent = (domChildren) => {
  let btn = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
  btn##props##onClick()
};

let changeTextAreaEvent = (value, domChildren) => {
  let div = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
  let textarea = WonderCommonlib.ArraySystem.unsafeGet(div##children, 0);
  TestToolUI.execChangeEvent(textarea, value)
};

let submitClickEvent = (domChildren) => {
  let div = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
  let submitBtn = WonderCommonlib.ArraySystem.unsafeGet(div##children, 1);
  submitBtn##props##onClick()
};

let _ =
  describe(
    "fileInput ui component",
    (_) => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "set showInput button text",
        (_) => {
          let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "click the showInput button, show the textarea and submit button",
        (_) => {
          let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
          TestToolUI.execComponentEvent(component, clickShowInputEvent);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "input text after click the showInput button",
        (_) => {
          let component = ReactTestRenderer.create(<FileInput buttonText="showInput" />);
          TestToolUI.execComponentEvent(component, clickShowInputEvent);
          TestToolUI.execComponentEvent(
            component,
            changeTextAreaEvent("you can input value in textarea")
          );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "click submit button after input text,the onSubmit method should be called",
        (_) => {
          let inputValue = "you can click submit after input value";
          let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
          let component = ReactTestRenderer.create(<FileInput buttonText="showInput" onSubmit />);
          TestToolUI.execComponentEvent(component, clickShowInputEvent);
          TestToolUI.execComponentEvent(component, changeTextAreaEvent(inputValue));
          TestToolUI.execComponentEvent(component, submitClickEvent);
          onSubmit |> expect |> toCalledWith([inputValue])
        }
      );
      describe(
        "deal with the specific case",
        () => {
          test(
            "if submit method not pass in, shouldn't execute onSubmit method",
            (_) => {
              let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FileInput buttonText="showInput" />);
              TestToolUI.execComponentEvent(component, clickShowInputEvent);
              TestToolUI.execComponentEvent(component, changeTextAreaEvent("this is value"));
              TestToolUI.execComponentEvent(component, submitClickEvent);
              onSubmit |> expect |> not_ |> toCalled
            }
          );
          test(
            "if input value == '', click submit button shouldn't execute onSubmit method",
            (_) => {
              let onSubmit = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FileInput buttonText="showInput" onSubmit />);
              TestToolUI.execComponentEvent(component, clickShowInputEvent);
              TestToolUI.execComponentEvent(component, changeTextAreaEvent(""));
              TestToolUI.execComponentEvent(component, submitClickEvent);
              onSubmit |> expect |> not_ |> toCalled
            }
          )
        }
      )
    }
  );