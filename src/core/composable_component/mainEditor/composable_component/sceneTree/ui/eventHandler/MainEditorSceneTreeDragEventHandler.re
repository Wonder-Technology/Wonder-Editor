module DragEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectType.gameObject,
    Wonderjs.GameObjectType.gameObject,
    option(EditorType.sourceType)
  );
  let onDrop =
      ((store, dispatchFunc), (), (targetUid, dragedUid, currentDragSource)) =>
    switch (currentDragSource) {
    | None => WonderLog.Log.log({j|can't drop to sceneTree|j})
    | Some(currentDragSource) =>
      currentDragSource === SceneTreeUtils.getFlag() ?
        {
          GameObjectUtils.setParentKeepOrder
          |> StateLogicService.getAndRefreshEngineStateWithDiff(
               [|targetUid, dragedUid|],
               DiffType.GameObject,
             );
          dispatchFunc(
            AppStore.SceneTreeAction(
              SetSceneGraph(
                Some(
                  SceneTreeUtils.getDragedSceneGraphData(
                    targetUid,
                    dragedUid,
                    store |> SceneTreeUtils.unsafeGetSceneGraphDataFromStore,
                  ),
                ),
              ),
            ),
          )
          |> ignore;
        } :
        WonderLog.Log.log({j|can't drop to sceneTree|j})
    };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);