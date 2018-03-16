let unsafeGetScene = () => SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState;

let unsafeGetCurrentGameObject = () =>
  SceneEditorService.unsafeGetCurrentGameObject |> StateLogicService.getEditorState;

let clearCurrentGameObject = () =>
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState;

let addFakeVboBufferForGameObject = (gameObject) => {
  let engineState = StateEngineService.getState();
  engineState
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getGeometryComponent(gameObject)
       |> StateLogicService.getEngineState
     )
  |> StateEngineService.setState
  |> ignore
};
let clearSceneChildren = () => {
  let engineState = StateEngineService.getState();
  let scene = unsafeGetScene();
  let engineState =
    engineState
    |> GameObjectUtils.getChildren(scene)
    |> Js.Array.reduce(
         (engineState, child) =>
           GameObjectComponentEngineService.hasGeometryComponent(child, engineState) ?
             engineState
             |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
                  GameObjectComponentEngineService.getGeometryComponent(child, engineState)
                ) :
             engineState,
         engineState
       );
  GameObjectUtils.disposeGameObjectChildren(scene, engineState) |> StateEngineService.setState
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
  SceneEditorService.setCurrentGameObject(gameObject) |> StateLogicService.getAndSetEditorState;

let hasCurrentGameObject = () =>
  SceneEditorService.hasCurrentGameObject |> StateLogicService.getEditorState;

let setCameraTobeCurrentGameObject = () =>
  unsafeGetScene()
  |> GameObjectTool.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         GameObjectComponentEngineService.hasCameraControllerComponent(gameObject)
         |> StateLogicService.getEngineState
     )
  |> ArrayService.getFirst
  |> setCurrentGameObject;

let setFirstBoxTobeCurrentGameObject = () =>
  unsafeGetScene()
  |> GameObjectTool.getChildren
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
  clearSceneChildren();
  let engineState = StateEngineService.getState();
  let scene = unsafeGetScene();
  let (engineState, camera) = PerspectiveCameraProjectionEngineService.createCamera(engineState);
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


let _isBox = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasGeometryComponent(gameObject, engineState);

let getBoxInDefaultScene = (engineState) =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArrayService.unsafePop;