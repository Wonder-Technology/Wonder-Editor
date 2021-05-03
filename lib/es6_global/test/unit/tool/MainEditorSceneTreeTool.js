

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$WonderEditor from "../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../tool/ui/BaseEventTool.js";
import * as AssetWidgetService$WonderEditor from "../../../src/service/record/editor/widget/AssetWidgetService.js";
import * as DragEventBaseUtils$WonderEditor from "../../../src/core/utils/event/DragEventBaseUtils.js";
import * as SceneEngineService$WonderEditor from "../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTree$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as WDBNodeAssetService$WonderEditor from "../../../src/service/record/editor/asset/WDBNodeAssetService.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as CheckSceneTreeLogicService$WonderEditor from "../../../src/service/stateTuple/logic/sceneTree/CheckSceneTreeLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";

function isTriggerDragCurrentSceneTreeNode(targetGameObject) {
  return DragEventBaseUtils$WonderEditor.checkDragEnter(targetGameObject, SceneTreeWidgetService$WonderEditor.isWidget, CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation)[0];
}

function dragWDBAssetToSceneTree(wdbNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _, $staropt$star$4, $staropt$star$5, _$1) {
  var targetGameObject = $staropt$star !== undefined ? $staropt$star : SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  if ($staropt$star$3 === undefined) {
    AssetWidgetService$WonderEditor.getWidget(/* () */0);
  }
  if ($staropt$star$4 !== undefined) {
    Js_primitive.valFromOption($staropt$star$4);
  } else {
    document.createElement("img");
  }
  if ($staropt$star$5 !== undefined) {
    Js_primitive.valFromOption($staropt$star$5);
  } else {
    BaseEventTool$WonderEditor.buildDragEvent();
  }
  var wdbGameObjectUid = WDBNodeAssetService$WonderEditor.getWDBGameObject(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(wdbNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
  return Curry._3(MainEditorSceneTree$WonderEditor.Method[/* dragWDBIntoGameObject */3], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* tuple */[
              targetGameObject,
              wdbGameObjectUid,
              /* DragIntoTarget */2
            ]);
}

function dragGameObjectIntoGameObject(sourceGameObject, targetGameObject, $staropt$star, $staropt$star$1, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorSceneTree$WonderEditor.Method[/* dragGameObjectIntoGameObject */2], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* tuple */[
              targetGameObject,
              sourceGameObject,
              /* DragIntoTarget */2
            ]);
}

var Drag = /* module */[
  /* isTriggerDragCurrentSceneTreeNode */isTriggerDragCurrentSceneTreeNode,
  /* dragWDBAssetToSceneTree */dragWDBAssetToSceneTree,
  /* dragGameObjectIntoGameObject */dragGameObjectIntoGameObject
];

function selectGameObject($staropt$star, $staropt$star$1, gameObject, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return MainEditorSceneTree$WonderEditor.Method[/* onSelect */0](/* tuple */[
              store,
              dispatchFunc
            ], gameObject);
}

var Select = /* module */[/* selectGameObject */selectGameObject];

export {
  Drag ,
  Select ,
  
}
/* TestTool-WonderEditor Not a pure module */
