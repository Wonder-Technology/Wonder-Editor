module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (HeaderType.action => unit, HeaderType.action);
  type dataTuple = ReactEventRe.Form.t;
  type return = Js.Promise.t(unit);

  let handleSelfLogic = ((store, dispatchFunc), (send, blurNav), event) =>
    HeaderImportPackageUtils.importPackage(dispatchFunc, event)
    |> Js.Promise.then_(_ => send(blurNav) |> Js.Promise.resolve)
    |> Js.Promise.catch(e => {
         AllHistoryService.undoHistoryState(store, Obj.magic(dispatchFunc))
         |> StateHistoryService.getAndRefreshStateForHistory
         |> ignore;

         let e = Obj.magic(e);
         let editorState = StateEditorService.getState();

         let message = e##message;
         let stack = e##stack;

         ConsoleUtils.error(
           LogUtils.buildErrorMessage(
             ~description={j|$message|j},
             ~reason="",
             ~solution={j||j},
             ~params={j||j},
           ),
           editorState,
         );
         ConsoleUtils.logStack(stack) |> ignore;

         send(blurNav) |> Js.Promise.resolve;
       });
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);