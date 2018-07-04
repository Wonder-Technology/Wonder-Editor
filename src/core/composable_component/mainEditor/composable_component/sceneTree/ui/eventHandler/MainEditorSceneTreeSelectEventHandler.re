module SelectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onSelect = ((store, dispatchFunc), (), uid) => {
    StateAssetService.getState()
    |> CurrentNodeIdAssetService.clearCurrentNodeId
    |> StateAssetService.setState
    |> ignore;

    StateEditorService.getState()
    |> SceneEditorService.clearCurrentSceneTreeNode
    |> SceneEditorService.setCurrentSceneTreeNode(uid)
    |> CurrentSelectSourceEditorService.setCurrentSelectSource(
         EditorType.SceneTree,
       )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(AppStore.ReLoad) |> ignore;
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(
         AllStateData.getHistoryState(),
         store,
       );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(SelectEventHandler);