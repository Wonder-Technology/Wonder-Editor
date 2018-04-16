let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let run = () => {
  SceneEditorService.setIsRun(true) |> StateLogicService.getEditorState;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       SceneTreeTool.buildAppStateSceneGraphFromEngine(),
       StateHistoryService.getStateForHistory()
     )
};

let stop = () => {
  SceneEditorService.setIsRun(false) |> StateLogicService.getEditorState;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       TestTool.getDispatch() ,
       StateLogicService.getEditEngineState(),
       StateLogicService.getRunEngineState()
     )
};