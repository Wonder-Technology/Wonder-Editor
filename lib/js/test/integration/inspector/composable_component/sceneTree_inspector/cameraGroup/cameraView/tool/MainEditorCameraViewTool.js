'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var MainEditorCameraView$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraView/ui/MainEditorCameraView.js");

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

exports.buildEvent = buildEvent;
exports.setCurrentCamera = setCurrentCamera;
/* TestTool-WonderEditor Not a pure module */
