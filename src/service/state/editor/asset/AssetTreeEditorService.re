open AssetTreeNodeType;

open AssetNodeType;

let buildAssetTreeNodeByIndex = (index, type_) => {
  nodeId: index,
  type_,
  children: [||],
  isShowChildren: true,
};

let deepDisposeAssetTreeRoot = editorState => {
  let removedTreeNode =
    editorState
    |> AssetTreeRootEditorService.getAssetTreeRoot
    |> OptionService.unsafeGet;

  let (editorState, removedAssetIdArr) =
    editorState |> AssetUtils.deepRemoveTreeNode(removedTreeNode);

  editorState
  |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
  |> Js.Array.concat(removedAssetIdArr)
  |. AssetRemovedAssetIdArrayEditorService.setRemovedAssetIdArray(
       editorState,
     )
  |> AssetTreeRootEditorService.clearAssetTreeRoot
  |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
  |> AssetCurrentNodeDataEditorService.clearCurrentNodeData;
};
