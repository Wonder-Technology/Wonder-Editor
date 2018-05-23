open EditorType;

let getCurrentAssetTreeNode = (editorState) =>
  editorState.assetRecord |> CurrentAssetTreeNodeAssetService.getCurrentAssetTreeNode;

let unsafeGetCurrentAssetTreeNode = (editorState) =>
  editorState.assetRecord |> CurrentAssetTreeNodeAssetService.unsafeGetCurrentAssetTreeNode;

let clearCurrentAssetTreeNode = (editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> CurrentAssetTreeNodeAssetService.clearCurrentAssetTreeNode
};

let setCurrentAssetTreeNode = (currentAssetTreeNode, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> CurrentAssetTreeNodeAssetService.setCurrentAssetTreeNode(currentAssetTreeNode)
};

let getCurrentAssetChildrenNodeParent = (editorState) =>
  editorState.assetRecord |> CurrentAssetChildrenNodeParentAssetService.getCurrentAssetChildrenNodeParent;

let unsafeGetCurrentAssetChildrenNodeParent = (editorState) =>
  editorState.assetRecord |> CurrentAssetChildrenNodeParentAssetService.unsafeGetCurrentAssetChildrenNodeParent;

let clearCurrentAssetChildrenNodeParent = (editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> CurrentAssetChildrenNodeParentAssetService.clearCurrentAssetChildrenNodeParent
};

let setCurrentAssetChildrenNodeParent = (currentAssetChildrenNodeParent, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> CurrentAssetChildrenNodeParentAssetService.setCurrentAssetChildrenNodeParent(currentAssetChildrenNodeParent)
};

let getIndex = (editorState) => editorState.assetRecord |> IndexAssetService.getIndex;

let setIndex = (index, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> IndexAssetService.setIndex(index)
};

let unsafeGetNodeMap = (editorState) =>
  editorState.assetRecord |> NodeMapAssetService.unsafeGetNodeMap;

let setNodeMap = (nodeMap, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> NodeMapAssetService.setNodeMap(nodeMap)
};

let getAssetTree = (editorState) => editorState.assetRecord |> AssetTreeAssetService.getAssetTree;

let unsafeGetAssetTree = (editorState) =>
  editorState.assetRecord |> AssetTreeAssetService.unsafeGetAssetTree;

let clearAssetTree = (editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> AssetTreeAssetService.clearAssetTree
};

let setAsseTree = (assetTree, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> AssetTreeAssetService.setAssetTree(assetTree)
};