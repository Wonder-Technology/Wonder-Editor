let triggerAssetChildrenDragIntoAssetTree = (startIndex, targetIndex) => {
  let component = BuildComponentTool.buildAssetComponent();

  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFileDragStartEvent(startIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(targetIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFirstLayerDropEvent(targetIndex),
  );
};
let triggerAssetChildrenDragIntoChildrenFolder = (startIndex, targetIndex) => {
  let component = BuildComponentTool.buildAssetComponent();

  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFileDragStartEvent(startIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFolderDragEnterEvent(targetIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFolderDragLeaveEvent(targetIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFolderDragEnterEvent(targetIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFolderDragDropEvent(targetIndex),
  );
};