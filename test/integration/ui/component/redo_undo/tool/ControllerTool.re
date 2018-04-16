let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let run = () => {
  SceneEditorService.setIsRun(true) |> StateLogicService.getEditorState;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       SceneTreeTool.buildAppStateSceneGraphFromEngine(),
       StateHistoryService.getStateForHistory()
     )
};

let stop = ControllerUtils.stop(TestTool.getDispatch());