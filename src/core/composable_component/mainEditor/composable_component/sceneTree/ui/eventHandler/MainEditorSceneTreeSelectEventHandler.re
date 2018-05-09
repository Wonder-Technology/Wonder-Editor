module SelectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onSelect = ((store, dispatch), (), uid) => {
    (
      (editorState) =>
        editorState
        |> SceneEditorService.setCurrentGameObject(uid)
        |> CurrentSourceEditorService.setCurrentSource(EditorType.SceneTree)
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore;
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(
         AllStateData.getHistoryState(),
         store
       )
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(SelectEventHandler);