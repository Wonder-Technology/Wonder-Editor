let prepareSpecificGameObjectsForEditEngineState =
    (editorState, engineStateForEdit) => {
  let (editorState, engineState, gridPlane) =
    CustomGeometryEngineService.createGridPlaneGameObject(
      (200., 6., 0.),
      [|0.9, 0.9, 0.9|],
      (editorState, engineStateForEdit),
    );
  let (editorState, engineState, camera) =
    CameraEngineService.createCamera(editorState, engineState);
  let (editorState, engineState, box) =
    PrimitiveEngineService.createBox(editorState, engineState);
  let (engineState, arcballController) =
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
    |> LightMaterialEngineService.setLightMaterialDiffuseColor(
         [|1., 0.1, 0.1|],
         GameObjectComponentEngineService.getLightMaterialComponent(
           box,
           engineState,
         ),
       )
    |> ArcballCameraEngineService.setArcballCameraControllerDistance(
         200.,
         arcballController,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerTheta(
         arcballController,
         Js.Math._PI /. 5.,
       )
    |> SceneEngineService.addSceneChild(gridPlane)
    |> SceneEngineService.addSceneChild(camera)
    |> SceneEngineService.setCurrentCameraGameObject(camera);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraControllerComponent(
         camera,
         arcballController,
       );

  (editorState, engineState, box);
};

let computeDiffValue = (editorState, engineState) => {
  /* TODO add customGeometry diff  */
  /* TODO handle add/dispose customGeometry with diff  */
  let diffMap =
    WonderCommonlib.HashMapService.createEmpty()
    |> WonderCommonlib.HashMapService.set("gameObject", 3)
    |> WonderCommonlib.HashMapService.set("transform", 3)
    |> WonderCommonlib.HashMapService.set("meshRenderer", 3)
    |> WonderCommonlib.HashMapService.set("basicMaterial", 1)
    |> WonderCommonlib.HashMapService.set("lightMaterial", 1)
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
    camera,
  );
};