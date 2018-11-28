

import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as ControllerUtils$WonderEditor from "../../../../src/core/utils/controller/ControllerUtils.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../src/service/state/editor/scene/SceneEditorService.js";

function run() {
  return ControllerUtils$WonderEditor.run(TestTool$WonderEditor.buildEmptyAppState(/* () */0));
}

function stop() {
  return ControllerUtils$WonderEditor.stop(TestTool$WonderEditor.getDispatch(/* () */0));
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

function setIsRun(isRun) {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return SceneEditorService$WonderEditor.setIsRun(isRun, param);
              }));
}

export {
  run ,
  stop ,
  stubRequestAnimationFrame ,
  stubCancelAnimationFrame ,
  setIsRun ,
  
}
/* stubRequestAnimationFrame Not a pure module */
