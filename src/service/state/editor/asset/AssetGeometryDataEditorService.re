open EditorType;

let getGeometryData = editorState =>
  editorState.assetRecord |> GeometryDataAssetService.getGeometryData;

let setGeometryData = (geometryData, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> GeometryDataAssetService.setGeometryData(geometryData),
};