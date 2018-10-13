let run = () => ControllerUtils.run(TestTool.buildEmptyAppState());

let stop = () => ControllerUtils.stop(TestTool.getDispatch());

let stubRequestAnimationFrame = [%bs.raw
  {|
    function(requestStub){
      window.requestAnimationFrame = requestStub;
    }
 |}
];

let stubCancelAnimationFrame = [%bs.raw
  {|
    function(requestStub){
      window.cancelAnimationFrame = requestStub;
    }
 |}
];

let setIsRun = isRun =>
  SceneEditorService.setIsRun(isRun) |> StateLogicService.getAndSetEditorState;

let getColor = () => Controller.Method.getColor();

let changeColor = color => Controller.Method.changeColor(color);

let closeColorPicker =
    (
      ~color,
      ~dispatchFunc=_ => (),
      ~store=TestTool.buildAppStateSceneGraphFromEngine(),
      (),
    ) =>
  Controller.Method.closeColorPick((store, dispatchFunc), (), color);