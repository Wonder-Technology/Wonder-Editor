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

let getMaterialName = (currentNodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}: materialResultType) => name);

let getMaterialBaseNameAndExtName = (currentNodeId, materialNodeMap) =>
  getMaterialName(currentNodeId, materialNodeMap)
  |> FileNameService.getBaseNameAndExtName;

let buildMaterialNodeResult = (name, parentId, type_, materialComponent) => {
  name,
  parentId,
  type_,
  materialComponent,
};

let renameMaterialNodeResult = (name, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  name,
};

let setMaterialNodeResultParent =
    (parentId, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  parentId,
};