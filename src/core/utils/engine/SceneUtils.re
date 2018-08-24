let addGameObject = (createGameObjectForEditFunc, createGameObjectForRunFunc) => {
  let (editorState, runEngineState, runGameObject) =
    StateLogicService.getRunEngineState()
    |> createGameObjectForRunFunc(StateEditorService.getState());

  runEngineState
  |> GameObjectEngineService.initGameObject(runGameObject)
  |> SceneEngineService.addSceneChild(runGameObject)
  |> DirectorEngineService.loopBodyForRunEngineState(0.)
  |> StateLogicService.setRunEngineState;

  editorState |> StateEditorService.setState |> ignore;
  let (editEngineState, editGameObject) =
    StateLogicService.getEditEngineState() |> createGameObjectForEditFunc;

  editEngineState
  |> GameObjectEngineService.initGameObject(editGameObject)
  |> SceneEngineService.addSceneChild(editGameObject)
  |> DirectorEngineService.loopBodyForEditEngineState(0.)
  |> StateLogicService.setEditEngineState;

  runGameObject;
};