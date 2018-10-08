let clickAssetTreeNodeToSetCurrentNode = (component, index) =>
  BaseEventTool.triggerComponentEvent(
    component,
    AssetTreeEventTool.clickAssetTreeNode(index),
  );

let getAddedFolderResult = assetTreeDomRecord => {
  assetTreeDomRecord
  |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstFolderNodeDomIndexForAssetTree
  |> clickAssetTreeNodeToSetCurrentNode(
       BuildComponentTool.buildAssetComponent(),
     );

  StateEditorService.getState()
  |> AssetFolderNodeMapEditorService.getFolderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(
       MainEditorAssetNodeTool.getCurrentNodeId(),
     );
};

let addFolderIntoNodeMap = (index, parentNodeId, editorState, engineState) =>
  AssetTreeNodeUtils.addFolderIntoNodeMap(
    index,
    parentNodeId,
    (editorState, engineState),
  );