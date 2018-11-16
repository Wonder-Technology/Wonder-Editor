module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (HeaderType.action => unit, HeaderType.action);
  type dataTuple = ReactEventRe.Form.t;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (send, blurNav), event) =>
    HeaderImportPackageUtils.importPackage(dispatchFunc, event)
    |> Js.Promise.then_(_ => send(blurNav) |> Js.Promise.resolve)
    |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);