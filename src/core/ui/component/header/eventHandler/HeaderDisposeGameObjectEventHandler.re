module DisposeGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onClick = ((store, dispatch), (), ()) => {
    switch (CurrentGameObjectFacade.getCurrentGameObject |> StateFacade.getState) {
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
    | Some(gameObject) =>
      (
        (stateTuple) =>
          stateTuple
          |> MainEditorSceneView.disposeCurrentGameObject(gameObject)
          |> CurrentGameObjectFacade.clearCurrentGameObject
      )
      |> StateFacade.getAndSetState
    };
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(MainEditorSceneTreeView.getSceneGraphDataFromEngine |> StateFacade.getState)
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DisposeGameObjectEventHandler);