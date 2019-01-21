module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit => WonderBsJszip.Zip.jszip;
  type dataTuple = ReactEventRe.Form.t;
  type return = Js.Promise.t(unit);

  let handleSelfLogic = ((uiState, dispatchFunc), createJsZipFunc, event) =>
    AssetHeaderUtils.fileLoad((uiState, dispatchFunc), createJsZipFunc, event)
    |> Js.Promise.catch(e => {
         AllHistoryService.handleUndo(uiState, dispatchFunc);

         let e = Obj.magic(e);
         let editorState = StateEditorService.getState();

         switch (e) {
         | NodeAssetType.LoadException(message) =>
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