let unsafeGetScene = () => SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState;

let unsafeGetCurrentGameObject = () =>
  SceneEditorService.unsafeGetCurrentGameObject |> StateLogicService.getEditorState;

let clearCurrentGameObject = () =>
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState;

let addFakeVboBufferForGameObject = (gameObject) => {
  let engineState = StateLogicService.getEngineStateForEdit();
  engineState
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getBoxGeometryComponent(gameObject)
       |> StateLogicService.getEngineState
     )
  |> StateLogicService.setEngineStateForEdit
  |> ignore
};

let clearSceneChildren = () => {
  let engineState = StateLogicService.getEngineStateForEdit();
  let scene = unsafeGetScene();
  let engineState =
    engineState
    |> GameObjectUtils.getChildren(scene)
    |> Js.Array.reduce(
         (engineState, child) =>
           GameObjectComponentEngineService.hasBoxGeometryComponent(child, engineState) ?
             engineState
             |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
                  GameObjectComponentEngineService.getBoxGeometryComponent(child, engineState)
                ) :
             engineState,
         engineState
       );
  GameObjectUtils.disposeGameObjectChildren(scene, engineState) |> StateLogicService.setEngineStateForEdit
};

let getCurrentGameObjectTransform = () =>
  GameObjectComponentEngineService.getTransformComponent(unsafeGetCurrentGameObject())
  |> StateLogicService.getEngineState;

let getCurrentGameObjectMaterial = () =>
  GameObjectComponentEngineService.getBasicMaterialComponent(unsafeGetCurrentGameObject())
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
       (gameObject) => CameraEngineService.isCamera(gameObject) |> StateLogicService.getEngineState
     )
  |> ArrayService.getFirst
  |> setCurrentGameObject;

let setFirstBoxTobeCurrentGameObject = () =>
  unsafeGetScene()
  |> GameObjectTool.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         ! (CameraEngineService.isCamera(gameObject) |> StateLogicService.getEngineState)
     )
  |> ArrayService.getFirst
  |> setCurrentGameObject;

let prepareDefaultScene = (setCurrentGameObjectFunc) => {
  clearSceneChildren();
  let engineState = StateLogicService.getEngineStateForEdit();
  let scene = unsafeGetScene();
  let (engineState, camera) = CameraEngineService.createCamera(engineState);
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  engineState |> StateLogicService.setEngineStateForEdit;
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
  GameObjectComponentEngineService.hasBoxGeometryComponent(gameObject, engineState);

let getBoxInDefaultScene = (engineState) =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArrayService.unsafePop;