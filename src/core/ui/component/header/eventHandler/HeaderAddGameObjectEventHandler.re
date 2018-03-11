module AddGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = unit;
  let onClick = ((store, dispatch), type_, ()) => {
    let (newGameObject, engineState) =
      switch type_ {
      | "box" =>
        SceneEngineService.addBox(SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState)
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
            SceneTreeUtils.buildSceneGraphDataWithNewGameObject(
              newGameObject,
              store |> SceneGraphUIService.unsafeGetSceneGraphDataFromStore
            )
            |> StateLogicService.getEngineState
          )
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(AddGameObjectEventHandler);