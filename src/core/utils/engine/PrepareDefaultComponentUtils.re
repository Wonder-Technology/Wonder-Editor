open AssetGeometryDataType;

let _buildCubeGeometryDefaultComponent = engineState => {
  let (engineState, cubeGeometry) =
    GeometryEngineService.createCubeGeometry(engineState);

  (
    engineState |> GeometryEngineService.setGeometryName(cubeGeometry, "Cube"),
    cubeGeometry,
  );
};

let _buildSphereGeometryDefaultComponent = engineState => {
  let (engineState, sphereGeometry) =
    GeometryEngineService.createSphereGeometry(5., 28, engineState);

  (
    engineState
    |> GeometryEngineService.setGeometryName(sphereGeometry, "Sphere"),
    sphereGeometry,
  );
};

let buildCubeGeometryDefaultComponent = (editorState, engineState) => {
  /* let newIndex = editorState |> AssetIndexEditorService.getIndex; */
  let (engineState, cubeGeometry) =
    _buildCubeGeometryDefaultComponent(engineState);

  (
    editorState
    |> AssetGeometryDataEditorService.getGeometryData
    |> (geometry => {...geometry, defaultCubeGeometryIndex: cubeGeometry})
    |. AssetGeometryDataEditorService.setGeometryData(editorState),
    engineState,
    cubeGeometry,
  );
};

let buildSphereGeometryDefaultComponent = (editorState, engineState) => {
  let (editorState, newIndex) = editorState |> AssetIdUtils.getAssetId;
  let (engineState, sphereGeometry) =
    _buildSphereGeometryDefaultComponent(engineState);

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