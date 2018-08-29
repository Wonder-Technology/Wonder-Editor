

import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.getNth(index, array);
}

function triggerClickEvent(treeNodeIndex, domChildren) {
  var dragTreeArticle = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = dragTreeArticle.children;
  var treeNodeUl = ArrayService$WonderEditor.getNth(treeNodeIndex, array);
  var array$1 = treeNodeUl.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(0, array$1));
}

function triggerDragStart(treeNodeIndex, domChildren) {
  var dragTreeArticle = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = dragTreeArticle.children;
  var treeNodeUl = ArrayService$WonderEditor.getNth(treeNodeIndex, array);
  return BaseEventTool$WonderEditor.triggerDragStartEvent(treeNodeUl, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function _getTriggerDragParentDiv(index, domChildren) {
  var dragTreeArticle = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = dragTreeArticle.children;
  var treeNodeUl = ArrayService$WonderEditor.getNth(index, array);
  var array$1 = treeNodeUl.children;
  var treeNodeLi = ArrayService$WonderEditor.getNth(0, array$1);
  var array$2 = treeNodeLi.children;
  return ArrayService$WonderEditor.getNth(0, array$2);
}

function triggerDragEnter(treeNodeIndex, domChildren) {
  var div = _getTriggerDragParentDiv(treeNodeIndex, domChildren);
  return BaseEventTool$WonderEditor.triggerDragEnterEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerDragLeave(treeNodeIndex, domChildren) {
  var div = _getTriggerDragParentDiv(treeNodeIndex, domChildren);
  return BaseEventTool$WonderEditor.triggerDragLeaveEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerDragOver(treeNodeIndex, domChildren) {
  var div = _getTriggerDragParentDiv(treeNodeIndex, domChildren);
  return BaseEventTool$WonderEditor.triggerDragOverEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerDragDrop(treeNodeIndex, domChildren) {
  var div = _getTriggerDragParentDiv(treeNodeIndex, domChildren);
  return BaseEventTool$WonderEditor.triggerDropEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function _getTriggerDragChildrenDiv(parentIndex, childrenIndex, domChildren) {
  var dragTreeArticle = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = dragTreeArticle.children;
  var treeNodeUl = ArrayService$WonderEditor.getNth(parentIndex, array);
  var array$1 = treeNodeUl.children;
  var treeNodeChildrenUl = ArrayService$WonderEditor.getNth(childrenIndex, array$1);
  var array$2 = treeNodeChildrenUl.children;
  var treeNodeLi = ArrayService$WonderEditor.getNth(0, array$2);
  var array$3 = treeNodeLi.children;
  return ArrayService$WonderEditor.getNth(0, array$3);
}

function triggerDragEnterChildren(parentIndex, childrenIndex, domChildren) {
  var div = _getTriggerDragChildrenDiv(parentIndex, childrenIndex, domChildren);
  return BaseEventTool$WonderEditor.triggerDragEnterEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerDragDropChildren(parentIndex, childrenIndex, domChildren) {
  var div = _getTriggerDragChildrenDiv(parentIndex, childrenIndex, domChildren);
  return BaseEventTool$WonderEditor.triggerDropEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerDragEnterDiv(index, domChildren) {
  var dragTreeArticle = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = dragTreeArticle.children;
  var div = ArrayService$WonderEditor.getNth(index, array);
  return BaseEventTool$WonderEditor.triggerDragEnterEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerDragLeaveDiv(index, domChildren) {
  var dragTreeArticle = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = dragTreeArticle.children;
  var div = ArrayService$WonderEditor.getNth(index, array);
  return BaseEventTool$WonderEditor.triggerDragLeaveEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerDragDropDiv(index, domChildren) {
  var dragTreeArticle = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = dragTreeArticle.children;
  var div = ArrayService$WonderEditor.getNth(index, array);
  return BaseEventTool$WonderEditor.triggerDropEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

export {
  _getFromArray ,
  triggerClickEvent ,
  triggerDragStart ,
  _getTriggerDragParentDiv ,
  triggerDragEnter ,
  triggerDragLeave ,
  triggerDragOver ,
  triggerDragDrop ,
  _getTriggerDragChildrenDiv ,
  triggerDragEnterChildren ,
  triggerDragDropChildren ,
  triggerDragEnterDiv ,
  triggerDragLeaveDiv ,
  triggerDragDropDiv ,
  
}
/* ArrayService-WonderEditor Not a pure module */
