open AssetType;

let getCurrentNode = ({currentNode}) => currentNode;

let unsafeGetCurrentNode = record =>
  getCurrentNode(record) |> OptionService.unsafeGet;

let clearCurrentNode = record => {...record, currentNode: None};

let setCurrentNode = (currentNode, record) => {
  ...record,
  currentNode: Some(currentNode),
};