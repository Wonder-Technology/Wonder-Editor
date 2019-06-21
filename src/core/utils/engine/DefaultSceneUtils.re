let prepareDefaultComponent = (editorState, engineState) => {
  let (editorState, engineState, cubeGeometry) =
    PrepareDefaultComponentLogicService.buildDefaultCubeGeometryComponent(
      editorState,
      engineState,
    );

  let (editorState, engineState) =
    PrepareDefaultComponentLogicService.buildDefaultSphereGeometryComponent(
      editorState,
      engineState,
    );

  let (editorState, engineState) =
    PrepareDefaultComponentLogicService.buildDefaultMaterialComponents(
      editorState,
      engineState,
    );

  (editorState, engineState, cubeGeometry);
};

let prepareSpecificGameObjects = (editorState, engineState) => {
  let (engineState, gridPlane) =
    GeometryEngineService.createGridPlaneGameObject(
      (300., 1., 0.),
      [|0.6, 0.6, 0.6|],
      engineState,
    );
  let (editorState, engineState, camera) =
    CameraLogicService.createCamera(editorState, engineState);
  let (engineState, flyCameraController) =
    FlyCameraEngineService.create(engineState);

  let engineState =
    engineState
    |> FlyCameraEngineService.setFlyCameraControllerMoveSpeed(
         flyCameraController,
         0.1,
       )
    |> FlyCameraEngineService.setFlyCameraControllerWheelSpeed(
         flyCameraController,
         1.5,
       )
    |> FlyCameraControllerLogicService.bindFlyCameraControllerEventForSceneView(
         flyCameraController,
       )
    |> TransformEngineService.setLocalPosition(
         (0., 0., 10.),
         engineState
         |> GameObjectComponentEngineService.unsafeGetTransformComponent(
              camera,
            ),
       );

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addFlyCameraController(
         camera,
         flyCameraController,
       );

  let editorState =
    editorState
    |> SceneViewEditorService.setGridPlane(gridPlane)
    |> SceneViewEditorService.setEditCamera(camera);

  (editorState, engineState, camera);
};

let _prepareEngineState =
    ((camera, directionLight, cube1, cube2), engineState) =>
  engineState
  |> BasicCameraViewEngineService.activeBasicCameraView(
       engineState
       |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
            camera,
          ),
     )
  |> TransformEngineService.setLocalPosition(
       (0., 0., 4.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         camera,
         engineState,
       ),
     )
  |> TransformEngineService.setLocalPosition(
       (3., 4., 1.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         directionLight,
         engineState,
       ),
     )
  |> TransformEngineService.setTransformLocalEulerAngles(
       (145., 15., 0.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         directionLight,
         engineState,
       ),
     )
  |> SceneEngineService.addSceneChild(camera)
  |> SceneEngineService.addSceneChild(cube1)
  |> SceneEngineService.addSceneChild(cube2)
  |> SceneEngineService.addSceneChild(directionLight);

let createDefaultScene = (cubeGeometry, editorState, engineState) => {
  let defaultLightMaterialData =
    MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(editorState);

  let (editorState, engineState, camera, cube1, cube2, directionLight) =
    SceneLogicService.createDefaultSceneGameObjects(
      (cubeGeometry, defaultLightMaterialData),
      editorState,
      engineState,
    );

  (
    editorState,
    engineState |> _prepareEngineState((camera, directionLight, cube1, cube2)),
    camera,
  );
};

/* let isAssetGeometry = geometry => geometry >= 1; */