let getTextureNode = nodeId =>
  StateEditorService.getState()
  |> AssetTextureNodeMapEditorService.getTextureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

let getCurrentNodeId = () => {
  let {currentNodeId}: CurrentNodeDataType.currentNodeDataType =
    AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData
    |> StateLogicService.getEditorState;

  currentNodeId;
};

let getTextureComponentFromNodeId = nodeId => {
  let {textureComponent}: AssetNodeType.textureResultType =
    getTextureNode(nodeId);

  textureComponent;
};

let getTextureComponentFromCurrentNodeId = () =>
  getTextureComponentFromNodeId(getCurrentNodeId());

let setCurrentNodeData = (nodeId, nodeType) =>
  AssetCurrentNodeDataEditorService.setCurrentNodeData({
    currentNodeId: nodeId,
    nodeType,
  })
  |> StateLogicService.getAndSetEditorState;

let setCurrentTextureNodeData = nodeId =>
  setCurrentNodeData(nodeId, AssetNodeType.Texture);

module OperateTwoLayer = {
  open AssetTreeTwoLayerTypeTool;

  let getUploadedTextureIndex = assetTreeData =>
    assetTreeData.firstLayer.textureData.lastIndex + 1;

  let getAddedFirstNodeDomIndex = assetTreeData =>
    assetTreeData.firstLayer.length + 1;

  let getAddedFirstFolderNodeDomIndexForAssetTree = assetTreeData =>
    assetTreeData.firstLayer.folderDomIndexArr |> Js.Array.length |> succ;

  let getAddedSecondNodeDomIndex = assetTreeData =>
    assetTreeData.firstLayer.length + 2;

  let getAddedFirstNodeDomIndex = assetTreeData =>
    assetTreeData.firstLayer.length + 1;

  let getFirstFolderDomIndexForAssetChildren = assetTreeData =>
    assetTreeData.firstLayer.folderDomIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);
  let getFirstFolderDomIndexForAssetTree = assetTreeData =>
    assetTreeData.firstLayer.folderDomIndexArr |> ArrayService.unsafeGetFirst;

  let getSecondFolderDomIndexForAssetChildren = assetTreeData =>
    assetTreeData.firstLayer.folderDomIndexArr
    |> ArrayService.unsafeGetNth(1)
    |> (domIndex => domIndex - 1);

  let getSecondFolderDomIndexForAssetTree = assetTreeData =>
    assetTreeData.firstLayer.folderDomIndexArr |> ArrayService.unsafeGetNth(1);

  let getFirstTextureDomIndex = assetTreeData =>
    assetTreeData.firstLayer.textureData.domIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);

  let getSecondTextureDomIndex = assetTreeData =>
    assetTreeData.firstLayer.textureData.domIndexArr
    |> ArrayService.unsafeGetNth(1)
    |> (domIndex => domIndex - 1);

  let getFirstJsonDomIndex = assetTreeData =>
    assetTreeData.firstLayer.jsonDomIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);

  let getRootFolderNodeId = assetTreeData =>
    assetTreeData.treeNodeIdData.folderNodeIdArr |> ArrayService.unsafeGetFirst;
  let getFirstFolderNodeId = assetTreeData =>
    assetTreeData.treeNodeIdData.folderNodeIdArr
    |> ArrayService.unsafeGetNth(1);
  let getSecondFolderNodeId = assetTreeData =>
    assetTreeData.treeNodeIdData.folderNodeIdArr
    |> ArrayService.unsafeGetNth(2);

  let getFirstTextureNodeId = assetTreeData =>
    assetTreeData.treeNodeIdData.textureNodeIdArr
    |> ArrayService.unsafeGetFirst;

  let getSecondTextureNodeId = assetTreeData =>
    assetTreeData.treeNodeIdData.textureNodeIdArr
    |> ArrayService.unsafeGetNth(1);
  let getFirstJsonNodeId = assetTreeData =>
    assetTreeData.treeNodeIdData.jsonNodeIdArr |> ArrayService.unsafeGetFirst;
};

module OperateThreeLayer = {
  open AssetTreeThreeLayerTypeTool;
  let getFirstLayserFirstFolderDomIndex = assetTreeData =>
    assetTreeData.firstLayer.folderDomIndexArr |> ArrayService.unsafeGetFirst;

  let getFirstLayserSecondFolderDomIndex = assetTreeData =>
    assetTreeData.firstLayer.folderDomIndexArr |> ArrayService.unsafeGetNth(1);

  let getSecondLayserFirstFolderDomIndexForAssetTree = assetTreeData =>
    assetTreeData.secondLayer.folderDomIndexArr |> ArrayService.unsafeGetFirst;

  let getSecondLayserFirstFolderDomIndexForAssetChildren = assetTreeData =>
    assetTreeData.secondLayer.folderDomIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);

  let getSecondLayserSecondFolderDomIndexForAssetTree = assetTreeData =>
    assetTreeData.secondLayer.folderDomIndexArr
    |> ArrayService.unsafeGetNth(1)
    |> (domIndex => domIndex - 1);

  let getSecondLayserSecondFolderDomIndexForAssetTree = assetTreeData =>
    assetTreeData.secondLayer.folderDomIndexArr
    |> ArrayService.unsafeGetNth(1);

  let getSecondLayserSecondTextureDomIndex = assetTreeData =>
    assetTreeData.secondLayer.textureData.domIndexArr
    |> ArrayService.unsafeGetFirst
    |> (domIndex => domIndex - 1);
};