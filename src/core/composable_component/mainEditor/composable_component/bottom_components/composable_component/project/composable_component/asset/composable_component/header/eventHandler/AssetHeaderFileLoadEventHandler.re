module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit => WonderBsJszip.Zip.jszip;
  type dataTuple = ReactEventRe.Form.t;
  type return = Js.Promise.t(unit);

  let handleSelfLogic = ((store, dispatchFunc), createJsZipFunc, event) =>
    AssetHeaderUtils.fileLoad((store, dispatchFunc), createJsZipFunc, event)
    |> Js.Promise.catch(e => {
         AllHistoryService.handleUndo(store, Obj.magic(dispatchFunc));

         let e = Obj.magic(e);
         let editorState = StateEditorService.getState();

         switch (e) {
         | AssetNodeType.LoadException(message) =>
           ConsoleUtils.error(
             LogUtils.buildErrorMessage(
               ~description={j|$message|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
             editorState,
           )
         | _ =>
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
         };

         Js.Promise.resolve();
       });
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);