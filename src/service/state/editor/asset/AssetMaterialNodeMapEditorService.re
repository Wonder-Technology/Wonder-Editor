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

let getMaterialBaseName = (currentNodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}: materialResultType) => name);

let getMaterialTotalName = (currentNodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, postfix}: materialResultType) => name ++ postfix);

let getMaterialParentId = (currentNodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({parentNodeId}: materialResultType) => parentNodeId);
let buildMaterialNodeResult =
    (name, postfix, parentNodeId, type_, materialComponent) => {
  name,
  postfix,
  parentNodeId,
  type_,
  materialComponent,
};

let renameMaterialNodeResult = (name, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  name,
};

let setMaterialNodeResultParent =
    (parentNodeId, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  parentNodeId,
};