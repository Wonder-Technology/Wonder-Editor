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

let getMaterialBaseNameAndExtName = (currentNodeId, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name} : materialResultType ) => name)
  |> FileNameService.getBaseNameAndExtName;