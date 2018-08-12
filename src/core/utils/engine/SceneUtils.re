let addGameObject = (createGameObjectForEditFunc, createGameObjectForRunFunc) => {
  let (editEngineState, editGameObject) =
    StateLogicService.getEditEngineState() |> createGameObjectForEditFunc;

  editEngineState
  |> GameObjectEngineService.initGameObject(editGameObject)
  |> SceneEngineService.addSceneChild(editGameObject)
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;

  let (editorState, runEngineState, runGameObject) =
    StateLogicService.getRunEngineState()
    |> createGameObjectForRunFunc(StateEditorService.getState());

  runEngineState
  |> GameObjectEngineService.initGameObject(runGameObject)
  |> SceneEngineService.addSceneChild(runGameObject)
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;

  editorState |> StateEditorService.setState |> ignore;

  runGameObject;
};