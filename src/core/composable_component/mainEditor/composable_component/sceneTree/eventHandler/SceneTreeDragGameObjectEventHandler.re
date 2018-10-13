

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectType.gameObject,
    Wonderjs.GameObjectType.gameObject,
  );

  let handleSelfLogic = ((store, dispatchFunc), (), (targetUid, dragedId)) => {
    GameObjectUtils.setParentKeepOrder(targetUid, dragedId)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            SceneTreeUtils.getDragedSceneGraphData(
              targetUid,
              dragedId,
              store |> StoreUtils.unsafeGetSceneGraphDataFromStore,
            ),
          ),
        ),
      ),
    )
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);