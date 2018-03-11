let unsafeGetCurrentGameObject = () =>
  SceneEditorService.unsafeGetCurrentGameObject |> StateLogicService.getEditorState;

let clearCurrentGameObject = () =>
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState;

let addFakeVboBufferForGameObject = (gameObject) => {
  let engineState = StateEngineService.getState();
  engineState
  |> MainEditorVboBufferToolEngine.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getGeometryComponent(gameObject) |> StateLogicService.getEngineState
     )
  |> StateEngineService.setState
  |> ignore
};

let getCurrentGameObjectTransform = () =>
  GameObjectComponentEngineService.getTransformComponent(unsafeGetCurrentGameObject())
  |> StateLogicService.getEngineState;

let getCurrentGameObjectMaterial = () =>
  GameObjectComponentEngineService.getMaterialComponent(unsafeGetCurrentGameObject())
  |> StateLogicService.getEngineState;

let getCurrentGameObject = () =>
  SceneEditorService.getCurrentGameObject |> StateLogicService.getEditorState;

let setCurrentGameObject = (gameObject) =>
  SceneEditorService.setCurrentGameObject(gameObject)
  |> StateLogicService.getAndSetEditorState;

let hasCurrentGameObject = () =>
  SceneEditorService.hasCurrentGameObject |> StateLogicService.getEditorState;

let setCameraTobeCurrentGameObject = () =>
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         GameObjectComponentEngineService.hasCameraControllerComponent(gameObject)
         |> StateLogicService.getEngineState
     )
  |> ArrayService.getFirst
  |> setCurrentGameObject;

let setFirstBoxTobeCurrentGameObject = () =>
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         ! (
           GameObjectComponentEngineService.hasCameraControllerComponent(gameObject)
           |> StateLogicService.getEngineState
         )
     )
  |> ArrayService.getFirst
  |> setCurrentGameObject;

let prepareDefaultScene = (setCurrentGameObjectFunc) => {
  MainEditorSceneToolEngine.clearSceneChildren();
  let engineState = StateEngineService.getState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, camera) = CameraEngineService.createCamera(engineState);
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  engineState |> StateEngineService.setState;
  (
    (engineState) =>
      engineState
      |> GameObjectUtils.addChild(scene, camera)
      |> GameObjectUtils.addChild(scene, box1)
      |> GameObjectUtils.addChild(scene, box2)
      |> GameObjectUtils.addChild(scene, box3)
  )
  |> StateLogicService.getAndSetEngineState;
  (
    (engineState) =>
      engineState
      |> GameObjectEngineService.initGameObject(camera)
      |> GameObjectEngineService.initGameObject(box1)
      |> GameObjectEngineService.initGameObject(box2)
      |> GameObjectEngineService.initGameObject(box3)
  )
  |> StateLogicService.getAndSetEngineState;
  setCurrentGameObjectFunc()
};