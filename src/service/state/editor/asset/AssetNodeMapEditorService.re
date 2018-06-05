open AssetType;

open EditorType;

let unsafeGetNodeMap = editorState =>
  editorState.assetRecord |> NodeMapAssetService.unsafeGetNodeMap;

let setNodeMap = (nodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> NodeMapAssetService.setNodeMap(nodeMap),
};

let setResult = (index, result, {assetRecord} as state) => {
  ...state,
  assetRecord: {
    ...assetRecord,
    nodeMap:
      assetRecord.nodeMap |> SparseMapService.immutableSet(index, result),
  },
};