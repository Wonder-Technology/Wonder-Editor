let unsafeGetScene = () => SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState;

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
             |> MainEditorVboBufferToolEngine.passBufferShouldExistCheckWhenDisposeGeometry(
                  GameObjectComponentEngineService.getGeometryComponent(child, engineState)
                ) :
             engineState,
         engineState
       );
  GameObjectUtils.disposeGameObjectChildren(scene, engineState)
  |> StateEngineService.setState
};

let getChildren = (gameObject) =>
  GameObjectUtils.getChildren(gameObject) |> StateLogicService.getEngineState;

let _isBox = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasGeometryComponent(gameObject, engineState);

let getBoxInDefaultScene = (engineState) =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArraySystem.unsafePop;