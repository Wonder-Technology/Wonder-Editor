module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit => WonderBsJszip.Zip.jszip;
  type dataTuple = ReactEventRe.Form.t;
  type return = WonderBsMost.Most.stream(unit);

  let handleSelfLogic = ((uiState, dispatchFunc), createJsZipFunc, event) =>
    AssetHeaderUtils.fileLoad(uiState, createJsZipFunc, event)
    |> WonderBsMost.Most.tap(_ =>
         dispatchFunc(
           AppStore.UpdateAction(
             Update([|UpdateStore.Inspector, UpdateStore.Project|]),
           ),
         )
         |> ignore
       )
    |> WonderBsMost.Most.recoverWith(e => {
         AllHistoryService.handleUndo(uiState, dispatchFunc);

         let editorState = StateEditorService.getState();

         switch (ExnType.convertJsExnToExn(e)) {
         | NodeAssetType.LoadAssetException(message) =>
           ConsoleUtils.error(
             LogUtils.buildErrorMessage(
               ~description={j|$message|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
             editorState,
           )
         | e =>
           let e = ExnType.convertExnToJsExn(e);
           let message = e |> Js.Exn.message;
           let stack = e |> Js.Exn.stack;

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

         WonderBsMost.Most.empty();
       })
    |> MostUtils.ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);