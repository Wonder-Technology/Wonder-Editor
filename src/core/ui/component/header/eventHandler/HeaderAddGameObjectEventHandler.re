module AddGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = unit;
  let onClick = ((store, dispatch), type_, ()) => {
    let (newGameObject, stateTuple) =
      switch type_ {
      | "box" =>
        GameObjectLogicCompositeService.addBox(SceneFacade.unsafeGetScene |> StateFacade.getState)
        |> StateFacade.getState
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
    stateTuple |> StateFacade.setState;
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            MainEditorSceneTreeView.buildSceneGraphDataWithNewGameObject(
              newGameObject,
              store |> SceneGraphDataUtils.unsafeGetSceneGraphDataFromStore
            )
            |> StateFacade.getState
          )
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(AddGameObjectEventHandler);