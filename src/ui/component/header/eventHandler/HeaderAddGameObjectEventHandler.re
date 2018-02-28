module AddGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onSelect = ((store, dispatch), (), uid) => {
    MainEditorSceneView.setCurrentGameObject(uid) |> OperateStateUtils.getAndSetState;
    dispatch(AppStore.ReLoad) |> ignore;
    MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(AllStateData.getHistoryState(), store)
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(SelectEventHandler);