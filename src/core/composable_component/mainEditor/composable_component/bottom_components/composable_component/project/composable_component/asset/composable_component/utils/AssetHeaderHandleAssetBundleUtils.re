open Js.Promise;


let handleAssetBundleType =
    (
      (fileName, assetBundleArrayBuffer),
      (assetBundleNodeId, selectedFolderNodeInAssetTree),
      (editorState, engineState),
    ) =>
  make((~resolve, ~reject) => {
    let editorState =
      AssetBundleNodeAssetEditorService.addAssetBundleNodeToAssetTree(
        selectedFolderNodeInAssetTree,
        AssetBundleNodeAssetService.buildNode(
          ~nodeId=assetBundleNodeId,
          ~name=
            OperateTreeAssetLogicService.getUniqueNodeName(
              FileNameService.getBaseName(fileName),
              selectedFolderNodeInAssetTree,
              engineState,
            ),
          ~assetBundle=assetBundleArrayBuffer,
          ~type_=
            AssetHeaderAssetBundleUtils.getAssetBundleTypeByExtname(
              FileNameService.getExtName(fileName),
            ),
        ),
        editorState,
      );

    resolve(. (editorState, engineState));
  });