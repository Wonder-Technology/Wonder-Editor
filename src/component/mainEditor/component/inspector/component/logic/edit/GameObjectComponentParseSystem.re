open GameObjectComponentParseType;

let convertDataToRecord = (jsonData) =>
  Json.(
    Decode.(
      jsonData
      |> Js.Json.parseExn
      |> array((json) => {componentName: json |> field("name", string)})
    )
  );