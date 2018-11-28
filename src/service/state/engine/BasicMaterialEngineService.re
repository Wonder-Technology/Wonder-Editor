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

let reInitMaterials = BasicMaterialAPI.reInitMaterials;

let reInitAllBasicMaterialsAndClearShaderCache = (materials, engineState) =>
  engineState
  |> reInitMaterials(materials)
  |> ShaderEngineService.clearShaderCache;

/* let getAllBasicMaterials = BasicMaterialAPI.getAllBasicMaterials; */