let prepareDefaultComponent = (editorState, engineState) => {
  let (editorState, engineState, cubeGeometry) =
    PrepareDefaultComponentUtils.buildCubeGeometryDefaultComponent(
      editorState,
      engineState,
    );

  let (editorState, engineState) =
    PrepareDefaultComponentUtils.buildSphereGeometryDefaultComponent(
      editorState,
      engineState,
    );

  (editorState, engineState, cubeGeometry);
};

let prepareSpecificGameObjects = (editorState, engineState) => {
  let (engineState, gridPlane) =
    GeometryEngineService.createGridPlaneGameObject(
      (300., 10., 0.),
      [|0.6, 0.6, 0.6|],
      engineState,
    );
  let (editorState, engineState, camera) =
    CameraEngineService.createCamera(editorState, engineState);
  let (engineState, arcballCameraController) =
    ArcballCameraEngineService.create(engineState);

  let engineState =
    engineState
    |> TransformEngineService.setLocalPosition(
         (20., 0., 100.),
         GameObjectComponentEngineService.unsafeGetTransformComponent(
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

/* let computeDiffValue = editorState => {
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
   }; */

let _prepareEngineState = ((camera, directionLight, box1, box2), engineState) =>
  engineState
  |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(camera)
  |. BasicCameraViewEngineService.activeBasicCameraView(engineState)
  |> TransformEngineService.setLocalPosition(
       (0., 0., 40.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         camera,
         engineState,
       ),
     )
  |> TransformEngineService.setLocalPosition(
       (30., 4., 10.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         directionLight,
         engineState,
       ),
     )
  |> TransformEngineService.setTransformLocalEulerAngles(
       (45., 0., 0.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         directionLight,
         engineState,
       ),
     )
  |> SceneEngineService.addSceneChild(camera)
  |> SceneEngineService.addSceneChild(box1)
  |> SceneEngineService.addSceneChild(box2)
  |> SceneEngineService.addSceneChild(directionLight);

let createDefaultScene = (cubeGeometry, editorState, engineState) => {
  let (editorState, engineState, camera, box1, box2, directionLight) =
    SceneEngineService.createDefaultSceneGameObjects(
      cubeGeometry,
      editorState,
      engineState,
    );

  (
    editorState,
    engineState |> _prepareEngineState((camera, directionLight, box1, box2)),
    camera,
  );
};