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

  engineState
  |> AssembleWDBEngineService.assembleWDB(
       wdbArrayBuffer,
       false,
       false,
       false,
     )
  |> WonderBsMost.Most.tap(
       ((engineState, (imageUint8ArrayDataMap, _), gameObject)) => {
       let allGameObjects =
         GameObjectEngineService.getAllGameObjects(gameObject, engineState);

       editorState
       /* TODO remove */
       |> AssetClonedGameObjectMapEditorService.setResult(
            gameObject,
            allGameObjects,
          )
       |> AssetWDBNodeMapEditorService.setResult(
            wdbNodeId,
            AssetWDBNodeMapEditorService.buildWDBNodeResult(
              name,
              parentFolderNodeId |. Some,
              gameObject,
              wdbArrayBuffer,
            ),
          )
       |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
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
         |> GameObjectUtils.setAllGameObjectsIsRenderIfHasDirectionLight(
              false,
              gameObject,
            )
         |> GameObjectUtils.setAllGameObjectsIsRenderIfHasPointLight(
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