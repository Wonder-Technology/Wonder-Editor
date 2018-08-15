

import * as BaseEventTool$WonderEditor from "../../../../../tool/ui/BaseEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as AssetTreeDragEventTool$WonderEditor from "../../../tool/AssetTreeDragEventTool.js";

function triggerAssetChildrenDragIntoAssetTree(startIndex, targetIndex) {
  var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return AssetTreeDragEventTool$WonderEditor.triggerFileDragStartEvent(startIndex, param);
        }));
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDragEnterEvent(targetIndex, param);
        }));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDropEvent(targetIndex, param);
              }));
}

function triggerAssetChildrenDragIntoChildrenFolder(startIndex, targetIndex) {
  var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return AssetTreeDragEventTool$WonderEditor.triggerFileDragStartEvent(startIndex, param);
        }));
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return AssetTreeDragEventTool$WonderEditor.triggerFolderDragEnterEvent(targetIndex, param);
        }));
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return AssetTreeDragEventTool$WonderEditor.triggerFolderDragLeaveEvent(targetIndex, param);
        }));
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return AssetTreeDragEventTool$WonderEditor.triggerFolderDragEnterEvent(targetIndex, param);
        }));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return AssetTreeDragEventTool$WonderEditor.triggerFolderDragDropEvent(targetIndex, param);
              }));
}

export {
  triggerAssetChildrenDragIntoAssetTree ,
  triggerAssetChildrenDragIntoChildrenFolder ,
  
}
/* BuildComponentTool-WonderEditor Not a pure module */
