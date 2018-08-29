

import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.getNth(index, array);
}

function triggerFileDragStartEvent(index, domChildren) {
  var content = ArrayService$WonderEditor.getNth(1, domChildren);
  var array = content.children;
  var fileArticle = ArrayService$WonderEditor.getNth(index, array);
  var array$1 = fileArticle.children;
  var file = ArrayService$WonderEditor.getNth(0, array$1);
  return BaseEventTool$WonderEditor.triggerDragStartEvent(file, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function _getTriggerTextureDiv(domChildren) {
  var sceneTreeInspector = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = sceneTreeInspector.children;
  var renderGroupDiv = ArrayService$WonderEditor.getNth(3, array);
  var array$1 = renderGroupDiv.children;
  var renderGroupArticle = ArrayService$WonderEditor.getNth(1, array$1);
  var array$2 = renderGroupArticle.children;
  var materialDiv = ArrayService$WonderEditor.getNth(2, array$2);
  var array$3 = materialDiv.children;
  var materialBox = ArrayService$WonderEditor.getNth(1, array$3);
  var array$4 = materialBox.children;
  var div = ArrayService$WonderEditor.getNth(2, array$4);
  var array$5 = div.children;
  var materialArticle = ArrayService$WonderEditor.getNth(0, array$5);
  var array$6 = materialArticle.children;
  return ArrayService$WonderEditor.getNth(1, array$6);
}

function triggerTextureDragEnterEvent(domChildren) {
  var textureDiv = _getTriggerTextureDiv(domChildren);
  var array = textureDiv.children;
  var div = ArrayService$WonderEditor.getNth(0, array);
  return BaseEventTool$WonderEditor.triggerDragEnterEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerTextureDragLeaveEvent(domChildren) {
  var textureDiv = _getTriggerTextureDiv(domChildren);
  var array = textureDiv.children;
  var div = ArrayService$WonderEditor.getNth(0, array);
  return BaseEventTool$WonderEditor.triggerDragLeaveEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerTextureDragDropEvent(domChildren) {
  var textureDiv = _getTriggerTextureDiv(domChildren);
  var array = textureDiv.children;
  var div = ArrayService$WonderEditor.getNth(0, array);
  return BaseEventTool$WonderEditor.triggerDropEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerRemoveTextureClickEvent(domChildren) {
  var textureDiv = _getTriggerTextureDiv(domChildren);
  var array = textureDiv.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(3, array));
}

export {
  _getFromArray ,
  triggerFileDragStartEvent ,
  _getTriggerTextureDiv ,
  triggerTextureDragEnterEvent ,
  triggerTextureDragLeaveEvent ,
  triggerTextureDragDropEvent ,
  triggerRemoveTextureClickEvent ,
  
}
/* ArrayService-WonderEditor Not a pure module */
