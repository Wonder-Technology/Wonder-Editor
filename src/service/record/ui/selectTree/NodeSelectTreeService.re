open SelectTreeType;

let getNodeId = node =>
  switch (node) {
  | FolderNode(nodeId, _, _) => nodeId
  | ValueNode(nodeId, _) => nodeId
  };