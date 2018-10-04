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

  let getAddedFirstNodeDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.length + 1;

  let getAddedFirstFolderNodeDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr |> Js.Array.length |> succ;

  let getAddedSecondNodeDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.length + 2;

  let getAddedFirstNodeDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.length + 1;

  let getFirstFolderDomIndexForAssetChildren = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);
  let getFirstFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr
    |> ArrayService.unsafeGetFirst;

  let getSecondFolderDomIndexForAssetChildren = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr
    |> ArrayService.unsafeGetNth(1)
    |> (domIndex => domIndex - 1);

  let getSecondFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr
    |> ArrayService.unsafeGetNth(1);

  let getFirstTextureDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.textureData.domIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);

  let getSecondTextureDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.textureData.domIndexArr
    |> ArrayService.unsafeGetNth(1)
    |> (domIndex => domIndex - 1);

  let getFirstJsonDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.jsonDomIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);

  let getRootFolderNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.folderNodeIdArr
    |> ArrayService.unsafeGetFirst;
  let getFirstFolderNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.folderNodeIdArr
    |> ArrayService.unsafeGetNth(1);
  let getSecondFolderNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.folderNodeIdArr
    |> ArrayService.unsafeGetNth(2);

  let getFirstTextureNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.textureNodeIdArr
    |> ArrayService.unsafeGetFirst;

  let getSecondTextureNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.textureNodeIdArr
    |> ArrayService.unsafeGetNth(1);
  let getFirstJsonNodeId = assetTreeDomRecord =>
    assetTreeDomRecord.treeNodeIdData.jsonNodeIdArr
    |> ArrayService.unsafeGetFirst;
};

module OperateThreeLayer = {
  open AssetTreeThreeLayerTypeTool;
  let getFirstLayserFirstFolderDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr
    |> ArrayService.unsafeGetFirst;

  let getFirstLayserSecondFolderDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.firstLayer.folderDomIndexArr
    |> ArrayService.unsafeGetNth(1);

  let getSecondLayserFirstFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.folderDomIndexArr
    |> ArrayService.unsafeGetFirst;

  let getSecondLayserFirstFolderDomIndexForAssetChildren = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.folderDomIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);

  let getSecondLayserSecondFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.folderDomIndexArr
    |> ArrayService.unsafeGetNth(1)
    |> (domIndex => domIndex - 1);

  let getSecondLayserSecondFolderDomIndexForAssetTree = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.folderDomIndexArr
    |> ArrayService.unsafeGetNth(1);

  let getSecondLayserSecondTextureDomIndex = assetTreeDomRecord =>
    assetTreeDomRecord.secondLayer.textureData.domIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);
};