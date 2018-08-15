

import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.getNth(index, array);
}

function triggerClickAddBox(domChildren) {
  var gameObjectDiv = ArrayService$WonderEditor.getNth(1, domChildren);
  var array = gameObjectDiv.children;
  var addBoxDiv = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = addBoxDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(0, array$1));
}

function triggerClickDisposeAndExecDisposeJob(domChildren) {
  var gameObjectDiv = ArrayService$WonderEditor.getNth(1, domChildren);
  var array = gameObjectDiv.children;
  var disposeDiv = ArrayService$WonderEditor.getNth(1, array);
  var array$1 = disposeDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(0, array$1));
}

function triggerClickAddEmptyGameObject(domChildren) {
  var gameObjectDiv = ArrayService$WonderEditor.getNth(5, domChildren);
  var array = gameObjectDiv.children;
  var addGameObjectDiv = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = addGameObjectDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(0, array$1));
}

export {
  _getFromArray ,
  triggerClickAddBox ,
  triggerClickDisposeAndExecDisposeJob ,
  triggerClickAddEmptyGameObject ,
  
}
/* ArrayService-WonderEditor Not a pure module */
