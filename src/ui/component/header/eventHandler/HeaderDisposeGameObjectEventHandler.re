module DisposeGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onClick = ((store, dispatch), (), ()) => {
    switch (MainEditorSceneView.getCurrentGameObject |> OperateStateUtils.getState) {
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
      MainEditorStateView.prepareState()
      |> MainEditorSceneView.disposeCurrentGameObject(gameObject)
      |> MainEditorSceneView.clearCurrentGameObject
      |> MainEditorStateView.finishState
    };
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(MainEditorSceneTreeView.getSceneGraphDataFromEngine |> OperateStateUtils.getState)
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DisposeGameObjectEventHandler);