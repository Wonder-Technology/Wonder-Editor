open Js.Promise;

let importAssetWDB =
    (
      (name, wdbArrayBuffer),
      (wdbNodeId, parentFolderNodeId),
      (editorState, engineState),
    ) => {
  let allGameObjectsRef = ref([||]);
  let imageUint8ArrayDataMapRef =
    ref(WonderCommonlib.SparseMapService.createEmpty());

    WonderLog.Log.print("assemble wdb") |> ignore;
  engineState
  |> AssembleWDBEngineService.assembleWDB(
       wdbArrayBuffer,
       false,
       false,
       false,
       false,
       true,
     )
  |> WonderBsMost.Most.tap(
       ((engineState, (imageUint8ArrayDataMap, _), gameObject)) => {
       let allGameObjects =
         GameObjectEngineService.getAllGameObjects(gameObject, engineState);

         /* WonderLog.Log.print(
imageUint8ArrayDataMap
         ) |> ignore; */

       editorState
       |> WDBNodeMapAssetEditorService.setResult(
            wdbNodeId,
            WDBNodeMapAssetEditorService.buildWDBNodeResult(
              name,
              parentFolderNodeId |. Some,
              gameObject,
              wdbArrayBuffer,
            ),
          )
       |> AssetTreeUtils.createNodeAndAddToTargetNodeChildren(
            parentFolderNodeId,
            wdbNodeId,
            AssetNodeType.WDB,
          )
       |> StateEditorService.setState
       |> ignore;

       let engineState =
         engineState
         |> GameObjectUtils.setAllGameObjectsIsRenderIfHasMeshRenderer(
              false,
              gameObject,
            )
         |> GameObjectEngineService.setGameObjectName(name, gameObject);

       engineState |> StateEngineService.setState |> ignore;

       allGameObjectsRef := allGameObjects;
       imageUint8ArrayDataMapRef := imageUint8ArrayDataMap;

       /* allGameObjects
          |> WonderCommonlib.ArrayService.reduceOneParam(
               (. engineState, gameObject) =>
                 GameObjectEngineService.initGameObject(gameObject, engineState),
               engineState,
             )
          |> DirectorEngineService.loopBody(0.)
          |> StateEngineService.setState
          |> ignore; */

       ();
     })
  |> WonderBsMost.Most.drain
  |> then_(_ =>
       resolve((
         (allGameObjectsRef^, imageUint8ArrayDataMapRef^),
         (StateEditorService.getState(), StateEngineService.unsafeGetState()),
       ))
     );
};