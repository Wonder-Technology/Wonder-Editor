module SelectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onSelect = ((store, dispatch), (), uid) => {
    SceneEditorService.setCurrentGameObject(uid) |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore;
    StateLogicService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(
         AllStateData.getHistoryState(),
         store
       )
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(SelectEventHandler);