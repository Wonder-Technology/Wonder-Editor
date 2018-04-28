open EditorType;

let getCurrentTreeNode = (editorState) =>
  editorState.assetRecord |> CurrentTreeNodeAssetService.getCurrentTreeNode;

let unsafeGetCurrentTreeNode = (editorState) =>
  editorState.assetRecord |> CurrentTreeNodeAssetService.unsafeGetCurrentTreeNode;

let setCurrentTreeNode = (currentTreeNode, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> CurrentTreeNodeAssetService.setCurrentTreeNode(currentTreeNode)
};

let getIndex = (editorState) => editorState.assetRecord |> IndexAssetService.getIndex;

let setIndex = (index, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> IndexAssetService.setIndex(index)
};

let getFileMap = (editorState) => editorState.assetRecord |> FileMapAssetService.getFileMap;

let setFileMap = (imageMap, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> FileMapAssetService.setFileMap(imageMap)
};

let getAssetTree = (editorState) => editorState.assetRecord |> AssetTreeAssetService.getAssetTree;

let unsafeGetAssetTree = (editorState) =>
  editorState.assetRecord |> AssetTreeAssetService.unsafeGetAssetTree;

let setAsseTree = (assetTree, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> AssetTreeAssetService.setAssetTree(assetTree)
};