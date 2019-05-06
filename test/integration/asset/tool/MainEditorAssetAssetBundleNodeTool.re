let getName = (nodeId, editorState) =>
  AssetBundleNodeAssetService.getNodeName(
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> AssetBundleNodeAssetService.getNodeData,
  );

let getAssetBundle = (nodeId, editorState) =>
  AssetBundleNodeAssetService.getAssetBundle(
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState),
  );