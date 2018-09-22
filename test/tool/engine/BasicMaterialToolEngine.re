let replaceGameObjectLightMaterialToBasicMaterialAndRefreshDispose =
    (gameObject, state) => {
  let (state, basicMaterial) = BasicMaterialEngineService.create(state);

  state
  |> GameObjectComponentEngineService.disposeLightMaterialComponent(
       gameObject,
       GameObjectComponentEngineService.getLightMaterialComponent(
         gameObject,
         state,
       ),
     )
  |> GameObjectComponentEngineService.addBasicMaterialComponent(
       gameObject,
       basicMaterial,
     )
  |> JobEngineService.execDisposeJob;
};