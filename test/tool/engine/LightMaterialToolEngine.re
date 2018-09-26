open Wonderjs;

let createGameObject = state => {
  open LightMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createLightMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state |> addGameObjectLightMaterialComponent(gameObject, material);
  (state, gameObject, material);
};

let replaceGameObjectLightMaterial = (gameObject, newMaterial, engineState) =>
  engineState
  |> GameObjectComponentEngineService.disposeLightMaterialComponent(
       gameObject,
       GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
         gameObject,
         engineState,
       ),
     )
  |> JobEngineService.execDisposeJob
  |> GameObjectComponentEngineService.addLightMaterialComponent(
       gameObject,
       newMaterial,
     );

let isAlive = (material, engineState) =>
  DisposeLightMaterialMainService.isAlive(
    material,
    RecordLightMaterialMainService.getRecord(engineState),
  );