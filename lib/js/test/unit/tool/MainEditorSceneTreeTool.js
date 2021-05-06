'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../tool/TestTool.js");
var BaseEventTool$WonderEditor = require("../../tool/ui/BaseEventTool.js");
var GameObjectTool$WonderEditor = require("../../tool/GameObjectTool.js");
var AssetWidgetService$WonderEditor = require("../../../src/service/record/editor/widget/AssetWidgetService.js");
var DragEventBaseUtils$WonderEditor = require("../../../src/core/utils/event/DragEventBaseUtils.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTree$WonderEditor = require("../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js");
var WDBNodeAssetService$WonderEditor = require("../../../src/service/record/editor/asset/WDBNodeAssetService.js");
var SceneTreeWidgetService$WonderEditor = require("../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var CheckSceneTreeLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/sceneTree/CheckSceneTreeLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");

function isTriggerDragCurrentSceneTreeNode(targetGameObject) {
  return DragEventBaseUtils$WonderEditor.isValidForDragEnter(targetGameObject, SceneTreeWidgetService$WonderEditor.isWidget, CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation)[0];
}

function dragWDBAssetToSceneTree(wdbNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var targetGameObject = $staropt$star !== undefined ? $staropt$star : SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  if ($staropt$star$3 === undefined) {
    AssetWidgetService$WonderEditor.getWidget(/* () */0);
  }
  if ($staropt$star$5 !== undefined) {
    Caml_option.valFromOption($staropt$star$5);
  } else {
    document.createElement("img");
  }
  if ($staropt$star$6 !== undefined) {
    Caml_option.valFromOption($staropt$star$6);
  } else {
    BaseEventTool$WonderEditor.buildDragEvent();
  }
  var dragPosition = $staropt$star$7 !== undefined ? $staropt$star$7 : /* DragIntoTarget */2;
  var wdbGameObject = WDBNodeAssetService$WonderEditor.getWDBGameObject(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(wdbNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
  return Curry._3(MainEditorSceneTree$WonderEditor.Method[/* dragWDBToBeTargetSib */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              targetGameObject,
              wdbGameObject,
              dragPosition
            ]);
}

function dragGameObjectToBeTargetSib(sourceGameObject, targetGameObject, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var dragPosition = $staropt$star !== undefined ? $staropt$star : /* DragIntoTarget */2;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorSceneTree$WonderEditor.Method[/* dragGameObjectToBeTargetSib */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              targetGameObject,
              sourceGameObject,
              dragPosition
            ]);
}

var Drag = /* module */[
  /* isTriggerDragCurrentSceneTreeNode */isTriggerDragCurrentSceneTreeNode,
  /* dragWDBAssetToSceneTree */dragWDBAssetToSceneTree,
  /* dragGameObjectToBeTargetSib */dragGameObjectToBeTargetSib
];

function selectGameObject($staropt$star, $staropt$star$1, gameObject, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
  return MainEditorSceneTree$WonderEditor.Method[/* onSelect */0](/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject);
}

var Select = /* module */[/* selectGameObject */selectGameObject];

exports.Drag = Drag;
exports.Select = Select;
/* TestTool-WonderEditor Not a pure module */
