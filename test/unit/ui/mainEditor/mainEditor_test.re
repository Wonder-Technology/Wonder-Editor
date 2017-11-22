open Wonder_jest;

open ExpectJs;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "mainEditor component",
    (_) => {
      test(
        "create returns ReactTestInstance",
        (_) => {
          let state = UiBaseTool.buildFakeAppState();
          let component = ReactTestRenderer.create(<MainEditor state />);
          expect(toObject(component)) |> toContainProperties([|"_component"|])
        }
      );
      test(
        "render component",
        (_) => {
          let state = UiBaseTool.buildFakeAppState();
          let component = ReactTestRenderer.create(<MainEditor state />);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      )
    }
  );