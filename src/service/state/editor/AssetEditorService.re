open EditorType;

let getCurrentFile = (editorState) =>
  editorState.assetRecord |> CurrentFileAssetService.getCurrentFile;

let unsafeGetCurrentFile = (editorState) =>
  editorState.assetRecord |> CurrentFileAssetService.unsafeGetCurrentFile;

let clearCurrentFile = (editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> CurrentFileAssetService.clearCurrentFile
};

let setCurrentFile = (currentFile, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> CurrentFileAssetService.setCurrentFile(currentFile)
};

let getCurrentTreeNode = (editorState) =>
  editorState.assetRecord |> CurrentTreeNodeAssetService.getCurrentTreeNode;

let unsafeGetCurrentTreeNode = (editorState) =>
  editorState.assetRecord |> CurrentTreeNodeAssetService.unsafeGetCurrentTreeNode;

let clearCurrentTreeNode = (editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> CurrentTreeNodeAssetService.clearCurrentTreeNode
};

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

let unsafeGetFileMap = (editorState) => editorState.assetRecord |> FileMapAssetService.unsafeGetFileMap;

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