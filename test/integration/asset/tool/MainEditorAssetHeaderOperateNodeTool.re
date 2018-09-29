let triggerAddFolderClick =
    (~component=BuildComponentTool.buildAssetComponent(), ()) =>
  BaseEventTool.triggerComponentEvent(
    BuildComponentTool.buildAssetComponent(),
    AssetTreeEventTool.triggerAddFolderClick,
  );

let triggerRemoveNodeClick = component =>
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeEventTool.triggerRemoveNodeClick,
  );