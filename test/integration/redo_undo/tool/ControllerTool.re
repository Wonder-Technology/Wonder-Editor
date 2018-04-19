let _getFromArray = (array, index) => ArrayService.getNth(index, array);

/* let run = () => {
  SceneEditorService.setIsRun(true) |> StateLogicService.getEditorState;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       SceneTreeTool.buildAppStateSceneGraphFromEngine(),
       StateHistoryService.getStateForHistory()
     )
}; */

let run = ControllerUtils.run(TestTool.buildEmptyAppState());

let stop = ControllerUtils.stop(TestTool.getDispatch());

/* let stop = () => {
     SceneEditorService.setIsRun(false) |> StateLogicService.getEditorState;
     AllStateData.getHistoryState()
     |> ControllerHistoryUtils.restoreHistoryStack(
          TestTool.getDispatch(),
          StateLogicService.getEditEngineState(),
          StateLogicService.getRunEngineState()
        )
   }; */
let setRequest = [%bs.raw
  {|
    function(requestStub){
      window.requestAnimationFrame = requestStub;
    }
 |}
];

let setCancel = [%bs.raw
  {|
    function(requestStub){
      window.cancelAnimationFrame = requestStub;
    }
 |}
];