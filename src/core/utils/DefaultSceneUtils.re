let prepareSpecificGameObjectsForEditEngineState = (scene, engineStateForEdit) => {
  let (engineState, camera) = CameraEngineService.createCamera(engineStateForEdit);
  let transform = GameObjectComponentEngineService.getTransformComponent(camera, engineState);
  engineState
  |> TransformEngineService.setLocalPosition((20., 0., 100.), transform)
  |> GameObjectUtils.addChild(scene, camera)
  |> SceneEngineService.setCurrentCameraGameObject(camera)
};

let computeDiffValue = (editorState, engineState) => {
  let diffMap =
    WonderCommonlib.HashMapService.createEmpty()
    |> WonderCommonlib.HashMapService.set("gameObject", 1)
    |> WonderCommonlib.HashMapService.set("transform", 1)
    /* TODO fix: 
    description
    change added box->material color will cause camera box change material color

    reason
    we need control the diff's create in the prepareSpecificGameObjectsForEditEngineState

    solution
    create a box add into camera, represent the camera
     */
    |> WonderCommonlib.HashMapService.set("material", 0);
  editorState |> SceneEditorService.setDiffMap(diffMap) |> StateEditorService.setState |> ignore;
  engineState
};

let createDefaultSceneForEdit = (scene, engineState) => {
  let (engineState, camera, box1, box2) =
    SceneEngineService.createDefaultSceneGameObjects(
      engineState,
      CameraEngineService.createCameraBox
    );
  engineState
  |> TransformEngineService.setLocalPosition(
       (0., 0., 40.),
       GameObjectComponentEngineService.getTransformComponent(camera, engineState)
     )
  |> BasicMaterialEngineService.setColor(
       [|1., 0.1, 0.1|],
       GameObjectComponentEngineService.getBasicMaterialComponent(camera, engineState)
     )
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(scene, box2)
};

let createDefaultSceneForRun = (scene, engineState) => {
  let (engineState, camera, box1, box2) =
    SceneEngineService.createDefaultSceneGameObjects(
      engineState,
      CameraEngineService.createCamera
    );
  let transform = GameObjectComponentEngineService.getTransformComponent(camera, engineState);
  engineState
  |> TransformEngineService.setLocalPosition((0., 0., 40.), transform)
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(scene, box2)
};
