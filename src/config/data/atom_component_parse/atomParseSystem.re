open AtomParseType;

let convertDataToRecord = (jsonData) =>
  Json.(
    Decode.(
      jsonData
      |> Js.Json.parseExn
      |> array(
           (json) => {
             name: json |> field("name", string),
             existProps:
               json |> field("existProps", array((json) => {name: json |> field("name", string)}))
           }
         )
    )
  );