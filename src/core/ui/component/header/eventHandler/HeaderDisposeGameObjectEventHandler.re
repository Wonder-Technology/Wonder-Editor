module DisposeGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onClick = ((store, dispatch), (), ()) => {
    switch (CurrentGameObjectEditorService.getCurrentGameObject |> StateLogicService.getEditorState) {
    | None =>
      WonderLog.Log.error(
        WonderLog.Log.buildErrorMessage(
          ~title="disposeCurrentGameObject",
          ~description={j|current gameObject should exist, but actual is None|j},
          ~reason="",
          ~solution={j|set current gameObject|j},
          ~params={j||j}
        )
      )
    | Some(gameObject) => CurrentGameObjectLogicService.disposeCurrentGameObject(gameObject)
    };
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(MainEditorSceneTreeView.getSceneGraphDataFromEngine |> StateLogicService.getState)
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DisposeGameObjectEventHandler);