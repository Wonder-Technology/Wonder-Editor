open AssetType;

let getSelectedFolderNodeInAssetTree = ({selectedFolderNodeInAssetTree}) => selectedFolderNodeInAssetTree;

let unsafeGetSelectedFolderNodeInAssetTree = record =>
  getSelectedFolderNodeInAssetTree(record) |> OptionService.unsafeGet;

let clearSelectedFolderNodeInAssetTree = record => {
  ...record,
  selectedFolderNodeInAssetTree: None,
};

let setSelectedFolderNodeInAssetTree = (selectedFolderNodeInAssetTree, record) => {
  ...record,
  selectedFolderNodeInAssetTree: Some(selectedFolderNodeInAssetTree),
};