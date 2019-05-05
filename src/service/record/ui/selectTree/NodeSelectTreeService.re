open SelectTreeType;

let getNodeId = node =>
  switch (node) {
  | FolderNode(nodeId, _, _) => nodeId
  | ValueNode(nodeId, _) => nodeId
  };

let getNodeName = node =>
  switch (node) {
  | FolderNode(_, nodeData, _) => nodeData.name
  | ValueNode(_, nodeData) => nodeData.name
  };