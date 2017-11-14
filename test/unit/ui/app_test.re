open Wonder_jest;

open ExpectJs;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "reactTestRenderer",
    (_) => {
      test(
        "create returns ReactTestInstance",
        (_) => {
          let component = ReactTestRenderer.create(<App state=AppStore.state dispatch=Reductive.Store.dispatch(IndexStore.store)/>);
          expect(toObject(component)) |> toContainProperties([|"_component"|])
        }
      );
      /* test(
        "toJSON returns test rendered JSON",
        (_) => {
          let component = ReactTestRenderer.create(<Tester />);
          /* let component = ReactTestRenderer.create(<App state=AppStore.state dispatch=Reductive.Store.dispatch(IndexStore.store)/>); */
          let json = ReactTestRenderer.toJSON(component);
          let expected =
            Js.Json.parseExn(
              {|
      {
        "type": "div",
        "props": {},
        "children": [ "Tester" ]
      }
    |}
            );
          expect(json) |> toEqual(expected)
        }
      ) */
    }
  );