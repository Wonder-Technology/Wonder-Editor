let storeAllStateView = StateHistoryView.storeHistoryState;

let undo = () =>
  StateHistoryView.undoHistoryState(
    SceneTreeToolUI.buildAppStateSceneGraphFromEngine(),
    TestToolUI.getDispatch()
  );

let redo = () =>
  StateHistoryView.redoHistoryState(
    SceneTreeToolUI.buildAppStateSceneGraphFromEngine(),
    TestToolUI.getDispatch()
  );

let clearAllState = () => AllStateData.setHistoryState(AllStateData.historyStateData);