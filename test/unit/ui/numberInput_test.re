open Jest;

open ExpectJs;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "reactTestRenderer",
    (_) => {
      test(
        "create returns ReactTestInstance",
        (_) => {
          let component = ReactTestRenderer.create(<NumberInput />);
          expect(toObject(component)) |> toContainProperties([|"_component"|])
        }
      );
      test(
        "numberInput component has no argument",
        (_) => {
          let component = ReactTestRenderer.create(<NumberInput />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "numberInput component has defaultValue",
        (_) => {
          let component = ReactTestRenderer.create(<NumberInput defaultValue="12.2" />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "numberInput component has label",
        (_) => {
          let component = ReactTestRenderer.create(<NumberInput label="xyz"/>);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "numberInput component has defaultValue and label",
        (_) => {
          let component = ReactTestRenderer.create(<NumberInput defaultValue="22" label="xyz"/>);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
    }
  );