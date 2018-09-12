open AppStore;


module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = string;

  let handleSelfLogic = ((store, dispatchFunc), gameObject, newName) => {
    GameObjectEngineService.setGameObjectName(newName, gameObject)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          store
          |> StoreUtils.unsafeGetSceneGraphDataFromStore
          |> SceneTreeUtils.renameSceneGraphData(gameObject, newName)
          |. Some,
        ),
      ),
    )
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);