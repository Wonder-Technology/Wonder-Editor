let _renameFolderNode = (folderId, name, assetState, folderNodeMap) =>
  folderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(folderId)
  |> AssetNodeAssetService.renameFolderNodeResult(name)
  |> FolderNodeMapAssetService.setResult(folderId, _, assetState)
  |> StateAssetService.setState
  |> ignore;

let _renameJsonNode = (jsonId, name, assetState, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(jsonId)
  |> AssetNodeAssetService.renameJsonNodeResult(name)
  |> JsonNodeMapAssetService.setResult(jsonId, _, assetState)
  |> StateAssetService.setState
  |> ignore;

let _renameTextureNode = (textureIndex, name, _textureNodeMap) =>
  OperateTextureLogicService.renameTextureToEngine(textureIndex, name);

let renameAssetTreeNode = (dispatchFunc, nodeId, nodeType, value) => {
  let assetState = StateAssetService.getState();
  AssetNodeUtils.handleSpeficFuncByAssetNodeType(
    nodeType,
    (
      _renameFolderNode(nodeId, value, assetState),
      _renameJsonNode(nodeId, value, assetState),
      _renameTextureNode(nodeId, value),
    ),
  );
  dispatchFunc(AppStore.ReLoad);
};