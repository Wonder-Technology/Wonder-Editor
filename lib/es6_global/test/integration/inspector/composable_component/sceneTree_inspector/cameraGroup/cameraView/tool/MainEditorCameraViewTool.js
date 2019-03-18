

import * as Caml_option from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as MainEditorCameraView$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraView/ui/MainEditorCameraView.js";

function buildEvent(checked) {
  return {
          target: {
            checked: checked
          }
        };
}

function setCurrentCamera(cameraView, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : buildEvent(true);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorCameraView$WonderEditor.Method[/* setCurrentCamera */0](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraView, $$event);
}

export {
  buildEvent ,
  setCurrentCamera ,
  
}
/* TestTool-WonderEditor Not a pure module */
