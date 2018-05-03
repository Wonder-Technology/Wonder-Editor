open Wonderjs;

let create = BasicMaterialAPI.createBasicMaterial;

let getColor = BasicMaterialAPI.getBasicMaterialColor;

let setColor = (color, material, engineState) =>
  engineState |> BasicMaterialAPI.setBasicMaterialColor(material, color);