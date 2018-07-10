/* TODO all: rename to renameXXXNode */
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

let _handleTextureNode = (textureId, name, textureNodeMap) =>
  OperateTextureLogicService.renameTextureToEngine(textureId, name);

let renameAssetTreeNode = (dispatchFunc, nodeId, nodeType, value) => {
  let assetState = StateAssetService.getState();
  AssetNodeUtils.handleSpeficFuncByAssetNodeType(
    nodeType,
    (
      _handleFolderNode(nodeId, value, assetState),
      _handleJsonNode(nodeId, value, assetState),
      _handleTextureNode(nodeId, value),
    ),
  );
  dispatchFunc(AppStore.ReLoad);
};