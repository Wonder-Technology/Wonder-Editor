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

let getMaterialParentId = (nodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({parentNodeId}: materialResultType) => parentNodeId);

let getMaterialType = (nodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({type_}: materialResultType) => type_);

let buildMaterialNodeResult = (parentNodeId, type_, materialComponent) => {
  parentNodeId,
  type_,
  materialComponent,
};

let setMaterialNodeResultParent =
    (parentNodeId, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  parentNodeId,
};

let getResults = editorState =>
  getMaterialNodeMap(editorState) |> SparseMapService.getValidDataArr;