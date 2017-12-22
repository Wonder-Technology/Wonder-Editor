open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "FloatInput ui component",
    () => {
      test(
        "FloatInput component hasn't argument",
        () => {
          let component = ReactTestRenderer.create(<FloatInput />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "FloatInput component has defaultValue",
        () => {
          let component = ReactTestRenderer.create(<FloatInput defaultValue="12.2" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "FloatInput component has label",
        () => {
          let component = ReactTestRenderer.create(<FloatInput label="xyz" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "FloatInput component has defaultValue and label",
        () => {
          let component = ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      describe(
        "deal with the specific case",
        () => {
          let changeInputEvent = (value, domChildren) => {
            let input = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
            EventToolUI.triggerChangeEvent(input, EventToolUI.buildFormEvent(value))
          };
          let sandbox = getSandboxDefaultVal();
          beforeEach(() => sandbox := createSandbox());
          afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
          test(
            "key in value '', onChange method called with 0",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" onChange />);
              EventToolUI.triggerComponentEvent(component, changeInputEvent(""));
              onChange |> expect |> toCalledWith([0])
            }
          );
          test(
            "key in value '-', shouldn't handle onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" onChange />);
              EventToolUI.triggerComponentEvent(component, changeInputEvent("-"));
              onChange |> expect |> not_ |> toCalled
            }
          );
          test(
            "if onChange method not pass in, shouldn't handle onChange method",
            () => {
              let onChange = createEmptyStubWithJsObjSandbox(sandbox);
              let component =
                ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
              EventToolUI.triggerComponentEvent(component, changeInputEvent("-2313"));
              onChange |> expect |> not_ |> toCalled
            }
          )
        }
      )
    }
  );