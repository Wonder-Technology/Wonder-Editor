module AddGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = unit;
  let onClick = ((store, dispatch), type_, ()) => {
    let (newGameObject, stateTuple) =
      switch type_ {
      | "box" => MainEditorSceneView.addBoxGameObject |> OperateStateUtils.getState
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
    stateTuple |> OperateStateUtils.setState;
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            MainEditorSceneTreeView.buildSceneGraphDataWithNewGameObject(
              newGameObject,
              store |> SceneGraphDataUtils.unsafeGetSceneGraphDataFromStore
            )
            |> OperateStateUtils.getState
          )
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(AddGameObjectEventHandler);