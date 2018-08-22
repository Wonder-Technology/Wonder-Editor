open AssetGeometryDataType;

let buildCubeGeometryDefaultComponent = engineState => {
  let (engineState, cubeGeometry) =
    GeometryEngineService.createCubeGeometry(engineState);

  (
    engineState |> GeometryEngineService.setGeometryName(cubeGeometry, "Cube"),
    cubeGeometry,
  );
};

let buildCubeGeometryDefaultComponentForRunEngineState =
    (editorState, engineState) => {
  let newIndex = editorState |> AssetIndexEditorService.getIndex;
  let (engineState, cubeGeometry) =
    buildCubeGeometryDefaultComponent(engineState);
  let editorState =
    editorState
    |> AssetGeometryNodeMapEditorService.setResult(newIndex, cubeGeometry);

  (
    editorState
    |> AssetGeometryDataEditorService.getGeometryData
    |> (geometry => {...geometry, cubeGeometryAssetId: newIndex})
    |. AssetGeometryDataEditorService.setGeometryData(editorState),
    engineState,
    cubeGeometry,
  );
};