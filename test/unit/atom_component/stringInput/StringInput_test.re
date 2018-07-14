open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "StringInput",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _triggerChangeInputEvent = (value, domChildren) => {
        let input = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
        BaseEventTool.triggerChangeEvent(input, BaseEventTool.buildFormEvent(value))
      };
      let _triggerBlurEvent = (value, domChildren) => {
        let input = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
        BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value))
      };
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

      /* TODO add "key in '', trigger onBlur, the input value should be original name" case */

      describe(
        "test component arguments",
        () => {
          test(
            "test StringInput component hasn't argument",
            () => ReactTestRenderer.create(<StringInput />) |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test StringInput component has defaultValue",
            () =>
              ReactTestRenderer.create(<StringInput defaultValue="#ffffff" />)
              |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test StringInput component has label",
            () =>
              ReactTestRenderer.create(<StringInput label="color" />)
              |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test StringInput component has defaultValue and label",
            () =>
              ReactTestRenderer.create(<StringInput defaultValue="#c0c0c0" label="color" />)
              |> ReactTestTool.createSnapshotAndMatch
          )
        }
      );
      describe(
        "test component set value and trigger event",
        () => {
          test(
            /* TODO rename symbol to string */
            "stringInput component can set any symbol",
            () => {
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="2" label="xyz" />);
              BaseEventTool.triggerComponentEvent(
                component,
                _triggerChangeInputEvent("hello world")
              );
              BaseEventTool.triggerComponentEvent(
                component,
                _triggerChangeInputEvent("351687.5445456654")
              );
              component |> ReactTestTool.createSnapshotAndMatch
            }
          );

describe(
"test onChange",
() => {
test(
"exec onChange handle on change event",
() => {
  let value = ref("");
  let str = "-2313";
              let onChange = (str) => value := str;
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="22" label="xyz" onChange />);
              BaseEventTool.triggerComponentEvent(component, _triggerChangeInputEvent(str));

value^ |> expect == str

 }
);
 }
);



/* describe(
"test onBlur",
() => {
/* TODO fix as below */
 }
); */




          /* test(
            "trigger onChange method when pass in",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="22" label="xyz" onChange />);
              BaseEventTool.triggerComponentEvent(component, _triggerChangeInputEvent("-2313"));
              onChange |> expect |> toCalled
            }
          );
          test(
            "trigger onBlur method when pass in",
            () => {
              let onBlur = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="22" label="xyz" onBlur />);
              BaseEventTool.triggerComponentEvent(component, _triggerChangeInputEvent("-23"));
              BaseEventTool.triggerComponentEvent(component, _triggerBlurEvent("-23"));
              onBlur |> expect |> toCalled
            }
          ) */
        }
      );
      /* describe(
        "deal with the specific case",
        () => {
          let sandbox = getSandboxDefaultVal();
          beforeEach(() => sandbox := createSandbox());
          afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
          test(
            "if onBlur method not pass in, shouldn't handle onBlur method",
            () => {
              let onBlur = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="22" label="xyz" />);
              BaseEventTool.triggerComponentEvent(component, _triggerChangeInputEvent("-23"));
              BaseEventTool.triggerComponentEvent(component, _triggerBlurEvent("-23"));
              onBlur |> expect |> not_ |> toCalled
            }
          );
          test(
            "if onChange method not pass in, shouldn't handle onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="22" label="xyz" />);
              BaseEventTool.triggerComponentEvent(component, _triggerChangeInputEvent("-2313"));
              onChange |> expect |> not_ |> toCalled
            }
          )
        }
      ) */
    }
  );