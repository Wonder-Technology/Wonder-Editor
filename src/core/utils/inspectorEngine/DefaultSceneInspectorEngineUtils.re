let _initCameraAddToSceneGameObject = (camera, inspectorEngineState) =>
  inspectorEngineState
  |> TransformEngineService.setLocalPosition(
       (0., 0., 1.1),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         camera,
         inspectorEngineState,
       ),
     )
  |> BasicCameraViewEngineService.activeBasicCameraView(
       inspectorEngineState
       |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
            camera,
          ),
     )
  |> SceneEngineService.addSceneChild(camera);
let _initDirectionLightAddToSceneGameObject =
    (directionLight, inspectorEngineState) =>
  inspectorEngineState
  |> TransformEngineService.setLocalPosition(
       (3., 4., 1.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         directionLight,
         inspectorEngineState,
       ),
     )
  |> TransformEngineService.setTransformLocalEulerAngles(
       (75., 65., (-60.)),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         directionLight,
         inspectorEngineState,
       ),
     )
  |> SceneEngineService.addSceneChild(directionLight);

let _initEmptyGameObjectAddToSceneGameObject =
    (emptyGameObject, inspectorEngineState) =>
  inspectorEngineState |> SceneEngineService.addSceneChild(emptyGameObject);

let createDefaultScene = inspectorEngineState => {
  let (inspectorEngineState, camera) =
    PrimitiveEngineService.createCamera(inspectorEngineState);
  let (inspectorEngineState, directionLight) =
    PrimitiveEngineService.createDirectionLight(inspectorEngineState);
  let (inspectorEngineState, emptyGameObject) =
    GameObjectEngineService.create(inspectorEngineState);

  let inspectorEngineState =
    inspectorEngineState
    |> _initCameraAddToSceneGameObject(camera)
    |> _initDirectionLightAddToSceneGameObject(directionLight)
    |> _initEmptyGameObjectAddToSceneGameObject(emptyGameObject);

  (emptyGameObject, inspectorEngineState);
};