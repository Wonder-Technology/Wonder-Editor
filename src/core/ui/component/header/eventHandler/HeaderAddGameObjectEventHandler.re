module AddGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = unit;
  let onClick = ((store, dispatch), type_, ()) => {
    let newGameObject =
      switch type_ {
      | "box" =>
        SceneUtils.addGameObject(
          SceneEditorService.unsafeGetEditScene |> StateLogicService.getEditorState,
          PrimitiveEngineService.createBox
        )
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
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            SceneTreeUtils.buildSceneGraphDataWithNewGameObject(
              newGameObject,
              store |> SceneTreeStoreUtils.unsafeGetSceneGraphDataFromStore
            )
            |> StateLogicService.getEngineStateToGetData
          )
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(AddGameObjectEventHandler);