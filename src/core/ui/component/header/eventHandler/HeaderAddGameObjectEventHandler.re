module AddGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = unit;
  let onClick = ((store, dispatch), type_, ()) => {
    let (newGameObject, engineState) =
      switch type_ {
      | "box" =>
        SceneEngineService.addBox(
          SceneService.unsafeGetScene |> StateLogicService.getEditorState
        )
        |> StateLogicService.getEngineState
      | _ =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="addGameObject",
            ~description={j|specific type:$type_ should exist|j},
            ~reason="",
            ~solution={j||j},
            ~params={j|type:$type_|j}
          )
        )
      };
    engineState |> StateEngineService.setState;
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            MainEditorSceneTreeView.buildSceneGraphDataWithNewGameObject(
              newGameObject,
              store |> SceneGraphDataUtils.unsafeGetSceneGraphDataFromStore
            )
            |> StateLogicService.getState
          )
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(AddGameObjectEventHandler);