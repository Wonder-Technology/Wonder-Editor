open AllStateDataType;

let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let _triggerClickUndo = domChildren => {
  let operateHistoryDiv = _getFromArray(domChildren, 0);
  let undoDiv = _getFromArray(operateHistoryDiv##children, 0);
  let undoButton = _getFromArray(undoDiv##children, 0);
  BaseEventTool.triggerClickEvent(undoButton);
};

let _triggerClickRedo = domChildren => {
  let operateHistoryDiv = _getFromArray(domChildren, 0);
  let redoDiv = _getFromArray(operateHistoryDiv##children, 1);
  let redoButton = _getFromArray(redoDiv##children, 0);
  BaseEventTool.triggerClickEvent(redoButton);
};

let undo = () =>
  BaseEventTool.triggerComponentEvent(
    BuildComponentTool.buildHeader(
      TestTool.buildAppStateSceneGraphFromEngine(),
    ),
    _triggerClickUndo,
  );

let redo = () =>
  BaseEventTool.triggerComponentEvent(
    BuildComponentTool.buildHeader(
      TestTool.buildAppStateSceneGraphFromEngine(),
    ),
    _triggerClickRedo,
  );

let clearAllState = () => {
  AllStateData.setHistoryState(AllStateData.createHistoryState());
};