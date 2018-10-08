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

let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> MaterialNodeMapAssetService.setResult(index, result),
};

let getMaterialParentId = (nodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({parentNodeId}: materialResultType) => parentNodeId);

let buildMaterialNodeResult =
    (postfix, parentNodeId, type_, materialComponent) => {
  postfix,
  parentNodeId,
  type_,
  materialComponent,
};

let setMaterialNodeResultParent =
    (parentNodeId, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  parentNodeId,
};