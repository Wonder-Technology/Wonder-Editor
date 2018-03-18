module DragEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (Wonderjs.GameObjectType.gameObject, Wonderjs.GameObjectType.gameObject);
  let onDrop = ((store, dispatch), (), (targetUid, dragedUid)) => {
    SceneTreeUtils.isGameObjectRelationError(targetUid, dragedUid)
    |> StateLogicService.getEngineState ?
      dispatch(AppStore.ReLoad) |> ignore :
      {
        GameObjectUtils.setParentKeepOrder(targetUid, dragedUid)
        |> StateLogicService.getAndRefreshEngineState;
        dispatch(
          AppStore.SceneTreeAction(
            SetSceneGraph(
              Some(
                SceneTreeUtils.getDragedSceneGraphData(
                  targetUid,
                  dragedUid,
                  store |> SceneTreeStoreUtils.unsafeGetSceneGraphDataFromStore
                )
              )
            )
          )
        )
      }
      |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);