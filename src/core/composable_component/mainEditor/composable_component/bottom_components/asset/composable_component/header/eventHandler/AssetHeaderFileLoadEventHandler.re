module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = ReactEventRe.Form.t;

  let handleSelfLogic = ((store, dispatchFunc), (), event) =>
    AssetHeaderUtils.fileLoad(dispatchFunc, event) |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);