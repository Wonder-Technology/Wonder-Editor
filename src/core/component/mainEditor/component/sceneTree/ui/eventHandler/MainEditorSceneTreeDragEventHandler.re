module DragEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (Wonderjs.GameObjectType.gameObject, Wonderjs.GameObjectType.gameObject);
  let onDrop = ((store, dispatch), (), (targetUid, dragedUid)) =>
    MainEditorSceneTreeView.isGameObjectRelationError(targetUid, dragedUid)
    |> StateLogicService.getState ?
      dispatch(AppStore.ReLoad) |> ignore :
      {
        MainEditorSceneTreeView.setParentKeepOrder(targetUid, dragedUid)
        |> StateLogicService.getAndSetState;
        dispatch(
          AppStore.SceneTreeAction(
            SetSceneGraph(
              Some(
                MainEditorSceneTreeView.getDragedSceneGraphData(
                  targetUid,
                  dragedUid,
                  store |> SceneGraphDataUtils.unsafeGetSceneGraphDataFromStore
                )
              )
            )
          )
        )
      }
      |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);