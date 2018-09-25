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
       GameObjectComponentEngineService.getLightMaterialComponent(
         gameObject,
         engineState,
       ),
     )
  |> JobEngineService.execDisposeJob
  |> GameObjectComponentEngineService.addLightMaterialComponent(
       gameObject,
       newMaterial,
     );