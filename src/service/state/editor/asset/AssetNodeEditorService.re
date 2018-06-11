open AssetTreeNodeType;
open AssetNodeType;
open EditorType;

let _getTreeNodeName = (index, state) =>
  index === ( state |> AssetTreeRootEditorService.getRootTreeNodeId ) ?
    "Asset" : "newFolder";

let buildFolderResult = (index, state) => {
  name: _getTreeNodeName(index, state),
  type_: Folder,
  result: None
};

let buildAssetTreeNodeByIndex = (index) => {id: index, children: [||]};