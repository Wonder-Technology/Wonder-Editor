open EditorType;

open AssetNodeType;

let getMaterialNodeMap = editorState =>
  editorState.assetRecord |> MaterialNodeMapAssetService.getMaterialNodeMap;

let setMaterialNodeMap = (materialNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> MaterialNodeMapAssetService.setMaterialNodeMap(materialNodeMap),
};

let unsafeGetResult = (nodeId, editorState) =>
  editorState.assetRecord
  |> MaterialNodeMapAssetService.unsafeGetResult(nodeId);

let setResult = (nodeId, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> MaterialNodeMapAssetService.setResult(nodeId, result),
};

let getParentFolderNodeId = (nodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({parentFolderNodeId}: materialResultType) => parentFolderNodeId);

let getType = (nodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({type_}: materialResultType) => type_);

let buildMaterialNodeResult = (parentFolderNodeId, type_, materialComponent) => {
  parentFolderNodeId,
  type_,
  materialComponent,
};

let setMaterialNodeResultParent =
    (parentFolderNodeId, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  parentFolderNodeId,
};

let getValidValues = editorState =>
  getMaterialNodeMap(editorState) |> SparseMapService.getValidValues;

let getResults = editorState =>
  getMaterialNodeMap(editorState) |> SparseMapService.getValidDataArr;

let remove = (nodeId, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> MaterialNodeMapAssetService.remove(nodeId),
};