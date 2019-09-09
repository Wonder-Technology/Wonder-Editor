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
  |> (
    ({defaultCubeGeometryComponent}) =>
      defaultCubeGeometryComponent |> OptionService.unsafeGet
  );

let unsafeGetDefaultSphereGeometryComponent = editorState =>
  editorState
  |> getGeometryData
  |> (
    ({defaultSphereGeometryComponent}) =>
      defaultSphereGeometryComponent |> OptionService.unsafeGet
  );

let unsafeGetDefaultGeometryComponents = editorState => [|
  unsafeGetDefaultCubeGeometryComponent(editorState),
  unsafeGetDefaultSphereGeometryComponent(editorState),
|];