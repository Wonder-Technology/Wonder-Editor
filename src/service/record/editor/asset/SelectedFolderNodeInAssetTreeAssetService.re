open AssetType;

let getSelectedFolderNodeIdInAssetTree = ({selectedFolderNodeIdInAssetTree}) => selectedFolderNodeIdInAssetTree;

let unsafeGetSelectedFolderNodeIdInAssetTree = record =>
  getSelectedFolderNodeIdInAssetTree(record) |> OptionService.unsafeGet;

let clearSelectedFolderNodeIdInAssetTree = record => {
  ...record,
  selectedFolderNodeIdInAssetTree: None,
};

let setSelectedFolderNodeIdInAssetTree =
    (selectedFolderNodeInAssetTree, record) => {
  ...record,
  selectedFolderNodeIdInAssetTree: Some(selectedFolderNodeInAssetTree),
};