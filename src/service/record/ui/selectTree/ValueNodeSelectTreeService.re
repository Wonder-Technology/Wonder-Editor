open SelectTreeType;

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  ValueNode(nodeId, nodeData);

let setIsSelect = (isSelect, nodeData): valueNodeData => {
  ...nodeData,
  isSelect,
};