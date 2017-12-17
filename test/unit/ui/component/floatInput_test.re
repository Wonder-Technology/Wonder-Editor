open Wonder_jest;

open ExpectJs;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "numberInput ui component",
    (_) => {
      test(
        "numberInput component hasn't argument",
        (_) => {
          let component = ReactTestRenderer.create(<FloatInput />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "numberInput component has defaultValue",
        (_) => {
          let component = ReactTestRenderer.create(<FloatInput defaultValue="12.2" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "numberInput component has label",
        (_) => {
          let component = ReactTestRenderer.create(<FloatInput label="xyz" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "numberInput component has defaultValue and label",
        (_) => {
          let component = ReactTestRenderer.create(<FloatInput defaultValue="22" label="xyz" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      )
    }
  );