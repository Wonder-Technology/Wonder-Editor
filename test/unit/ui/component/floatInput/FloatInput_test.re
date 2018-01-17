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
        EventToolUI.triggerChangeEvent(input, EventToolUI.buildFormEvent(value))
      };
      describe(
        "test snapshot",
        () => {
          test(
            "test FloatInput component hasn't argument",
            () => {
              let component = ReactTestRenderer.create(<FloatInput />);
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "test FloatInput component has defaultValue",
            () => {
              let component = ReactTestRenderer.create(<FloatInput defaultValue="12.2" />);
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "test FloatInput component has label",
            () => {
              let component = ReactTestRenderer.create(<FloatInput label="xyz" />);
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "test FloatInput component has defaultValue and label",
            () => {
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          describe(
            "test FloatInput component set float value",
            () => {
              test(
                "if float value's decimal digits <= 6, can set the whole value",
                () => {
                  let component =
                    ReactTestRenderer.create(<FloatInput defaultValue="2" label="xyz" />);
                  EventToolUI.triggerComponentEvent(
                    component,
                    _triggerChangeInputEvent("351687.54654")
                  );
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              );
              test(
                "else, can't set the value",
                () => {
                  let component =
                    ReactTestRenderer.create(<FloatInput defaultValue="0" label="xyz" />);
                  EventToolUI.triggerComponentEvent(
                    component,
                    _triggerChangeInputEvent("3.524584654")
                  );
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
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
            "key in value '', onChange method called with 0",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" onChange />);
              EventToolUI.triggerComponentEvent(component, _triggerChangeInputEvent(""));
              onChange |> expect |> toCalledWith([|0|])
            }
          );
          test(
            "key in value '-', shouldn't handle onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" onChange />);
              EventToolUI.triggerComponentEvent(component, _triggerChangeInputEvent("-"));
              onChange |> expect |> not_ |> toCalled
            }
          );
          test(
            "if onChange method not pass in, shouldn't handle onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
              EventToolUI.triggerComponentEvent(component, _triggerChangeInputEvent("-2313"));
              onChange |> expect |> not_ |> toCalled
            }
          )
        }
      )
    }
  );