let cloneGameObject =
    (gameObject, count, isShareMaterial, (editEngineState, runEngineState)) => {
  WonderLog.Log.print("start clone") |> ignore;
  editEngineState
  |> GameObjectEngineService.getGameObjectName(
       StateLogicService.getEditEngineComponent(
         DiffType.GameObject,
         gameObject,
       ),
     )
  |> WonderLog.Log.print;

  runEngineState
  |> GameObjectEngineService.getGameObjectName(gameObject)
  |> WonderLog.Log.print;

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

  WonderLog.Log.print((
    "clone gameObject",
    _editCloneGameObjects,
    runCloneGameObjects,
  ))
  |> ignore;

  (runCloneGameObjects, editEngineState, runEngineState);
};