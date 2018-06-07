module SelectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onSelect = ((store, dispatchFunc), (), uid) => {
    (
      editorState =>
        editorState
        |> CurrentNodeEditorService.clearCurrentNode
        |> SceneEditorService.setCurrentSceneTreeNode(uid)
        |> CurrentSelectSourceEditorService.setCurrentSelectSource(
             EditorType.SceneTree,
           )
    )
    |> StateLogicService.getAndSetEditorState;
    dispatchFunc(AppStore.ReLoad) |> ignore;
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(
         AllStateData.getHistoryState(),
         store,
       );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(SelectEventHandler);