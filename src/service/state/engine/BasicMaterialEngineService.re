open Wonderjs;

let create = BasicMaterialAPI.createBasicMaterial;

let getColor = BasicMaterialAPI.getBasicMaterialColor;

let disposeBasicMaterial = (materialArr, state) =>
  BasicMaterialAPI.batchDisposeBasicMaterial(state, materialArr);

let unsafeGetBasicMaterialName = BasicMaterialAPI.unsafeGetBasicMaterialName;

let setBasicMaterialName = BasicMaterialAPI.setBasicMaterialName;

let setColor = (color, material, engineState) =>
  engineState |> BasicMaterialAPI.setBasicMaterialColor(material, color);

let hasMap = OperateBasicMaterialMainService.hasMap;

let getMap = OperateBasicMaterialMainService.getMap;

let unsafeGetMap = BasicMaterialAPI.unsafeGetBasicMaterialMap;

let setMap = (map, material, engineState) =>
  engineState |> BasicMaterialAPI.setBasicMaterialMap(material, map);