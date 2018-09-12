let cloneGameObject = (gameObject, count, isShareMaterial, engineState) => {
  let (engineState, cloneGameObjects) =
    engineState
    |> GameObjectEngineService.cloneGameObject(
         gameObject,
         count,
         isShareMaterial,
       );

  (cloneGameObjects, engineState);
};