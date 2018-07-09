let _handleFolderNode = (folderId, name, assetState, folderNodeMap) =>
  folderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(folderId)
  |> AssetNodeAssetService.renameFolderNodeResult(name)
  |> FolderNodeMapAssetService.setResult(folderId, _, assetState)
  |> StateAssetService.setState
  |> ignore;

let _handleJsonNode = (jsonId, name, assetState, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(jsonId)
  |> AssetNodeAssetService.renameJsonNodeResult(name)
  |> JsonNodeMapAssetService.setResult(jsonId, _, assetState)
  |> StateAssetService.setState
  |> ignore;

let _handleTextureNode = (textureId, name) =>
  OperateTextureLogicService.renameTextureToEngine(textureId, name);

let renameAssetTreeNode = (dispatchFunc, nodeId, nodeType, value) => {
  let assetState = StateAssetService.getState();
  AssetNodeUtils.handleSpeficFuncByAssetNodeType(
    nodeType,
    (
      folderNodeMap =>
        _handleFolderNode(nodeId, value, assetState, folderNodeMap),
      jsonNodeMap => _handleJsonNode(nodeId, value, assetState, jsonNodeMap),
      textureNodeMap => _handleTextureNode(nodeId, value),
    ),
  );
  dispatchFunc(AppStore.ReLoad);
};