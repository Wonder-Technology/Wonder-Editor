let addGameObject = createGameObjectFunc => {
  let (editorState, engineState, gameObject) =
    StateEngineService.unsafeGetState()
    |> createGameObjectFunc(StateEditorService.getState());

  engineState
  |> GameObjectEngineService.initGameObject(gameObject)
  |> SceneEngineService.addSceneChild(gameObject)
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState;

  editorState |> StateEditorService.setState |> ignore;

  gameObject;
};

let doesSceneHasRemoveableCamera = () =>
  GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length > 1;

let isSceneHaveNoCamera = () =>
  GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length == 0;