'use strict';

var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../tool/GameObjectTool.js");
var SceneTreeInspector$WonderEditor = require("../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/ui/SceneTreeInspector.js");

function renameGameObject(name, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var gameObject = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return SceneTreeInspector$WonderEditor.Method[/* reNameGameObjectBlurEvent */0](/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, name);
}

exports.renameGameObject = renameGameObject;
/* TestTool-WonderEditor Not a pure module */
