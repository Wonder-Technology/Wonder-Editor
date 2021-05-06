'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var IMGUITool$WonderEditor = require("../../../unit/tool/IMGUITool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var ResizeUtils$WonderEditor = require("../../../../src/core/utils/ui/ResizeUtils.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function setViewRect($staropt$star, $staropt$star$1, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 10;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 20;
  var partial_arg = /* tuple */[
    width,
    height
  ];
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return ResizeUtils$WonderEditor.updateViewRect(partial_arg, param);
              }));
}

function prepare(prepareStateFunc) {
  Curry._1(prepareStateFunc, /* () */0);
  StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
  IMGUITool$WonderEditor.prepareImgui(/* () */0);
  return setViewRect(undefined, undefined, /* () */0);
}

function getSceneActivedBasicCameraView(engineState) {
  var __x = MainEditorSceneTool$WonderEditor.getCameraInDefaultScene(engineState);
  return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, engineState);
}

exports.setViewRect = setViewRect;
exports.prepare = prepare;
exports.getSceneActivedBasicCameraView = getSceneActivedBasicCameraView;
/* IMGUITool-WonderEditor Not a pure module */
