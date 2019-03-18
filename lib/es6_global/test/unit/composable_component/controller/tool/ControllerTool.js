

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as Controller$WonderEditor from "../../../../../src/core/composable_component/controller/ui/Controller.js";
import * as ControllerUtils$WonderEditor from "../../../../../src/core/utils/controller/ControllerUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";

function run(param) {
  return ControllerUtils$WonderEditor.run(TestTool$WonderEditor.buildEmptyAppState(/* () */0));
}

function stop(param) {
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

function getIsRun(param) {
  return StateEditorService$WonderEditor.getIsRun(/* () */0);
}

var setIsRun = StateEditorService$WonderEditor.setIsRun;

function getColor(param) {
  return Controller$WonderEditor.Method[/* getColor */2](/* () */0);
}

function changeColor(color) {
  return Controller$WonderEditor.Method[/* changeColor */1](color);
}

function closeColorPicker(color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(Controller$WonderEditor.Method[/* closeColorPick */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, color);
}

export {
  run ,
  stop ,
  stubRequestAnimationFrame ,
  stubCancelAnimationFrame ,
  getIsRun ,
  setIsRun ,
  getColor ,
  changeColor ,
  closeColorPicker ,
  
}
/* stubRequestAnimationFrame Not a pure module */
