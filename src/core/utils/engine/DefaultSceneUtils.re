let prepareSpecificGameObjectsForEditEngineState =
    (editorState, engineStateForEdit) => {
  let (editorState, engineState, camera) =
    CameraEngineService.createCamera(editorState, engineStateForEdit);
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
         80.,
         arcballController,
       )
    |> SceneEngineService.addSceneChild(camera)
    |> SceneEngineService.addSceneChild(box)
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
  let diffMap =
    WonderCommonlib.HashMapService.createEmpty()
    |> WonderCommonlib.HashMapService.set("gameObject", 2)
    |> WonderCommonlib.HashMapService.set("transform", 2)
    |> WonderCommonlib.HashMapService.set("meshRenderer", 2)
    |> WonderCommonlib.HashMapService.set("basicMaterial", 0)
    |> WonderCommonlib.HashMapService.set("lightMaterial", 1)
    |> WonderCommonlib.HashMapService.set("directionLight", 0)
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
         (10., 4., 10.),
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