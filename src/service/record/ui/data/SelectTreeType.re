type nodeId = int;

type folderNodeData = {
  name: string,
  isSelect: bool,
};

type value;

type valueNodeData = {
  isSelect: bool,
  name: string,
  type_: string,
  value,
};

type tree =
  | FolderNode(nodeId, folderNodeData, array(tree))
  | ValueNode(nodeId, valueNodeData);