open EditorType;

open AssetNodeType;

let getTextureNodeMap = editorState =>
  editorState.assetRecord |> TextureNodeMapAssetService.getTextureNodeMap;

let setTextureNodeMap = (textureNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> TextureNodeMapAssetService.setTextureNodeMap(textureNodeMap),
};

let setResult = (nodeId, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> TextureNodeMapAssetService.setResult(nodeId, result),
};

let getTextureParentId = (currentNodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({parentFolderNodeId}: textureResultType) => parentFolderNodeId);

let buildTextureNodeResult = (textureComponent, parentFolderNodeId, imageId) => {
  textureComponent,
  parentFolderNodeId,
  imageId,
};

let setTextureNodeResultParent = (parentFolderNodeId, texureResult: textureResultType) => {
  ...texureResult,
  parentFolderNodeId,
};