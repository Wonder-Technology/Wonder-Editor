let cloneGameObject =
    (gameObject, count, isShareMaterial, (editEngineState, runEngineState)) => {
  WonderLog.Log.print("start clone") |> ignore;

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