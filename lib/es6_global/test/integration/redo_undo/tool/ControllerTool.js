

import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as ControllerUtils$WonderEditor from "../../../../src/core/utils/controller/ControllerUtils.js";

var partial_arg = TestTool$WonderEditor.buildEmptyAppState(/* () */0);

function run(param) {
  return ControllerUtils$WonderEditor.run(partial_arg, param);
}

var partial_arg$1 = TestTool$WonderEditor.getDispatch(/* () */0);

function stop(param) {
  return ControllerUtils$WonderEditor.stop(partial_arg$1, param);
}

var stubRequestAnimationFrame = (
    function(requestStub){
      window.requestAnimationFrame = requestStub;
    }
 );

var stubCancelAnimationFrame = (
    function(requestStub){
      window.cancelAnimationFrame = requestStub;
    }
 );

export {
  run ,
  stop ,
  stubRequestAnimationFrame ,
  stubCancelAnimationFrame ,
  
}
/* partial_arg Not a pure module */
