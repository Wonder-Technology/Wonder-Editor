let unsafeGetCurrentGameObject = () =>
  StateFacade.prepareState() |> MainEditorSceneView.unsafeGetCurrentGameObject;

let clearCurrentGameObject = () =>
  StateFacade.prepareState()
  |> MainEditorSceneView.clearCurrentGameObject
  |> StateFacade.finishState;

let addFakeVboBufferForGameObject = (gameObject) => {
  let engineState = EngineStateFacade.getEngineState();
  engineState
  |> MainEditorVboBufferToolEngine.passBufferShouldExistCheckWhenDisposeGeometry(
       MainEditorGameObjectAdaptor.getGeometryComponent(gameObject, engineState)
     )
  |> EngineStateFacade.setEngineState
  |> ignore
};

let getCurrentGameObjectTransform = () => {
  let (_, engineState) = StateFacade.prepareState();
  engineState |> MainEditorGameObjectOper.getTransformComponent(unsafeGetCurrentGameObject())
};

let getCurrentGameObjectMaterial = () => {
  let (_, engineState) = StateFacade.prepareState();
  engineState |> MainEditorGameObjectOper.getMaterialComponent(unsafeGetCurrentGameObject())
};

let getCurrentGameObject = () =>
  StateFacade.prepareState() |> MainEditorSceneView.getCurrentGameObject;

let setCurrentGameObject = (gameObject) =>
  StateFacade.prepareState()
  |> MainEditorSceneView.setCurrentGameObject(gameObject)
  |> StateFacade.finishState;

let hasCurrentGameObject = () =>
  StateFacade.prepareState() |> MainEditorSceneView.hasCurrentGameObject;

let setCameraTobeCurrentGameObject = () => {
  let (_, engineState) = StateFacade.prepareState();
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> Js.Array.filter((gameObject) => engineState |> MainEditorCameraOper.isCamera(gameObject))
  |> OperateArrayUtils.getFirst
  |> setCurrentGameObject
};

let setFirstBoxTobeCurrentGameObject = () => {
  let (_, engineState) = StateFacade.prepareState();
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> Js.Array.filter((gameObject) => ! (engineState |> MainEditorCameraOper.isCamera(gameObject)))
  |> OperateArrayUtils.getFirst
  |> setCurrentGameObject
};

let prepareDefaultScene = (setCurrentGameObjectFunc) => {
  MainEditorSceneToolEngine.clearSceneChildren();
  let (editorState, engineState) = StateFacade.prepareState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, camera) = MainEditorCameraOper.createCamera(engineState);
  let (engineState, box1) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box2) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box3) = MainEditorPrimitiveOper.createBox(engineState);
  let engineState =
    engineState
    |> MainEditorGameObjectOper.addChild(scene, camera)
    |> MainEditorGameObjectOper.addChild(scene, box1)
    |> MainEditorGameObjectOper.addChild(scene, box2)
    |> MainEditorGameObjectOper.addChild(scene, box3);
  let engineState =
    engineState
    |> MainEditorGameObjectAdaptor.initGameObject(camera)
    |> MainEditorGameObjectAdaptor.initGameObject(box1)
    |> MainEditorGameObjectAdaptor.initGameObject(box2)
    |> MainEditorGameObjectAdaptor.initGameObject(box3);
  (editorState, engineState) |> StateFacade.finishState;
  setCurrentGameObjectFunc()
};