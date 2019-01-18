open AppStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectPrimitiveType.gameObject;
  type dataTuple = string;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), gameObject, newName) => {
    GameObjectEngineService.setGameObjectName(newName, gameObject)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);