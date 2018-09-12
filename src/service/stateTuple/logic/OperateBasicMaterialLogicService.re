

let createBasicMaterial = engineState => {
  let (engineState, material) =
    engineState |> BasicMaterialEngineService.create;

  (material, engineState);
};

let disposeBasicMaterial = (gameObject, material, engineState) =>
  engineState
  |> GameObjectComponentEngineService.disposeBasicMaterialComponent(
       gameObject,
       material,
     );

let addBasicMaterial = (gameObject, material, engineState) =>
  engineState
  |> GameObjectComponentEngineService.addBasicMaterialComponent(
       gameObject,
       material,
     );

let setBasicMaterialColor = (color, material, engineState) =>
  engineState |> BasicMaterialEngineService.setColor(color, material);

let setBasicMaterialMapToEngineState = (mapId, newMaterial, engineState) =>
  engineState |> BasicMaterialEngineService.setMap(mapId, newMaterial);