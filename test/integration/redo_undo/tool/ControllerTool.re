let run = ControllerUtils.run(TestTool.buildEmptyAppState());

let stop = ControllerUtils.stop(TestTool.getDispatch());
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