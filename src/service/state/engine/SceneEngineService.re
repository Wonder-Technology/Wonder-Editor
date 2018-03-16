let addBox = (targetGameObject, engineState) => {
  let (engineState, box) = PrimitiveEngineService.createBox(engineState);
  (
    box,
    engineState
    |> GameObjectEngineService.initGameObject(box)
    |> GameObjectUtils.addChild(targetGameObject, box)
  )
};

let createDefaultSceneGameObjects = (state) => {
  let (state, box1) = PrimitiveEngineService.createBox(state);
  let (state, box2) = PrimitiveEngineService.createBox(state);
  let (state, camera) = CameraEngineService.createCamera(state);
  (state, camera, box1, box2)
};