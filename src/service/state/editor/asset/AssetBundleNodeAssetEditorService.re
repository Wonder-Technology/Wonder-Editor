let addAssetBundleNodeToAssetTree = (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let findAllAssetBundleNodes = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predAssetBundleNodeFunc=node => true,
    (),
  );