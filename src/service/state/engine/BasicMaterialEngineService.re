open Wonderjs;

let create = BasicMaterialAPI.createBasicMaterial;

let getColor = BasicMaterialAPI.getBasicMaterialColor;

let unsafeGetBasicMaterialGameObject = BasicMaterialAPI.unsafeGetBasicMaterialGameObject;

let getBasicMaterialGameObject = (material, engineState) =>
  GameObjectBasicMaterialService.getGameObject(
    material,
    RecordBasicMaterialMainService.getRecord(engineState),
  );

let getBasicMaterialGameObject = (material, engineState) =>
  GameObjectBasicMaterialService.getGameObject(
    material,
    RecordBasicMaterialMainService.getRecord(engineState),
  );

let disposeBasicMaterial = (materialArr, state) =>
  BasicMaterialAPI.batchDisposeBasicMaterial(state, materialArr);

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

let getAllBasicMaterials = BasicMaterialAPI.getAllBasicMaterials;