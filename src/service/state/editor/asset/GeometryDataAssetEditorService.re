open EditorType;

let getGeometryData = editorState =>
  editorState.assetRecord |> GeometryDataAssetService.getGeometryData;

let setGeometryData = (geometryData, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> GeometryDataAssetService.setGeometryData(geometryData),
};

let unsafeGetDefaultCubeGeometryComponent = editorState =>
  editorState
  |> getGeometryData
  |> (({defaultCubeGeometryComponent}) => defaultCubeGeometryComponent);

let unsafeGetDefaultSphereGeometryComponent = editorState =>
  editorState
  |> getGeometryData
  |> (({defaultSphereGeometryComponent}) => defaultSphereGeometryComponent);

let unsafeGetDefaultGeometryComponents = editorState => [|
  unsafeGetDefaultCubeGeometryComponent(editorState),
  unsafeGetDefaultSphereGeometryComponent(editorState),
|];