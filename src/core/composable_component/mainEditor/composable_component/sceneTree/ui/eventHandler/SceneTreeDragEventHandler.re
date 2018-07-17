open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectType.gameObject,
    Wonderjs.GameObjectType.gameObject,
  );

  let handleSelfLogic =
      ((store, dispatchFunc), (), (targetUid, dragedUid)) => {
    GameObjectUtils.setParentKeepOrder
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|targetUid, dragedUid|], type_: GameObject},
       |]);

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
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);