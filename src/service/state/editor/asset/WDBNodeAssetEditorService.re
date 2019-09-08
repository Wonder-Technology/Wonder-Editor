let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    WDBNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let unsafeGetNodeData = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> WDBNodeAssetService.getNodeData;

let addWDBNodeToAssetTree = (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let findAllWDBNodes = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predWDBNodeFunc=node => true,
    (),
  );

let isWDBAssetFile = () => {
  let (widget, startNodeId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  switch (widget, startNodeId) {
  | (Some(widget), Some(nodeId)) =>
    widget === AssetWidgetService.getWidget()
    && StateEditorService.getState()
    |> OperateTreeAssetEditorService.findNodeById(nodeId)
    |> OptionService.eitherWithNoData(
         node => WDBNodeAssetService.isNode(node),
         () => false,
       )
  | _ => false
  };
};