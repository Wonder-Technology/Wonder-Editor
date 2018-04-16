let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let run = () => {
  EngineStateDataEditorService.setIsRun(true);
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       SceneTreeTool.buildAppStateSceneGraphFromEngine(),
       StateLogicService.getStateForHistory()
     )
};

let stop = ControllerUtils.stop(TestTool.getDispatch());