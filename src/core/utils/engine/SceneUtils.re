let addGameObject = createGameObjectFunc => {
  let (_editorState, editEngineState, editGameObject) =
    StateLogicService.getEditEngineState() |> createGameObjectFunc(None);

  editEngineState
  |> GameObjectEngineService.initGameObject(editGameObject)
  |> SceneEngineService.addSceneChild(editGameObject)
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;

  let (editorState, runEngineState, runGameObject) =
    StateLogicService.getRunEngineState()
    |> createGameObjectFunc(StateEditorService.getState() |. Some);

  runEngineState
  |> GameObjectEngineService.initGameObject(runGameObject)
  |> SceneEngineService.addSceneChild(runGameObject)
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;

  switch (editorState) {
  | None => ()
  | Some(editorState) => editorState |> StateEditorService.setState |> ignore
  };

  runGameObject;
};