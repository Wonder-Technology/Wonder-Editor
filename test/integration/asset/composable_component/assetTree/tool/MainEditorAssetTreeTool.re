let triggerClickAssetTreeNode = index => {
  let component = BuildComponentTool.buildAssetComponent();
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeEventTool.clickAssetTreeNode(index),
  );
};

let triggerAssetChildrenNodeDragEvent = (startIndex, enterIndex, dropIndex) => {
  let component = BuildComponentTool.buildAssetComponent();

  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFileDragStartEvent(startIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(enterIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeDragEventTool.triggerFirstLayerDropEvent(dropIndex),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeEventTool.clickAssetTreeNode(1),
  );

  component;
};