let unsafeGetCurrentGameObject = () =>
  StateFacade.prepareState() |> CurrentGameObjectFacade.unsafeGetCurrentGameObject;

let clearCurrentGameObject = () =>
  StateFacade.prepareState()
  |> CurrentGameObjectFacade.clearCurrentGameObject
  |> StateFacade.finishState;

let addFakeVboBufferForGameObject = (gameObject) => {
  let engineState = EngineStateFacade.getState();
  engineState
  |> MainEditorVboBufferToolEngine.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectFacade.getGeometryComponent(gameObject) |> StateFacade.getState
     )
  |> EngineStateFacade.setState
  |> ignore
};

let getCurrentGameObjectTransform = () =>
  GameObjectFacade.getTransformComponent(unsafeGetCurrentGameObject()) |> StateFacade.getState;

let getCurrentGameObjectMaterial = () =>
  GameObjectFacade.getMaterialComponent(unsafeGetCurrentGameObject()) |> StateFacade.getState;

let getCurrentGameObject = () =>
  StateFacade.prepareState() |> CurrentGameObjectFacade.getCurrentGameObject;

let setCurrentGameObject = (gameObject) =>
  StateFacade.prepareState()
  |> CurrentGameObjectFacade.setCurrentGameObject(gameObject)
  |> StateFacade.finishState;

let hasCurrentGameObject = () =>
  StateFacade.prepareState() |> CurrentGameObjectFacade.hasCurrentGameObject;

let setCameraTobeCurrentGameObject = () =>
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         GameObjectFacade.hasCameraControllerComponent(gameObject) |> StateFacade.getState
     )
  |> OperateArrayUtils.getFirst
  |> setCurrentGameObject;

let setFirstBoxTobeCurrentGameObject = () => {
  let (_, engineState) = StateFacade.prepareState();
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         ! (GameObjectFacade.hasCameraControllerComponent(gameObject) |> StateFacade.getState)
     )
  |> OperateArrayUtils.getFirst
  |> setCurrentGameObject
};

let prepareDefaultScene = (setCurrentGameObjectFunc) => {
  MainEditorSceneToolEngine.clearSceneChildren();
  let (editorState, engineState) = StateFacade.prepareState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, camera) = CameraLogicCompositeService.createCamera(engineState);
  let (engineState, box1) = PrimitiveLogicCompositeService.createBox(engineState);
  let (engineState, box2) = PrimitiveLogicCompositeService.createBox(engineState);
  let (engineState, box3) = PrimitiveLogicCompositeService.createBox(engineState);
  (editorState, engineState) |> StateFacade.finishState;
  (
    (stateTuple) =>
      stateTuple
      |> GameObjectFacade.addChild(scene, camera)
      |> GameObjectFacade.addChild(scene, box1)
      |> GameObjectFacade.addChild(scene, box2)
      |> GameObjectFacade.addChild(scene, box3)
  )
  |> StateFacade.getAndSetState;
  (
    (stateTuple) =>
      stateTuple
      |> GameObjectFacade.initGameObject(camera)
      |> GameObjectFacade.initGameObject(box1)
      |> GameObjectFacade.initGameObject(box2)
      |> GameObjectFacade.initGameObject(box3)
  )
  |> StateFacade.getAndSetState;
  setCurrentGameObjectFunc()
};