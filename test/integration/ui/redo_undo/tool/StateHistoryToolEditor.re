let _getFromArray = (array, index) => OperateArrayUtils.getNth(index, array);

let _triggerClickUndo = (domChildren) => {
  let operateHistoryDiv = _getFromArray(domChildren, 0);
  let undoDiv = _getFromArray(operateHistoryDiv##children, 0);
  let undoButton = _getFromArray(undoDiv##children, 0);
  EventToolUI.triggerClickEvent(undoButton)
};

let _triggerClickRedo = (domChildren) => {
  let operateHistoryDiv = _getFromArray(domChildren, 0);
  let redoDiv = _getFromArray(operateHistoryDiv##children, 1);
  let redoButton = _getFromArray(redoDiv##children, 0);
  EventToolUI.triggerClickEvent(redoButton)
};

let undo = () =>
  EventToolUI.triggerComponentEvent(
    BuildComponentTool.buildHeader(SceneTreeToolUI.buildAppStateSceneGraphFromEngine()),
    _triggerClickUndo
  );

let redo = () =>
  EventToolUI.triggerComponentEvent(
    BuildComponentTool.buildHeader(SceneTreeToolUI.buildAppStateSceneGraphFromEngine()),
    _triggerClickRedo
  );

let clearAllState = () => AllStateData.setHistoryState(AllStateData.historyStateData);

let clearAllState = () => AllStateData.setHistoryState(AllStateData.historyStateData);