module DragEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectType.gameObject,
    Wonderjs.GameObjectType.gameObject,
    string,
  );
  let onDrop =
      ((store, dispatchFunc), (), (targetUid, dragedUid, currentDragSource)) =>
    switch (currentDragSource) {
    | currentDragSource when currentDragSource === SceneTreeUIUtils.getFlag() =>
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
                store |> SceneTreeUIUtils.unsafeGetSceneGraphDataFromStore,
              ),
            ),
          ),
        ),
      )
      |> ignore;
    | _ => WonderLog.Log.log({j|can't drop to sceneTree|j})
    };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);