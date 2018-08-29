let getCurrentNodeId = () => {
  let {currentNodeId}: CurrentNodeDataType.currentNodeDataType =
    AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData
    |> StateLogicService.getEditorState;

  currentNodeId;
};
let getTextureIndexFromCurrentNodeId = () => {
  let {textureIndex}: AssetNodeType.textureResultType =
    StateEditorService.getState()
    |> AssetTextureNodeMapEditorService.getTextureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(getCurrentNodeId());

  textureIndex;
};

module OperateTwoLayer = {
  open AssetTreeTwoLayerTypeTool;
  let getUploadedTextureIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.textureData.lastIndex + 1;

  let getUploadedeTextureNodeDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.length + 1;

  let getUploadedeJsonNodeDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.length + 2;

  let getUploadedeWdbNodeDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.length + 1;

  let getFirstFolderDomIndexForAssetChildren = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr
    |> ArrayService.getFirst
    |> (folderIndex => folderIndex - 1);
  let getFirstFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr |> ArrayService.getFirst;

  let getSecondFolderDomIndexForAssetChildren = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr
    |> ArrayService.getNth(1)
    |> (folderIndex => folderIndex - 1);

  let getSecondFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr |> ArrayService.getNth(1);

  let getFirstTextureDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.textureData.domIndexArr
    |> ArrayService.getFirst
    |> (folderIndex => folderIndex - 1);

  let getSecondTextureDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.textureData.domIndexArr
    |> ArrayService.getNth(1)
    |> (folderIndex => folderIndex - 1);

  let getFirstJsonDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.jsonDomIndexArr
    |> ArrayService.getFirst
    |> (folderIndex => folderIndex - 1);

  let getRootFolderNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.folderNodeIdArr |> ArrayService.getFirst;
  let getFirstFolderNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.folderNodeIdArr
    |> ArrayService.getNth(1);
  let getSecondFolderNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.folderNodeIdArr
    |> ArrayService.getNth(2);

  let getFirstTextureNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.textureNodeIdArr |> ArrayService.getFirst;

  let getSecondTextureNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.textureNodeIdArr
    |> ArrayService.getNth(1);
  let getFirstJsonNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.jsonNodeIdArr |> ArrayService.getFirst;
};

module OperateThreeLayer = {
  open AssetTreeThreeLayerTypeTool;
  let getFirstLayserFirstFolderDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr |> ArrayService.getFirst;

  let getFirstLayserSecondFolderDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr |> ArrayService.getNth(1);

  let getSecondLayserFirstFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.folderDomIndexArr |> ArrayService.getFirst;

  let getSecondLayserFirstFolderDomIndexForAssetChildren = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.folderDomIndexArr
    |> ArrayService.getFirst
    |> (folderIndex => folderIndex - 1);

  let getSecondLayserSecondFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.folderDomIndexArr
    |> ArrayService.getNth(1)
    |> (folderIndex => folderIndex - 1);

  let getSecondLayserSecondFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.folderDomIndexArr |> ArrayService.getNth(1);

  let getSecondLayserSecondTextureDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.textureData.domIndexArr
    |> ArrayService.getFirst
    |> (folderIndex => folderIndex - 1);
};