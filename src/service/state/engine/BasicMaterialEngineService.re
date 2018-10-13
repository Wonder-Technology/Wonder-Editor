open Wonderjs;

let create = BasicMaterialAPI.createBasicMaterial;

let getColor = BasicMaterialAPI.getBasicMaterialColor;

let unsafeGetBasicMaterialGameObjects = BasicMaterialAPI.unsafeGetBasicMaterialGameObjects;

let getBasicMaterialGameObjects = (material, engineState) =>
  GameObjectBasicMaterialService.getGameObjects(
    material,
    RecordBasicMaterialMainService.getRecord(engineState),
  );

let getBasicMaterialName = NameBasicMaterialMainService.getName;

let unsafeGetBasicMaterialName = BasicMaterialAPI.unsafeGetBasicMaterialName;

let setBasicMaterialName = BasicMaterialAPI.setBasicMaterialName;

let setColor = (color, material, engineState) =>
  engineState |> BasicMaterialAPI.setBasicMaterialColor(material, color);

let hasBasicMaterialMap = OperateBasicMaterialMainService.hasMap;

let getBasicMaterialMap = OperateBasicMaterialMainService.getMap;

let unsafeGetBasicMaterialMap = BasicMaterialAPI.unsafeGetBasicMaterialMap;

let setBasicMaterialMap = (map, material, engineState) =>
  engineState |> BasicMaterialAPI.setBasicMaterialMap(material, map);

let isBasicMaterialMap = (material, texture, engineState) =>
  switch (getBasicMaterialMap(material, engineState)) {
  | Some(map) when map === texture => true
  | _ => false
  };

let removeBasicMaterialMap = BasicMaterialAPI.removeBasicMaterialMap;

let _reInitMaterials = BasicMaterialAPI.reInitMaterials;

let reInitAllBasicMaterialsAndClearShaderCache = (materials, engineState) =>
  engineState
  |> _reInitMaterials(materials)
  |> ShaderEngineService.clearShaderCache;

let getAllBasicMaterials = BasicMaterialAPI.getAllBasicMaterials;