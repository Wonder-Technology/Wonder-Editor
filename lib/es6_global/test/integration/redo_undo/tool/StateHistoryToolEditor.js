

import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as AllStateData$WonderEditor from "../../../../src/service/stateTuple/data/AllStateData.js";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function _triggerClickUndo(domChildren) {
  var operateHistoryDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = operateHistoryDiv.children;
  var undoDiv = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = undoDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.unsafeGetNth(0, array$1));
}

function _triggerClickRedo(domChildren) {
  var operateHistoryDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = operateHistoryDiv.children;
  var redoDiv = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = redoDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.unsafeGetNth(0, array$1));
}

function undo() {
  return BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)), _triggerClickUndo);
}

function redo() {
  return BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)), _triggerClickRedo);
}

function clearAllState() {
  return AllStateData$WonderEditor.setHistoryState(AllStateData$WonderEditor.createHistoryState(/* () */0));
}

export {
  _getFromArray ,
  _triggerClickUndo ,
  _triggerClickRedo ,
  undo ,
  redo ,
  clearAllState ,
  
}
/* TestTool-WonderEditor Not a pure module */
