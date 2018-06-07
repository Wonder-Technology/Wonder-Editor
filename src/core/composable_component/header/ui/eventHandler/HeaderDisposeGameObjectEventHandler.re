module DisposeGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onClick = ((store, dispatchFunc), (), ()) => {
    switch (SceneEditorService.getCurrentSceneTreeNode |> StateLogicService.getEditorState) {
    | None =>
      WonderLog.Log.error(
        WonderLog.Log.buildErrorMessage(
          ~title="disposeCurrentSceneTreeNode",
          ~description={j|current gameObject should exist, but actual is None|j},
          ~reason="",
          ~solution={j|set current gameObject|j},
          ~params={j||j}
        )
      )
    | Some(gameObject) =>
      CameraEngineService.isCamera(gameObject) |> StateLogicService.getEngineStateToGetData ?
        HeaderUtils.doesSceneHasRemoveableCamera() ?
          WonderLog.Log.warn({j|can't remove last camera|j}) :
          CurrentSceneTreeNodeLogicService.disposeCurrentSceneTreeNode(gameObject) :
        CurrentSceneTreeNodeLogicService.disposeCurrentSceneTreeNode(gameObject)
    };
    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(SceneTreeUtils.getSceneGraphDataFromEngine |> StateLogicService.getStateToGetData)
        )
      )
    )
    |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DisposeGameObjectEventHandler);