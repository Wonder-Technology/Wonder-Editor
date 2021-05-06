'use strict';

var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var MainEditorTransformTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js");

function simulateTwiceChangePosition($staropt$star, $staropt$star$1, param) {
  var firstValue = $staropt$star !== undefined ? $staropt$star : 11.25;
  var secondValue = $staropt$star$1 !== undefined ? $staropt$star$1 : 15;
  var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
  MainEditorTransformTool$WonderEditor.changePositionXAndBlur(firstValue, currentGameObjectTransform, undefined, undefined, /* () */0);
  return MainEditorTransformTool$WonderEditor.changePositionYAndBlur(secondValue, currentGameObjectTransform, undefined, undefined, /* () */0);
}

exports.simulateTwiceChangePosition = simulateTwiceChangePosition;
/* GameObjectTool-WonderEditor Not a pure module */
