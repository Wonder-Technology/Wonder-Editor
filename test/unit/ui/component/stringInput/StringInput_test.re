open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "StringInput ui component",
    () => {
      let _triggerChangeInputEvent = (value, domChildren) => {
        let input = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
        EventToolUI.triggerChangeEvent(input, EventToolUI.buildFormEvent(value))
      };
      let _triggerBlurEvent = (value, domChildren) => {
        let input = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
        EventToolUI.triggerBlurEvent(input, EventToolUI.buildFormEvent(value))
      };
      describe(
        "test snapshot",
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
          );
          describe(
            "test StringInput component set value",
            () => {
              test(
                "stringInput component can set any symbol",
                () => {
                  let component =
                    ReactTestRenderer.create(<StringInput defaultValue="2" label="xyz" />);
                  EventToolUI.triggerComponentEvent(
                    component,
                    _triggerChangeInputEvent("351687.5445456654")
                  );
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "stringInput component can set any symbol",
                () => {
                  let component =
                    ReactTestRenderer.create(<StringInput defaultValue="2" label="xyz" />);
                  EventToolUI.triggerComponentEvent(
                    component,
                    _triggerChangeInputEvent("hello world")
                  );
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          )
        }
      );
      describe(
        "test logic",
        () => {
          let sandbox = getSandboxDefaultVal();
          beforeEach(() => sandbox := createSandbox());
          afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
          test(
            "trigger onChange method when pass in",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="22" label="xyz" onChange />);
              EventToolUI.triggerComponentEvent(component, _triggerChangeInputEvent("-2313"));
              onChange |> expect |> toCalled
            }
          );
          test(
            "trigger onBlur method when pass in",
            () => {
              let onBlur = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="22" label="xyz" onBlur />);
              EventToolUI.triggerComponentEvent(component, _triggerChangeInputEvent("-23"));
              EventToolUI.triggerComponentEvent(component, _triggerBlurEvent("-23"));
              onBlur |> expect |> toCalled
            }
          )
        }
      );
      describe(
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
              EventToolUI.triggerComponentEvent(component, _triggerChangeInputEvent("-23"));
              EventToolUI.triggerComponentEvent(component, _triggerBlurEvent("-23"));
              onBlur |> expect |> not_ |> toCalled
            }
          );
          test(
            "if onChange method not pass in, shouldn't handle onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<StringInput defaultValue="22" label="xyz" />);
              EventToolUI.triggerComponentEvent(component, _triggerChangeInputEvent("-2313"));
              onChange |> expect |> not_ |> toCalled
            }
          )
        }
      )
    }
  );