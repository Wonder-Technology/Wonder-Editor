let prepareDefaultComponentForEditEngineState = engineState => {
  let (engineState, cubeGeometry) =
    PrepareDefaultComponentUtils.buildCubeGeometryDefaultComponent(
      engineState,
    );

  let (engineState, sphereGeometry) =
    PrepareDefaultComponentUtils.buildSphereGeometryDefaultComponent(
      engineState,
    );

  (engineState, cubeGeometry);
};

let prepareDefaultComponentForRunEngineState = (editorState, engineState) => {
  let (editorState, engineState, cubeGeometry) =
    PrepareDefaultComponentUtils.buildCubeGeometryDefaultComponentForRunEngineState(
      editorState,
      engineState,
    );

  let (editorState, engineState) =
    PrepareDefaultComponentUtils.buildSphereGeometryDefaultComponentForRunEngineState(
      editorState,
      engineState,
    );

  (editorState, engineState, cubeGeometry);
};

let prepareSpecificGameObjectsForEditEngineState =
    (editorState, editEngineState) => {
  let (engineState, gridPlane) =
    GeometryEngineService.createGridPlaneGameObject(
      (300., 10., 0.),
      [|0.6, 0.6, 0.6|],
      editEngineState,
    );
  let (engineState, camera) =
    CameraEngineService.createCameraForEditEngineState(engineState);
  let (engineState, arcballCameraController) =
    ArcballCameraEngineService.create(engineState);

  let engineState =
    engineState
    |> TransformEngineService.setLocalPosition(
         (20., 0., 100.),
         GameObjectComponentEngineService.getTransformComponent(
           camera,
           engineState,
         ),
       )
    |> ArcballCameraEngineService.setArcballCameraControllerDistance(
         200.,
         arcballCameraController,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerWheelSpeed(
         arcballCameraController,
         8.,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerTheta(
         arcballCameraController,
         Js.Math._PI /. 5.,
       )
    |> ArcballCameraEngineService.bindArcballCameraControllerEvent(
         arcballCameraController,
       )
    /* |> SceneEngineService.addSceneChild(gridPlane)
       |> SceneEngineService.addSceneChild(camera) */
    |> GameObjectLogicService.addArcballCameraControllerForEditEngineState(
         camera,
         arcballCameraController,
       );

  let editorState =
    editorState
    |> GameObjectEditorService.setGridPlane(gridPlane)
    |> GameObjectEditorService.setEditCamera(camera);

  (editorState, engineState, camera);
};

/* the engineState is unuse */
let computeDiffValue = editorState => {
  let diffMap =
    WonderCommonlib.HashMapService.createEmpty()
    |> WonderCommonlib.HashMapService.set("gameObject", 2)
    |> WonderCommonlib.HashMapService.set("transform", 2)
    |> WonderCommonlib.HashMapService.set("geometry", 1)
    |> WonderCommonlib.HashMapService.set("meshRenderer", 1)
    |> WonderCommonlib.HashMapService.set("basicMaterial", 1)
    |> WonderCommonlib.HashMapService.set("lightMaterial", 0)
    |> WonderCommonlib.HashMapService.set("directionLight", 0)
    |> WonderCommonlib.HashMapService.set("pointLight", 0)
    |> WonderCommonlib.HashMapService.set("basicCameraView", 1)
    |> WonderCommonlib.HashMapService.set("perspectiveCamera", 1)
    |> WonderCommonlib.HashMapService.set("arcballCameraController", 1)
    |> WonderCommonlib.HashMapService.set("texture", 0);

  editorState |> SceneEditorService.setDiffMap(diffMap);
};

let _prepareEngineState = ((camera, directionLight, box1, box2), engineState) =>
  engineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(camera)
  |. BasicCameraViewEngineService.activeBasicCameraView(engineState)
  |> TransformEngineService.setLocalPosition(
       (0., 0., 40.),
       GameObjectComponentEngineService.getTransformComponent(
         camera,
         engineState,
       ),
     )
  |> TransformEngineService.setLocalPosition(
       (30., 4., 10.),
       GameObjectComponentEngineService.getTransformComponent(
         directionLight,
         engineState,
       ),
     )
  |> TransformEngineService.setTransformLocalEulerAngles(
       (45., 0., 0.),
       GameObjectComponentEngineService.getTransformComponent(
         directionLight,
         engineState,
       ),
     )
  |> SceneEngineService.addSceneChild(camera)
  |> SceneEngineService.addSceneChild(box1)
  |> SceneEngineService.addSceneChild(box2)
  |> SceneEngineService.addSceneChild(directionLight);

let createDefaultSceneForEditEngineState = (cubeGeometry, engineState) => {
  let (engineState, camera, box1, box2, directionLight) =
    SceneEngineService.createDefaultSceneGameObjectsForEditEngineState(
      cubeGeometry,
      engineState,
    );

  engineState |> _prepareEngineState((camera, directionLight, box1, box2));
};
let createDefaultSceneForRunEngineState =
    (cubeGeometry, editorState, engineState) => {
  let (editorState, engineState, camera, box1, box2, directionLight) =
    SceneEngineService.createDefaultSceneGameObjectsForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );

  (
    editorState,
    engineState |> _prepareEngineState((camera, directionLight, box1, box2)),
  );
};