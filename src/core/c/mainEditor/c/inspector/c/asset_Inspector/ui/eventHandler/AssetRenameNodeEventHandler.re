open AppStore;

open NodeAssetType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = string;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), nodeId, value) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    RenameNodeAssetLogicService.renameNode(
      nodeId,
      value,
      (editorState, engineState),
    )
    |> Result.SameDataResult.handleError(
         ((editorState, engineState)) => {
           dispatchFunc(
             AppStore.UpdateAction(Update([|UpdateStore.Project|])),
           )
           |> ignore;

           (editorState, engineState);
         },
         (msg, (editorState, engineState)) => {
           ConsoleUtils.warn(msg, editorState);

           dispatchFunc(
             AppStore.UpdateAction(
               Update([|
                 UpdateStore.Console,
                 UpdateStore.BottomHeader,
                 UpdateStore.Inspector,
               |]),
             ),
           )
           |> ignore;

           (editorState, engineState);
         },
       )
    |> StateLogicService.setState;

    ();
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);