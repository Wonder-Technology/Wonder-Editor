let cloneGameObject =
    (gameObject, count, isShareMaterial, (editEngineState, runEngineState)) => {
  let (editEngineState, _editCloneGameObjects) =
    editEngineState
    |> GameObjectEngineService.cloneGameObject(
         StateLogicService.getEditEngineComponent(
           DiffType.GameObject,
           gameObject,
         ),
         count,
         isShareMaterial,
       );

  let (runEngineState, runCloneGameObjects) =
    runEngineState
    |> GameObjectEngineService.cloneGameObject(
         gameObject,
         count,
         isShareMaterial,
       );

  (runCloneGameObjects, editEngineState, runEngineState);
};