open AssetGeometryDataType;

let buildCubeGeometryDefaultComponent = engineState => {
  let (engineState, cubeGeometry) =
    GeometryEngineService.createCubeGeometry(engineState);

  (
    engineState |> GeometryEngineService.setGeometryName(cubeGeometry, "Cube"),
    cubeGeometry,
  );
};

let buildSphereGeometryDefaultComponent = engineState => {
  let (engineState, sphereGeometry) =
    GeometryEngineService.createSphereGeometry(5., 28, engineState);

  (
    engineState
    |> GeometryEngineService.setGeometryName(sphereGeometry, "Sphere"),
    sphereGeometry,
  );
};

let buildCubeGeometryDefaultComponentForRunEngineState =
    (editorState, engineState) => {
  let newIndex = editorState |> AssetIndexEditorService.getIndex;
  let (engineState, cubeGeometry) =
    buildCubeGeometryDefaultComponent(engineState);

  (
    editorState
    |> AssetGeometryDataEditorService.getGeometryData
    |> (geometry => {...geometry, defaultCubeGeometryIndex: cubeGeometry})
    |. AssetGeometryDataEditorService.setGeometryData(editorState),
    engineState,
    cubeGeometry,
  );
};

let buildSphereGeometryDefaultComponentForRunEngineState =
    (editorState, engineState) => {
  let (editorState, newIndex) = editorState |> AssetIdUtils.getAssetId;
  let (engineState, sphereGeometry) =
    buildSphereGeometryDefaultComponent(engineState);

  (
    editorState
    |> AssetGeometryDataEditorService.getGeometryData
    |> (
      geometry => {...geometry, defaultSphereGeometryIndex: sphereGeometry}
    )
    |. AssetGeometryDataEditorService.setGeometryData(editorState),
    engineState,
  );
};