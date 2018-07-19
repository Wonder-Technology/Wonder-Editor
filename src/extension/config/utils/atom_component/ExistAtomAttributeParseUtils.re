open ExistAtomAttributeType;

let convertDataToRecord = (jsonData) =>
  WonderBsJson.Json.(
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

let getAtomAttributeRecord = () => Exist_Atom_attribute.atom_attibute |> convertDataToRecord;