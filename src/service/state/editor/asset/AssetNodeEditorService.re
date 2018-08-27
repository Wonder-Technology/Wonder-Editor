open AssetTreeNodeType;

open AssetNodeType;

let _getTreeNodeName = (index, state) =>
  index === (state |> AssetTreeRootEditorService.getRootTreeNodeId) ?
    "Asset" : "newFolder";

let buildFolderResult = (index, state) => {
  name: _getTreeNodeName(index, state),
};

let renameFolderNodeResult = (name, folderNodeResult: folderResultType) => {
  ...folderNodeResult,
  name,
};

let buildJsonNodeResult = (fileResult: nodeResultType) => {
  name: fileResult.name,
  jsonResult: fileResult.result |> FileReader.convertResultToString,
};

let renameJsonNodeResult = (name, jsonNodeResult: jsonResultType) => {
  ...jsonNodeResult,
  name,
};

let buildTextureNodeResult = textureIndex => {textureIndex: textureIndex};

let buildWdbNodeResult = (name, wdbGameObject, wdbArrayBuffer) => {
  name,
  wdbGameObject,
  wdbArrayBuffer,
};

let renameWdbNodeResult = (name, wdbNodeResult) : wdbResultType => {...wdbNodeResult, name};

let buildMaterialNodeResult = (name, type_, materialComponent) => {
  name,
  type_,
  materialComponent,
};

let renameMaterialNodeResult = (name, materialNodeResult: materialResultType) => {
  ...materialNodeResult,
  name,
};

let buildAssetTreeNodeByIndex = (index, type_) => {
  id: index,
  type_,
  children: [||],
};