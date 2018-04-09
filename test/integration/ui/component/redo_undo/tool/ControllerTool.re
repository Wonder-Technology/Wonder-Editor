let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let _triggerClickRun = (domChildren) => {
  let operateHistoryDiv = _getFromArray(domChildren, 3);
  let div = _getFromArray(operateHistoryDiv##children, 0);
  let runButton = _getFromArray(div##children, 0);
  BaseEventTool.triggerClickEvent(runButton)
};

let _triggerClickStop = (domChildren) => {
  let operateHistoryDiv = _getFromArray(domChildren, 0);
  let div = _getFromArray(operateHistoryDiv##children, 0);
  let stopButton = _getFromArray(div##children, 1);
  BaseEventTool.triggerClickEvent(stopButton)
};

let run = () => ControllerUtils.runForTest(SceneTreeTool.buildAppStateSceneGraphFromEngine());

let stop = () =>
  BaseEventTool.triggerComponentEvent(
    BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine()),
    _triggerClickStop
  );