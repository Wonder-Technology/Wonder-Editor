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
  let (engineState, arcballCameraController) =
    ArcballCameraEngineService.create(engineState);

  let engineState =
    engineState
    |> ArcballCameraEngineService.setArcballCameraControllerDistance(
         20.,
         arcballCameraController,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerWheelSpeed(
         arcballCameraController,
         0.5,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedX(
         arcballCameraController,
         1.,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedY(
         arcballCameraController,
         1.,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerTheta(
         arcballCameraController,
         Js.Math._PI /. 5.,
       )
    |> ArcballCameraControllerLogicService.bindArcballCameraControllerEventForSceneView(
         arcballCameraController,
       );

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraController(
         camera,
         arcballCameraController,
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