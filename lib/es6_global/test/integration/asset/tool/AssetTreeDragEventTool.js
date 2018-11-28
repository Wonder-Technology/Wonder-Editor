

import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function triggerRootDragEnterEvent(domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var targetLi = ArrayService$WonderEditor.unsafeGetNth(0, array$2);
  var array$3 = targetLi.children;
  var targetDiv = ArrayService$WonderEditor.unsafeGetNth(0, array$3);
  return BaseEventTool$WonderEditor.triggerDragEnterEvent(targetDiv, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerRootDropEvent(domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var targetLi = ArrayService$WonderEditor.unsafeGetNth(0, array$2);
  var array$3 = targetLi.children;
  var targetDiv = ArrayService$WonderEditor.unsafeGetNth(0, array$3);
  return BaseEventTool$WonderEditor.triggerDropEvent(targetDiv, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerFirstLayerClickEvent(treeNodeIndex, domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var childrenTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(treeNodeIndex, array$2);
  var array$3 = childrenTreeNodeUl.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.unsafeGetNth(0, array$3));
}

function triggerFirstLayerDragStartEvent(treeNodeIndex, domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var childrenTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(treeNodeIndex, array$2);
  return BaseEventTool$WonderEditor.triggerDragStartEvent(childrenTreeNodeUl, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerFirstLayerDragEnterEvent(treeNodeIndex, domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var childrenTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(treeNodeIndex, array$2);
  var array$3 = childrenTreeNodeUl.children;
  var targetLi = ArrayService$WonderEditor.unsafeGetNth(0, array$3);
  var array$4 = targetLi.children;
  var targetDiv = ArrayService$WonderEditor.unsafeGetNth(0, array$4);
  return BaseEventTool$WonderEditor.triggerDragEnterEvent(targetDiv, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerFirstLayerDropEvent(treeNodeIndex, domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var childrenTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(treeNodeIndex, array$2);
  var array$3 = childrenTreeNodeUl.children;
  var targetLi = ArrayService$WonderEditor.unsafeGetNth(0, array$3);
  var array$4 = targetLi.children;
  var targetDiv = ArrayService$WonderEditor.unsafeGetNth(0, array$4);
  return BaseEventTool$WonderEditor.triggerDropEvent(targetDiv, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerSecondLayerDragStartEvent(parentIndex, treeNodeIndex, domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var parentTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(parentIndex, array$2);
  var array$3 = parentTreeNodeUl.children;
  var childrenTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(treeNodeIndex, array$3);
  return BaseEventTool$WonderEditor.triggerDragStartEvent(childrenTreeNodeUl, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerSecondLayerDragEnterEvent(parentIndex, treeNodeIndex, domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var parentTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(parentIndex, array$2);
  var array$3 = parentTreeNodeUl.children;
  var childrenTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(treeNodeIndex, array$3);
  var array$4 = childrenTreeNodeUl.children;
  var targetLi = ArrayService$WonderEditor.unsafeGetNth(0, array$4);
  var array$5 = targetLi.children;
  var targetDiv = ArrayService$WonderEditor.unsafeGetNth(0, array$5);
  return BaseEventTool$WonderEditor.triggerDragEnterEvent(targetDiv, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerSecondLayerDropEvent(parentIndex, treeNodeIndex, domChildren) {
  var treeDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = rootUl.children;
  var parentTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(parentIndex, array$2);
  var array$3 = parentTreeNodeUl.children;
  var childrenTreeNodeUl = ArrayService$WonderEditor.unsafeGetNth(treeNodeIndex, array$3);
  var array$4 = childrenTreeNodeUl.children;
  var targetLi = ArrayService$WonderEditor.unsafeGetNth(0, array$4);
  var array$5 = targetLi.children;
  var targetDiv = ArrayService$WonderEditor.unsafeGetNth(0, array$5);
  return BaseEventTool$WonderEditor.triggerDropEvent(targetDiv, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerFileDragStartEvent(index, domChildren) {
  var content = ArrayService$WonderEditor.unsafeGetNth(1, domChildren);
  var array = content.children;
  var fileArticle = ArrayService$WonderEditor.unsafeGetNth(index, array);
  var array$1 = fileArticle.children;
  var file = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  return BaseEventTool$WonderEditor.triggerDragStartEvent(file, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerFolderDragEnterEvent(index, domChildren) {
  var content = ArrayService$WonderEditor.unsafeGetNth(1, domChildren);
  var array = content.children;
  var fileArticle = ArrayService$WonderEditor.unsafeGetNth(index, array);
  var array$1 = fileArticle.children;
  var div = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  return BaseEventTool$WonderEditor.triggerDragEnterEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerFolderDragLeaveEvent(index, domChildren) {
  var content = ArrayService$WonderEditor.unsafeGetNth(1, domChildren);
  var array = content.children;
  var fileArticle = ArrayService$WonderEditor.unsafeGetNth(index, array);
  var array$1 = fileArticle.children;
  var div = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  return BaseEventTool$WonderEditor.triggerDragLeaveEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

function triggerFolderDragDropEvent(index, domChildren) {
  var content = ArrayService$WonderEditor.unsafeGetNth(1, domChildren);
  var array = content.children;
  var fileArticle = ArrayService$WonderEditor.unsafeGetNth(index, array);
  var array$1 = fileArticle.children;
  var div = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  return BaseEventTool$WonderEditor.triggerDropEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
}

export {
  _getFromArray ,
  triggerRootDragEnterEvent ,
  triggerRootDropEvent ,
  triggerFirstLayerClickEvent ,
  triggerFirstLayerDragStartEvent ,
  triggerFirstLayerDragEnterEvent ,
  triggerFirstLayerDropEvent ,
  triggerSecondLayerDragStartEvent ,
  triggerSecondLayerDragEnterEvent ,
  triggerSecondLayerDropEvent ,
  triggerFileDragStartEvent ,
  triggerFolderDragEnterEvent ,
  triggerFolderDragLeaveEvent ,
  triggerFolderDragDropEvent ,
  
}
/* ArrayService-WonderEditor Not a pure module */
