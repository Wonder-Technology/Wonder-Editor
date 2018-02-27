let _getFromArray = (array, index) => OperateArrayUtils.getNth(index, array);

let _buildHeaderComponent = () =>
  ReactTestRenderer.create(
    <Header
      store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
      dispatch=(TestToolUI.getDispatch())
    />
  );

let _triggerClickUndo = (domChildren) => {
  let undoDiv = _getFromArray(domChildren, 0);
  let undoButton = _getFromArray(undoDiv##children, 0);
  EventToolUI.triggerClickEvent(undoButton)
};

let _triggerClickRedo = (domChildren) => {
  let redoDiv = _getFromArray(domChildren, 1);
  let redoButton = _getFromArray(redoDiv##children, 0);
  EventToolUI.triggerClickEvent(redoButton)
};

let undo = () => EventToolUI.triggerComponentEvent(_buildHeaderComponent(), _triggerClickUndo);

let redo = () => EventToolUI.triggerComponentEvent(_buildHeaderComponent(), _triggerClickRedo);

let clearAllState = () => AllStateData.setHistoryState(AllStateData.historyStateData);
let clearAllState = () => AllStateData.setHistoryState(AllStateData.historyStateData);