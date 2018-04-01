let unsafeGetEditScene = () =>
  SceneEditorService.unsafeGetEditScene |> StateLogicService.getEditorState;

let unsafeGetRunScene = () =>
  SceneEditorService.unsafeGetRunScene |> StateLogicService.getEditorState;

let unsafeGetCurrentGameObject = () =>
  SceneEditorService.unsafeGetCurrentGameObject |> StateLogicService.getEditorState;

let clearCurrentGameObject = () =>
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState;

let addFakeVboBufferForGameObject = (gameObject) => {
  StateLogicService.getEngineStateForEdit()
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getGeometryComponent(gameObject)
       |> StateLogicService.getEngineStateToGetData
     )
  |> StateLogicService.setEngineStateForEdit;
  StateLogicService.getEngineStateForRun()
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getGeometryComponent(gameObject)
       |> StateLogicService.getEngineStateToGetData
     )
  |> StateLogicService.setEngineStateForRun
  |> ignore
};

let clearSceneChildren = () => {
  let scene = unsafeGetEditScene();
  let engineStateForEdit = StateLogicService.getEngineStateForEdit();
  let engineStateForEdit =
    engineStateForEdit
    |> GameObjectUtils.getChildren(scene)
    |> Js.Array.reduce(
         (engineState, child) =>
           GameObjectComponentEngineService.hasBoxGeometryComponent(child, engineState) ?
             engineState
             |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
                  GameObjectComponentEngineService.getGeometryComponent(child, engineState)
                ) :
             engineState,
         engineStateForEdit
       );
  engineStateForEdit
  |> GameObjectUtils.disposeGameObjectChildren(scene)
  |> StateLogicService.setEngineStateForEdit;
  let engineStateForRun = StateLogicService.getEngineStateForRun();
  let engineStateForRun =
    engineStateForRun
    |> GameObjectUtils.getChildren(scene)
    |> Js.Array.reduce(
         (engineState, child) =>
           GameObjectComponentEngineService.hasBoxGeometryComponent(child, engineState) ?
             engineState
             |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
                  GameObjectComponentEngineService.getGeometryComponent(child, engineState)
                ) :
             engineState,
         engineStateForRun
       );
  engineStateForRun
  |> GameObjectUtils.disposeGameObjectChildren(scene)
  |> StateLogicService.setEngineStateForRun
};

let getCurrentGameObjectTransform = () =>
  GameObjectComponentEngineService.getTransformComponent(unsafeGetCurrentGameObject())
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectMaterial = () =>
  GameObjectComponentEngineService.getBasicMaterialComponent(unsafeGetCurrentGameObject())
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObject = () =>
  SceneEditorService.getCurrentGameObject |> StateLogicService.getEditorState;

let setCurrentGameObject = (gameObject) =>
  SceneEditorService.setCurrentGameObject(gameObject) |> StateLogicService.getAndSetEditorState;

let hasCurrentGameObject = () =>
  SceneEditorService.hasCurrentGameObject |> StateLogicService.getEditorState;

let setCameraTobeCurrentGameObject = () =>
  unsafeGetEditScene()
  |> GameObjectTool.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         CameraEngineService.isCamera(gameObject) |> StateLogicService.getEngineStateToGetData
     )
  |> ArrayService.getFirst
  |> setCurrentGameObject;

let setFirstBoxTobeCurrentGameObject = () =>
  unsafeGetEditScene()
  |> GameObjectTool.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         ! (CameraEngineService.isCamera(gameObject) |> StateLogicService.getEngineStateToGetData)
     )
  |> ArrayService.getFirst
  |> setCurrentGameObject;

let _createDefaultSceneGameObjects = (engineState) => {
  let (engineState, camera) = CameraEngineService.createCamera(engineState);
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  (camera, box1, box2, box3, engineState)
};

let _createDefaultSceneGameObjectsAndInit = (engineState) => {
  let (camera, box1, box2, box3, engineState) = _createDefaultSceneGameObjects(engineState);
  let engineState =
    engineState
    |> GameObjectEngineService.initGameObject(camera)
    |> GameObjectEngineService.initGameObject(box1)
    |> GameObjectEngineService.initGameObject(box2)
    |> GameObjectEngineService.initGameObject(box3);
  (camera, box1, box2, box3, engineState)
};

let _prepareDefaultScene = (setCurrentGameObjectFunc, createDefaultSceneGameObjectsFunc) => {
  let scene = unsafeGetEditScene();
  let (camera, box1, box2, box3, engineStateForEdit) =
    createDefaultSceneGameObjectsFunc(StateLogicService.getEngineStateForEdit());
  engineStateForEdit
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(scene, box2)
  |> GameObjectUtils.addChild(scene, box3)
  |> StateLogicService.setEngineStateForEdit;
  let (camera, box1, box2, box3, engineStateForRun) =
    createDefaultSceneGameObjectsFunc(StateLogicService.getEngineStateForRun());
  engineStateForRun
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(scene, box2)
  |> GameObjectUtils.addChild(scene, box3)
  |> StateLogicService.setEngineStateForRun;
  setCurrentGameObjectFunc()
};

let createDefaultScene = (setCurrentGameObjectFunc) =>
  _prepareDefaultScene
    (setCurrentGameObjectFunc, _createDefaultSceneGameObjects);

let prepareDefaultScene = (setCurrentGameObjectFunc) => {
  clearSceneChildren();
  _prepareDefaultScene(setCurrentGameObjectFunc, _createDefaultSceneGameObjectsAndInit)
};

let _isBox = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasBoxGeometryComponent(gameObject, engineState);

let getBoxInDefaultScene = (engineState) =>
  GameObjectUtils.getChildren(unsafeGetEditScene(), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArrayService.unsafePop;