let addGameObjectToScene = (gameObject, engineState) =>
  engineState
  |> GameObjectEngineService.initGameObject(gameObject)
  |> SceneEngineService.addSceneChild(gameObject)
  |> DirectorEngineService.loopBody(0.);

let addGameObject = createGameObjectFunc => {
  let (editorState, engineState, gameObject) =
    StateEngineService.unsafeGetState()
    |> createGameObjectFunc(StateEditorService.getState());

  let engineState = addGameObjectToScene(gameObject, engineState);

  StateLogicService.setState((editorState, engineState));

  gameObject;
};

let doesSceneHasRemoveableCamera = () =>
  GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length > 1;

let isSceneHaveNoActiveCamera = () =>
  SceneEngineService.getSceneActiveBasicCameraView
  |> StateLogicService.getEngineStateToGetData
  |> Js.Option.isNone;