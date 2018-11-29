open AssetGeometryDataType;

let getDefaultCubeGeometryName = () => "Wonder-Default-Cube";

let getDefaultSphereGeometryName = () => "Wonder-Default-Sphere";

let _buildDefaultCubeGeometryComponent = engineState => {
  let (engineState, cubeGeometry) =
    GeometryEngineService.createBoxGeometry(engineState);

  (
    engineState
    |> GeometryEngineService.setGeometryName(
         cubeGeometry,
         getDefaultCubeGeometryName(),
       ),
    cubeGeometry,
  );
};

let _buildDefaultSphereGeometryComponent = engineState => {
  let (engineState, sphereGeometry) =
    GeometryEngineService.createSphereGeometry(0.5, 28, engineState);

  (
    engineState
    |> GeometryEngineService.setGeometryName(
         sphereGeometry,
         getDefaultSphereGeometryName(),
       ),
    sphereGeometry,
  );
};

let buildDefaultCubeGeometryComponent = (editorState, engineState) => {
  let (engineState, cubeGeometry) =
    _buildDefaultCubeGeometryComponent(engineState);

  (
    editorState
    |> GeometryDataAssetEditorService.getGeometryData
    |> (
      geometry => {...geometry, defaultCubeGeometryComponent: cubeGeometry}
    )
    |. GeometryDataAssetEditorService.setGeometryData(editorState),
    engineState,
    cubeGeometry,
  );
};

let buildDefaultSphereGeometryComponent = (editorState, engineState) => {
  let (engineState, sphereGeometry) =
    _buildDefaultSphereGeometryComponent(engineState);

  (
    editorState
    |> GeometryDataAssetEditorService.getGeometryData
    |> (
      geometry => {
        ...geometry,
        defaultSphereGeometryComponent: sphereGeometry,
      }
    )
    |. GeometryDataAssetEditorService.setGeometryData(editorState),
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
    |> MaterialDataAssetEditorService.setDefaultBasicMaterialData(
         basicMaterial,
       )
    |> MaterialDataAssetEditorService.setDefaultLightMaterialData(
         lightMaterial,
       );

  (editorState, engineState);
};