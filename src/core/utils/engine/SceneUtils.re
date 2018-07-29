let addGameObject = createGameObjectFunc => {
  let (_editorState, editEngineState, box1) =
    StateLogicService.getEditEngineState() |> createGameObjectFunc(None);

  editEngineState
  |> GameObjectEngineService.initGameObject(box1)
  |> SceneEngineService.addSceneChild(box1)
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;

  let (editorState, runEngineState, box2) =
    StateLogicService.getRunEngineState()
    |> createGameObjectFunc(StateEditorService.getState() |. Some);

  runEngineState
  |> GameObjectEngineService.initGameObject(box2)
  |> SceneEngineService.addSceneChild(box2)
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;

  switch (editorState) {
  | None => ()
  | Some(editorState) => editorState |> StateEditorService.setState |> ignore
  };

  box2;
};