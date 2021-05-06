'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var MainEditorMaterial$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js");
var PrepareDefaultComponentLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/PrepareDefaultComponentLogicService.js");

function changeMaterial(sourceMaterial, sourceMaterialType, targetMaterial, targetMaterialType, materialNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var gameObject = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorMaterial$WonderEditor.Method[/* changeMaterial */1], /* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* tuple */[
              materialNodeId,
              /* tuple */[
                sourceMaterial,
                targetMaterial
              ],
              /* tuple */[
                sourceMaterialType,
                targetMaterialType
              ]
            ]);
}

var getDefaultBasicMaterialName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultBasicMaterialName;

var getDefaultLightMaterialName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultLightMaterialName;

exports.changeMaterial = changeMaterial;
exports.getDefaultBasicMaterialName = getDefaultBasicMaterialName;
exports.getDefaultLightMaterialName = getDefaultLightMaterialName;
/* TestTool-WonderEditor Not a pure module */
