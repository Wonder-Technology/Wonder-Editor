

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as MainEditor$WonderEditor from "../../../../../src/core/composable_component/mainEditor/ui/MainEditor.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as AssetWidgetService$WonderEditor from "../../../../../src/service/record/editor/widget/AssetWidgetService.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../../src/service/record/editor/asset/WDBNodeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";

function dragWDBAsset(wdbNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, _, $staropt$star$3, $staropt$star$4, _$1) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  if ($staropt$star$2 === undefined) {
    AssetWidgetService$WonderEditor.getWidget(/* () */0);
  }
  if ($staropt$star$3 !== undefined) {
    Js_primitive.valFromOption($staropt$star$3);
  } else {
    document.createElement("img");
  }
  if ($staropt$star$4 !== undefined) {
    Js_primitive.valFromOption($staropt$star$4);
  } else {
    BaseEventTool$WonderEditor.buildDragEvent();
  }
  var wdbGameObjectUid = WDBNodeAssetService$WonderEditor.getWDBGameObject(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(wdbNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
  return Curry._3(MainEditor$WonderEditor.Method[/* dragWDB */6], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, wdbGameObjectUid);
}

var Drag = /* module */[/* dragWDBAsset */dragWDBAsset];

export {
  Drag ,
  
}
/* TestTool-WonderEditor Not a pure module */
