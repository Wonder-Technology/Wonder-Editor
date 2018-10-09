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
  |> (({parentNodeId}: textureResultType) => parentNodeId);

let buildTextureNodeResult = (textureComponent, parentNodeId, imageId) => {
  textureComponent,
  parentNodeId,
  imageId,
};

let setTextureNodeResultParent = (parentNodeId, texureResult: textureResultType) => {
  ...texureResult,
  parentNodeId,
};