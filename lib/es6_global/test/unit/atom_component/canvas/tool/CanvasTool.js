

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as AssetUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/AssetUtils.js";
import * as MainEditor$WonderEditor from "../../../../../src/core/composable_component/mainEditor/ui/MainEditor.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as DragEventUtils$WonderEditor from "../../../../../src/core/utils/event/DragEventUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/WDBNodeMapAssetEditorService.js";

function dragWDBAsset(wdbNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var widget = $staropt$star$2 !== undefined ? $staropt$star$2 : AssetUtils$WonderEditor.getWidget(/* () */0);
  var effectEffectAllowd = $staropt$star$3 !== undefined ? $staropt$star$3 : "move";
  var dragImg = $staropt$star$4 !== undefined ? Js_primitive.valFromOption($staropt$star$4) : document.createElement("img");
  var $$event = $staropt$star$5 !== undefined ? Js_primitive.valFromOption($staropt$star$5) : BaseEventTool$WonderEditor.buildDragEvent();
  DragEventUtils$WonderEditor.handleDragStart(wdbNodeId, widget, dragImg, effectEffectAllowd, $$event);
  var param = SparseMapService$WonderCommonlib.unsafeGet(wdbNodeId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
  Curry._3(MainEditor$WonderEditor.Method[/* dragWDB */6], /* tuple */[
        store,
        dispatchFunc
      ], /* () */0, param[/* wdbGameObject */3]);
  return DragEventUtils$WonderEditor.handleDrageEnd($$event);
}

var Drag = /* module */[/* dragWDBAsset */dragWDBAsset];

export {
  Drag ,
  
}
/* TestTool-WonderEditor Not a pure module */
