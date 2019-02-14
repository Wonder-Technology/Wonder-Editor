open Js.Promise;

let importAssetWDB =
    (
      (name, wdbArrayBuffer),
      (wdbNodeId, parentFolderNode),
      isLoadImage,
      (editorState, engineState),
    ) => {
  let allGameObjectsRef = ref([||]);
  let imageUint8ArrayDataMapRef =
    ref(WonderCommonlib.ImmutableSparseMapService.createEmpty());

  engineState
  |> AssembleWDBEngineService.assembleWDB(
       wdbArrayBuffer,
       false,
       false,
       false,
       false,
       isLoadImage,
     )
  |> WonderBsMost.Most.tap(
       ((engineState, (imageUint8ArrayDataMap, _), gameObject)) => {
       let allGameObjects =
         HierarchyGameObjectEngineService.getAllGameObjects(gameObject, engineState);

       editorState
       /* |> WDBNodeMapAssetEditorService.setResult(
               wdbNodeId,
               WDBNodeMapAssetEditorService.buildWDBNodeResult(
                 name,
                 parentFolderNodeId |. Some,
                 gameObject,
               ),
             )
          |> AssetTreeUtils.createNodeAndAddToTargetNodeChildren(
               parentFolderNodeId,
               wdbNodeId,
               NodeAssetType.WDB,
             ) */
       |> OperateTreeAssetEditorService.insertNode(
            NodeAssetService.getNodeId(~node=parentFolderNode),
            WDBNodeAssetService.buildNode(
              ~nodeId=wdbNodeId,
              ~name,
              ~wdbGameObject=gameObject,
            ),
          )
       |> StateEditorService.setState
       |> ignore;

       let engineState =
         engineState
         |> GameObjectEngineService.setAllGameObjectsIsRenderIfHasMeshRenderer(
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