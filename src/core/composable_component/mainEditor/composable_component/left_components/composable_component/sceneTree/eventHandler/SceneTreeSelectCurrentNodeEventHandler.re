open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = option(Wonderjs.GameObjectPrimitiveType.gameObject);
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), gameObjectOpt) =>
    SceneTreeSelectCurrentNodeUtils.select(dispatchFunc, gameObjectOpt);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);