open AssetGeometryDataType;

let _buildDefaultCubeGeometryComponent = engineState => {
  let (engineState, cubeGeometry) =
    GeometryEngineService.createCubeGeometry(engineState);

  (
    engineState |> GeometryEngineService.setGeometryName(cubeGeometry, "Cube"),
    cubeGeometry,
  );
};

let _buildDefaultSphereGeometryComponent = engineState => {
  let (engineState, sphereGeometry) =
    GeometryEngineService.createSphereGeometry(5., 28, engineState);

  (
    engineState
    |> GeometryEngineService.setGeometryName(sphereGeometry, "Sphere"),
    sphereGeometry,
  );
};

let buildDefaultCubeGeometryComponent = (editorState, engineState) => {
  let (engineState, cubeGeometry) =
    _buildDefaultCubeGeometryComponent(engineState);

  (
    editorState
    |> AssetGeometryDataEditorService.getGeometryData
    |> (geometry => {...geometry, defaultCubeGeometryIndex: cubeGeometry})
    |. AssetGeometryDataEditorService.setGeometryData(editorState),
    engineState,
    cubeGeometry,
  );
};

let buildDefaultSphereGeometryComponent = (editorState, engineState) => {
  let (engineState, sphereGeometry) =
    _buildDefaultSphereGeometryComponent(engineState);

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

let getDefaultBasicMaterialName = () => "Wonder-Default-Basic-Material";

let getDefaultLightMaterialName = () => "Wonder-Default-Light-Material";

let buildDefaultMaterialComponents = (editorState, engineState) => {
  let (engineState, basicMaterial) =
    BasicMaterialEngineService.create(engineState);

  let (engineState, lightMaterial) =
    LightMaterialEngineService.create(engineState);

  let engineState =
    engineState
    |> BasicMaterialEngineService.setBasicMaterialName(
         basicMaterial,
         getDefaultBasicMaterialName(),
       )
    |> LightMaterialEngineService.setLightMaterialName(
         lightMaterial,
         getDefaultLightMaterialName(),
       );

  let editorState =
    editorState
    |> DefaultMaterialEditorService.setDefaultBasicMaterial(basicMaterial)
    |> DefaultMaterialEditorService.setDefaultLightMaterial(lightMaterial);

  (editorState, engineState);
};