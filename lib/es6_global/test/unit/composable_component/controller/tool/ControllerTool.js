

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as Controller$WonderEditor from "../../../../../src/core/composable_component/controller/ui/Controller.js";
import * as ControllerUtils$WonderEditor from "../../../../../src/core/utils/controller/ControllerUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";

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

function getIsRun() {
  return StateEditorService$WonderEditor.getIsRun(/* () */0);
}

var setIsRun = StateEditorService$WonderEditor.setIsRun;

function getColor() {
  return Controller$WonderEditor.Method[/* getColor */1](/* () */0);
}

function changeColor(color) {
  return Controller$WonderEditor.Method[/* changeColor */0](color);
}

function closeColorPicker(color, $staropt$star, $staropt$star$1, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0);
  return Curry._3(Controller$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              store,
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
