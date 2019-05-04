open SelectTreeType;

let replaceNode = (targetNodeId, newTreeNode, tree) => {
  let _nodeFunc = (nodeId, nodeData, buildNodeByNodeDataFunc) =>
    nodeId === targetNodeId ?
      newTreeNode : buildNodeByNodeDataFunc(~nodeId, ~nodeData);
  let _valueNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(
      nodeId,
      nodeData,
      ValueNodeSelectTreeService.buildNodeByNodeData,
    );
  let _folderNodeFunc = (nodeId, nodeData, children) =>
    _nodeFunc(
      nodeId,
      nodeData,
      FolderNodeSelectTreeService.buildNodeByNodeData(~children),
    );

  IterateTreeSelectTreeService.cata(
    ~tree,
    ~valueNodeFunc=_valueNodeFunc,
    ~folderNodeFunc=_folderNodeFunc,
    (),
  );
};

let updateNode = (nodeId, nodeData, buildNodeByNodeDataFunc, tree) =>
  tree |> replaceNode(nodeId, buildNodeByNodeDataFunc(~nodeId, ~nodeData));