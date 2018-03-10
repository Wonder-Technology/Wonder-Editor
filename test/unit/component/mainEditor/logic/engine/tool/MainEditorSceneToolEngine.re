let unsafeGetScene = () => SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState;

let clearSceneChildren = () => {
  let engineState = StateEngineService.getState();
  let scene = unsafeGetScene();
  let engineState =
    engineState
    |> GameObjectEngineService.getChildren(scene)
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
  GameObjectEngineService.disposeGameObjectChildren(scene, engineState)
  |> StateEngineService.setState
};

let getChildren = (gameObject) =>
  GameObjectEngineService.getChildren(gameObject) |> StateLogicService.getEngineState;

let _isBox = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasGeometryComponent(gameObject, engineState);

let getBoxInDefaultScene = (engineState) =>
  GameObjectEngineService.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArraySystem.unsafePop;