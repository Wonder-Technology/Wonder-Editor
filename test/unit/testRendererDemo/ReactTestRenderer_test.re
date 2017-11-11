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
          let component = ReactTestRenderer.create(<Tester />);
          expect(toObject(component)) |> toContainProperties([|"_component"|])
        }
      );
      test(
        "toJSON returns test rendered JSON",
        (_) => {
          let component = ReactTestRenderer.create(<Tester />);
          let json = ReactTestRenderer.toJSON(component);
          let expected =
            Js.Json.parseExn(
              {|
      {
        "type": "div",
        "props": {
          "className":"fck"
        },
            "children":[
                {
                   "type":"div",
                   "props":{
                       "className":"fff number-input-input"
                    },
                   "children":["xxx"]
                }
            ]
      }
    |}
            );
          /* expect(json) |> toEqual(expected) */

          toMatchSnapshot(expect(json));
        }
      )
    }
  );
