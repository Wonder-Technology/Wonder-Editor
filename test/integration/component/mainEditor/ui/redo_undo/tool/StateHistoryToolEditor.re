let storeAllStateView = StateHistoryView.storeAllState;

let undo = () =>
  StateHistoryView.allStateGoBack(
    SceneTreeToolUI.buildAppStateSceneGraphFromEngine(),
    TestToolUI.getDispatch()
  );

let redo = () =>
  StateHistoryView.allStateGoForward(
    SceneTreeToolUI.buildAppStateSceneGraphFromEngine(),
    TestToolUI.getDispatch()
  );

let clearAllState = () => AllStateData.setAllState(AllStateData.stateData);