module SelectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onSelect = ((store, dispatch), (), uid) => {
    MainEditorSceneView.setCurrentGameObject(uid) |> StateFacade.getAndSetState;
    dispatch(AppStore.ReLoad) |> ignore;
    MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(AllStateData.getHistoryState(), store)
    |> StateFacade.getState
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(SelectEventHandler);