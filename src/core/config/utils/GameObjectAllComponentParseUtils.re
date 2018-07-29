open GameObjectAllComponentParseType;

let convertDataToRecord = jsonData =>
  WonderBsJson.Json.(
    Decode.(
      jsonData
      |> Js.Json.parseExn
      |> array(json =>
           {
             type_: json |> field("type", string),
             components:
               json
               |> field(
                    "components",
                    array(json => {type_: json |> field("type", string)}),
                  ),
           }
         )
    )
  );

let getGameObjectAllComponentConfig = () =>
  GameObject_all_component.gameObject_all_component_test
  |> convertDataToRecord;