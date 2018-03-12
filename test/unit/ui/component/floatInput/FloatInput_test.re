open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "FloatInput ui component",
    () => {
      let _triggerChangeInputEvent = (value, domChildren) => {
        let input = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
        BaseEventTool.triggerChangeEvent(input, BaseEventTool.buildFormEvent(value))
      };
      let _triggerBlurEvent = (value, domChildren) => {
        let input = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
        BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value))
      };
      describe(
        "test snapshot",
        () => {
          test(
            "test FloatInput component hasn't argument",
            () => ReactTestRenderer.create(<FloatInput />) |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test FloatInput component has defaultValue",
            () =>
              ReactTestRenderer.create(<FloatInput defaultValue="12.2" />)
              |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test FloatInput component has label",
            () =>
              ReactTestRenderer.create(<FloatInput label="xyz" />) |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test FloatInput component has defaultValue and label",
            () =>
              ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />)
              |> ReactTestTool.createSnapshotAndMatch
          );
          describe(
            "test FloatInput component set float value",
            () => {
              test(
                "if float value's decimal digits <= 6, can set the whole value",
                () => {
                  let component =
                    ReactTestRenderer.create(<FloatInput defaultValue="2" label="xyz" />);
                  BaseEventTool.triggerComponentEvent(
                    component,
                    _triggerChangeInputEvent("351687.54654")
                  );
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "else, can't set the value",
                () => {
                  let component =
                    ReactTestRenderer.create(<FloatInput defaultValue="0" label="xyz" />);
                  BaseEventTool.triggerComponentEvent(
                    component,
                    _triggerChangeInputEvent("3.524584654")
                  );
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              )
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
            "key in value '', shouldn't handle onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" onChange />);
              BaseEventTool.triggerComponentEvent(component, _triggerChangeInputEvent(""));
              onChange |> expect |> not_ |> toCalled
            }
          );
          test(
            "key in value '-', shouldn't handle onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" onChange />);
              BaseEventTool.triggerComponentEvent(component, _triggerChangeInputEvent("-"));
              onChange |> expect |> not_ |> toCalled
            }
          );
          test(
            "if onBlur method not pass in, shouldn't handle onBlur method",
            () => {
              let onBlur = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
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
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
              BaseEventTool.triggerComponentEvent(component, _triggerChangeInputEvent("-2313"));
              onChange |> expect |> not_ |> toCalled
            }
          )
        }
      )
    }
  );