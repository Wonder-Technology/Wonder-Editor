let getAddedFolderResult = assetTreeDomRecord => {
  assetTreeDomRecord
  |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstFolderNodeDomIndexForAssetTree
  |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
       BuildComponentTool.buildAssetComponent(),
     );

  StateEditorService.getState()
  |> AssetFolderNodeMapEditorService.getFolderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(
       MainEditorAssetNodeTool.getCurrentNodeId(),
     );
};