open ComposableParseType;

let convertDataToRecord = (jsonData) =>
  Json.(
    Decode.(
      jsonData
      |> Js.Json.parseExn
      |> array(
           (json) => {
             name: json |> field("name", string),
             stateName: json |> field("stateName", string)
           }
         )
    )
  );