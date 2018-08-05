let prepareSpecificGameObjectsForEditEngineState =
    (editorState, engineStateForEdit) => {
  let (editorState, engineState, gridPlane) =
    CustomGeometryEngineService.createGridPlaneGameObject(
      (200., 6., 0.),
      [|0.7, 0.7, 0.7|],
      (editorState, engineStateForEdit),
    );
  let (editorState, engineState, camera) =
    CameraEngineService.createCamera(editorState, engineState);
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
    |> SceneEngineService.addSceneChild(gridPlane)
    |> SceneEngineService.addSceneChild(camera);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraControllerComponent(
         camera,
         arcballCameraController,
       );

  (editorState, engineState, camera);
};

let computeDiffValue = (editorState, engineState) => {
  /* TODO add customGeometry diff  */
  /* TODO handle add/dispose customGeometry with diff  */
  let diffMap =
    WonderCommonlib.HashMapService.createEmpty()
    |> WonderCommonlib.HashMapService.set("gameObject", 2)
    |> WonderCommonlib.HashMapService.set("transform", 2)
    |> WonderCommonlib.HashMapService.set("meshRenderer", 2)
    |> WonderCommonlib.HashMapService.set("basicMaterial", 1)
    |> WonderCommonlib.HashMapService.set("lightMaterial", 0)
    |> WonderCommonlib.HashMapService.set("directionLight", 0)
    |> WonderCommonlib.HashMapService.set("pointLight", 0)
    |> WonderCommonlib.HashMapService.set("arcballCameraController", 1)
    |> WonderCommonlib.HashMapService.set("texture", 0);

  (editorState |> SceneEditorService.setDiffMap(diffMap), engineState);
};

let createDefaultScene = (editorState, engineState) => {
  let (editorState, engineState, camera, box1, box2, directionLight) =
    SceneEngineService.createDefaultSceneGameObjects(
      editorState,
      engineState,
      CameraEngineService.createCamera,
    );

  (
    editorState,
    engineState
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
    |> SceneEngineService.addSceneChild(directionLight),
  );
};