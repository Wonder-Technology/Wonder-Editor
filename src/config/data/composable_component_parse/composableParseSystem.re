open ComposableParseType;

let convertDataToRecord = (jsonData) =>
  Json.(
    Decode.(
      jsonData
      |> Js.Json.parseExn
      |> array(
           (json) => {
             name: json |> field("name", string),
             props:
               json
               |> field(
                    "props",
                    array(
                      (json) => {
                        name: json |> field("name", string),
                        value: json |> field("value", string),
                        type_: json |> field("type", string)
                      }
                    )
                  )
           }
         )
    )
  );