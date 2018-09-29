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

let getMaterialParentId = (currentNodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({parentId}: materialResultType) => parentId);

let buildMaterialNodeResult = (parentId, type_, materialComponent) => {
  parentId,
  type_,
  materialComponent,
};

let setMaterialNodeResultParent =
    (parentId, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  parentId,
};