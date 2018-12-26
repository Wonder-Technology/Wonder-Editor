open AssetType;

let getCurrentNodeId = ({currentNodeId}) => currentNodeId;

let unsafeGetCurrentNodeId = record =>
  getCurrentNodeId(record) |> OptionService.unsafeGet;

let clearCurrentNodeId = record => {...record, currentNodeId: None};

let setCurrentNodeId = (currentNodeId, record) => {
  ...record,
  currentNodeId: Some(currentNodeId),
};