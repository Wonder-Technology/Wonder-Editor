open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectPrimitiveType.gameObject;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), uid) =>
    SceneTreeSelectCurrentNodeUtils.select(dispatchFunc, uid);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);