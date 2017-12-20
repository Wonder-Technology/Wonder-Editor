open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "FloatInput ui component",
    (_) => {
      test(
        "FloatInput component hasn't argument",
        (_) => {
          let component = ReactTestRenderer.create(<FloatInput />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "FloatInput component has defaultValue",
        (_) => {
          let component = ReactTestRenderer.create(<FloatInput defaultValue="12.2" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "FloatInput component has label",
        (_) => {
          let component = ReactTestRenderer.create(<FloatInput label="xyz" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "FloatInput component has defaultValue and label",
        (_) => {
          let component = ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      describe(
        "deal with the specific case",
        () => {
          let _changeInputEvent = (value, domChildren) => {
            let input = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
            EventToolUI.triggerChangeEvent(input, value)
          };
          let sandbox = getSandboxDefaultVal();
          beforeEach(() => sandbox := createSandbox());
          afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
          test(
            "input value '', store in self state None, onChange method called with 0",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" onChange />);
              EventToolUI.triggerComponentEvent(component, _changeInputEvent(""));
              onChange |> expect |> toCalledWith([0])
            }
          );
          test(
            "input value '-', store in self state, not execute onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" onChange />);
              EventToolUI.triggerComponentEvent(component, _changeInputEvent("-"));
              onChange |> expect |> not_ |> toCalled
            }
          );
          test(
            "if onChange method not pass in, shouldn't execute onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
              EventToolUI.triggerComponentEvent(component, _changeInputEvent("-2313"));
              onChange |> expect |> not_ |> toCalled
            }
          )
        }
      )
    }
  );