open AddGameObjectType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = ReactEventRe.Form.t;

  let handleSelfLogic = ((store, dispatchFunc), (), event) =>
    HeaderUtils.loadSceneWDB(dispatchFunc, event) |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);