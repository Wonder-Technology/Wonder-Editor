let clickAssetChildrenNodeToSetCurrentNode = index => {
  let component = BuildComponentTool.buildAssetComponent();

  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeEventTool.clickAssetTreeChildrenNode(index),
  );
};