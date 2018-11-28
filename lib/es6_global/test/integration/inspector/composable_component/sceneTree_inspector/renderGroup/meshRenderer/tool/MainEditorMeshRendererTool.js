

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../../src/service/atom/ArrayService.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as MainEditorMeshRenderer$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/meshRenderer/ui/MainEditorMeshRenderer.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function getDrawModeLineType() {
  return /* Lines */1;
}

function getDrawModePointType() {
  return /* Points */0;
}

function getDrawModeTriangleFanType() {
  return /* Triangle_fan */6;
}

function changeMode(value, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
  var meshRenderer = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentGameObjectMeshRenderer(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorMeshRenderer$WonderEditor.Method[/* changeMode */0], /* tuple */[
              store,
              dispatchFunc
            ], meshRenderer, value);
}

export {
  _getFromArray ,
  getDrawModeLineType ,
  getDrawModePointType ,
  getDrawModeTriangleFanType ,
  changeMode ,
  
}
/* TestTool-WonderEditor Not a pure module */
