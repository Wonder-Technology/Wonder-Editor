open EditorType;

open AssetNodeType;

let getGeometryMap = editorState =>
  editorState.assetRecord |> GeometryMapAssetService.getGeometryMap;

let setGeometryMap = (geometryMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> GeometryMapAssetService.setGeometryMap(geometryMap),
};

let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> GeometryMapAssetService.setResult(index, result),
};