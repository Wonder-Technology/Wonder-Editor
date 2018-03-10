module SelectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onSelect = ((store, dispatch), (), uid) => {
    CurrentGameObjectEditorService.setCurrentGameObject(uid) |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore;
    MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(AllStateData.getHistoryState(), store)
    |> StateLogicService.getState
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(SelectEventHandler);