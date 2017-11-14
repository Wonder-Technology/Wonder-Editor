open ComponentParseType;

let convertDataToRecord = (jsonData) =>
  Json.(
    Decode.(
      jsonData
      |> Js.Json.parseExn
      |> array(
           (json) => {
             name: json |> field("name", string),
             components:
               json
               |> field(
                    "components",
                    array(
                      (json) => {
                        name: json |> field("name", string),
                        value: json |> field("value", string)
                      }
                    )
                  )
           }
         )
    )
  );