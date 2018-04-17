let unsafeGetScene = () => SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState;

/* TODO remove */
/* let clearSceneChildren = () => {
  let scene = unsafeGetScene();
  let engineStateForEdit = StateLogicService.getEditEngineState();
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
  |> StateLogicService.setEditEngineState;
  let engineStateForRun = StateLogicService.getRunEngineState();
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
  |> StateLogicService.setRunEngineState
}; */

let setCameraTobeCurrentGameObject = () =>
  unsafeGetScene()
  |> GameObjectTool.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         CameraEngineService.isCamera(gameObject) |> StateLogicService.getEngineStateToGetData
     )
  |> ArrayService.getFirst
  |> GameObjectTool.setCurrentGameObject;

let setFirstBoxTobeCurrentGameObject = () =>
  unsafeGetScene()
  |> GameObjectTool.getChildren
  |> Js.Array.filter(
       (gameObject) =>
         ! (CameraEngineService.isCamera(gameObject) |> StateLogicService.getEngineStateToGetData)
     )
  |> ArrayService.getFirst
  |> GameObjectTool.setCurrentGameObject;

let initStateAndGl = (sandbox) => {
  TestTool.initEditorAndEngineStateAndInitScene(sandbox);
  TestToolEngine.setFakeGl(sandbox);
  AllMaterialToolEngine.prepareForInit()
};

let createDefaultScene = (sandbox, setCurrentGameObjectFunc) => {
  let scene = unsafeGetScene();
  let editorState = StateEditorService.getState();
  let editEngineState = StateLogicService.getEditEngineState();
  let (editEngineState, box) =
    editEngineState |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(scene);
  editEngineState
  |> DefaultSceneUtils.computeDiffValue(editorState)
  |> DefaultSceneUtils.createDefaultSceneForEdit(scene, box)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  /* |> DirectorEngineService.init */
  |> StateLogicService.setEditEngineState;
  StateLogicService.getRunEngineState()
  |> DefaultSceneUtils.createDefaultSceneForRun(scene)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  /* |> DirectorEngineService.init */
  |> StateLogicService.setRunEngineState;
  setCurrentGameObjectFunc()
};

let _isBox = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasBoxGeometryComponent(gameObject, engineState);

let getBoxInDefaultScene = (engineState) =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArrayService.unsafePop;