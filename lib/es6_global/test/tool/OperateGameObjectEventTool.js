

import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function triggerClickAddBox(domChildren) {
  var gameObjectDiv = ArrayService$WonderEditor.unsafeGetNth(1, domChildren);
  var array = gameObjectDiv.children;
  var addBoxDiv = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = addBoxDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.unsafeGetNth(0, array$1));
}

function triggerClickDisposeAndExecDisposeJob(domChildren) {
  var gameObjectDiv = ArrayService$WonderEditor.unsafeGetNth(1, domChildren);
  var array = gameObjectDiv.children;
  var disposeDiv = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = disposeDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.unsafeGetNth(0, array$1));
}

function triggerClickAddEmptyGameObject(domChildren) {
  var gameObjectDiv = ArrayService$WonderEditor.unsafeGetNth(5, domChildren);
  var array = gameObjectDiv.children;
  var addGameObjectDiv = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = addGameObjectDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.unsafeGetNth(0, array$1));
}

function triggerClickExport(domChildren) {
  var gameObjectDiv = ArrayService$WonderEditor.unsafeGetNth(6, domChildren);
  var array = gameObjectDiv.children;
  var addGameObjectDiv = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = addGameObjectDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.unsafeGetNth(0, array$1));
}

export {
  _getFromArray ,
  triggerClickAddBox ,
  triggerClickDisposeAndExecDisposeJob ,
  triggerClickAddEmptyGameObject ,
  triggerClickExport ,
  
}
/* ArrayService-WonderEditor Not a pure module */
