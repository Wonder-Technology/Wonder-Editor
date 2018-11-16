open AddGameObjectType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = ReactEventRe.Form.t;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), event) =>
    HeaderLoadWDBUtils.loadSceneWDB(dispatchFunc, event) |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);