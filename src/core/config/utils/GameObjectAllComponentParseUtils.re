open GameObjectAllComponentParseType;

let convertDataToRecord = jsonData =>
  WonderBsJson.Json.(
    Decode.(
      jsonData
      |> Js.Json.parseExn
      |> array(json =>
           {
             type_: json |> field("type", string),
             include_component:
               json |> field("include_component", array(string)),
             exclude_component:
               json |> field("exclude_component", array(string)),
             all_component:
               json
               |> field(
                    "all_component",
                    array(json => {type_: json |> field("type", string)}),
                  ),
           }
         )
    )
  );

let convertDataToRecordTest = jsonData =>
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
  GameObject_all_component.gameObject_all_component |> convertDataToRecord;

let getGameObjectAllComponentConfigTest = () =>
  GameObject_all_component.gameObject_all_component_test
  |> convertDataToRecordTest;