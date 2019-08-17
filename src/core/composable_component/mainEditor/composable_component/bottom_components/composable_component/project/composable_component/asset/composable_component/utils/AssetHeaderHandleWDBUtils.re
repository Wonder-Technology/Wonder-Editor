open Js.Promise;

let handleAssetWDBType =
    (
      (fileName, wdbArrayBuffer),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      (editorState, engineState),
    ) => {
  StateEditorService.getEventEngineState()
  |> ProgressUtils.show
  |> ProgressUtils.changePercent(99)
  |> StateEditorService.setEventEngineState
  |> ignore;

  WDBAssetLogicService.importAssetWDB(
    (
      FileNameService.getBaseName(fileName)
      |> OperateTreeAssetLogicService.getUniqueNodeName(
           _,
           selectedFolderNodeInAssetTree,
           engineState,
         ),
      wdbArrayBuffer,
    ),
    (wdbNodeId, selectedFolderNodeInAssetTree, true),
    WDBAssetLogicService.createWDBNodeUseCreatedSnapshot,
    (editorState, engineState),
  )
  |> then_(
       (
         (
           (
             allGameObjects,
             skyboxCubemapOpt,
             basicSourceTextureImageUint8ArrayDataMap,
             cubemapTextureImageUint8ArrayDataMap,
           ),
           (editorState, engineState),
         ),
       ) => {
       let (
         (
           extractedMaterialAssetDataArr,
           extractedTextureAssetDataArr,
           extractedCubemapAssetDataArr,
           extractedScriptEventFunctionAssetEntriesArr,
           extractedScriptAttributeAssetEntriesArr,
         ),
         (editorState, engineState),
       ) =
         ExtractAndRelateAssetsUtils.Extract.extractAndRelateAssets(
           (allGameObjects, skyboxCubemapOpt),
           (
             basicSourceTextureImageUint8ArrayDataMap,
             cubemapTextureImageUint8ArrayDataMap,
           ),
           (editorState, engineState),
         );

       let defaultGeometryData =
         RelateGameObjectAndGeometryAssetUtils.getDefaultGeometryData(
           editorState,
           engineState,
         );

       let engineState =
         allGameObjects
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. engineState, gameObject) =>
                engineState
                |> RelateGameObjectAndGeometryAssetUtils.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                     gameObject,
                     defaultGeometryData,
                   )
                |> GameObjectEngineService.initGameObject(gameObject),
              engineState,
            )
         |> DirectorEngineService.loopBody(0.);

       let (editorState, engineState) =
         ExtractAndRelateAssetsUtils.AssetTree.addNodeToAssetTree(
           extractedMaterialAssetDataArr,
           extractedTextureAssetDataArr,
           extractedCubemapAssetDataArr,
           extractedScriptEventFunctionAssetEntriesArr,
           extractedScriptAttributeAssetEntriesArr,
           (editorState, engineState),
         );

       StateEditorService.getEventEngineState()
       |> ProgressUtils.finish
       |> StateEditorService.setEventEngineState
       |> ignore;

       (editorState, engineState) |> resolve;
     });
};