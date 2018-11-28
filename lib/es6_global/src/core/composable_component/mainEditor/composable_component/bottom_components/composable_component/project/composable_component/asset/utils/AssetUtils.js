

import * as Js_option from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/CurrentDragSourceEditorService.js";

function getWidget() {
  return /* Asset */1;
}

function isWDBAssetFile() {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  var startNodeId = match[1];
  var widget = match[0];
  if (widget !== undefined && startNodeId !== undefined && widget === /* Asset */1) {
    return Js_option.isSome(SparseMapService$WonderCommonlib.get(startNodeId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0))));
  } else {
    return false;
  }
}

function isWidget(startWidget) {
  if (startWidget !== undefined) {
    return startWidget === /* Asset */1;
  } else {
    return false;
  }
}

export {
  getWidget ,
  isWDBAssetFile ,
  isWidget ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
