open EditorType;

let unsafeGetFolderArray = (editorState) =>
  editorState.assetRecord |> FolderArrayAssetService.unsafeGetFolderArray;

let setFolderArray = (folderArray, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> FolderArrayAssetService.setFolderArray(folderArray)
};

let getCurrentAssetFileNode = (editorState) =>
  editorState.assetRecord |> CurrentAssetFileNodeAssetService.getCurrentAssetFileNode;

let unsafeGetCurrentAssetFileNode = (editorState) =>
  editorState.assetRecord |> CurrentAssetFileNodeAssetService.unsafeGetCurrentAssetFileNode;

let clearCurrentAssetFileNode = (editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> CurrentAssetFileNodeAssetService.clearCurrentAssetFileNode
};

let setCurrentAssetFileNode = (currentAssetFileNode, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> CurrentAssetFileNodeAssetService.setCurrentAssetFileNode(currentAssetFileNode)
};

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
  assetRecord:
    editorState.assetRecord |> CurrentAssetTreeNodeAssetService.setCurrentAssetTreeNode(currentAssetTreeNode)
};

let getIndex = (editorState) => editorState.assetRecord |> IndexAssetService.getIndex;

let setIndex = (index, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> IndexAssetService.setIndex(index)
};

let unsafeGetFileMap = (editorState) =>
  editorState.assetRecord |> FileMapAssetService.unsafeGetFileMap;

let setFileMap = (fileMap, editorState) => {
  ...editorState,
  assetRecord: editorState.assetRecord |> FileMapAssetService.setFileMap(fileMap)
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