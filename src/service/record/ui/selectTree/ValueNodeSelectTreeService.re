open SelectTreeType;

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  ValueNode(nodeId, nodeData);

let buildNode = (~nodeId, ~name, ~isSelect, ~type_, ~value) =>
  ValueNode(nodeId, {isSelect, name, type_, value});

let getIsSelect = nodeData => nodeData.isSelect;

let setIsSelect = (isSelect, nodeData): valueNodeData => {
  ...nodeData,
  isSelect,
};

let getType = nodeData => nodeData.type_;

let getValue = nodeData => nodeData.value;