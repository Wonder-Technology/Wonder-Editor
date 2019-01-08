let getRootNode = editorState =>
  RootTreeAssetService.getRootNode(
    TreeAssetEditorService.unsafeGetTree(editorState),
  );

let buildRootNode = (name, editorState) => {
  let (rootNodeId, rootNode, newIndex) =
    RootTreeAssetService.buildRootNode(
      RootTreeAssetService.getAssetTreeRootName(),
      IndexAssetEditorService.getNodeIndex(editorState),
    );

  (
    rootNodeId,
    rootNode,
    editorState |> IndexAssetEditorService.setNodeIndex(newIndex),
  );
};