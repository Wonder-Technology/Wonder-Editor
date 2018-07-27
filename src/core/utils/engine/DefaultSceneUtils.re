let prepareSpecificGameObjectsForEditEngineState = engineStateForEdit => {
  let (engineState, camera) =
    CameraEngineService.createCamera(engineStateForEdit);
  let (engineState, box) = PrimitiveEngineService.createBox(engineState);
  let (engineState, arcballComponent) =
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
    |> GameObjectComponentEngineService.addArcballCameraControllerComponent(
         camera,
         arcballComponent,
       )
    |> SceneEngineService.addSceneChild(camera)
    |> SceneEngineService.addSceneChild(box)
    |> SceneEngineService.setCurrentCameraGameObject(camera);
  (engineState, box);
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
    |> WonderCommonlib.HashMapService.set("arcballCamera", 1)
    |> WonderCommonlib.HashMapService.set("texture", 0);

  (editorState |> SceneEditorService.setDiffMap(diffMap), engineState);
};

let createDefaultScene = engineState => {
  let (engineState, camera, box1, box2, directionLight) =
    SceneEngineService.createDefaultSceneGameObjects(
      engineState,
      CameraEngineService.createCamera,
    );

  (
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