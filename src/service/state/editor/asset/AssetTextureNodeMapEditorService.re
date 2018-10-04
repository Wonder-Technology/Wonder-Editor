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

let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> TextureNodeMapAssetService.setResult(index, result),
};

let getTextureParentId = (currentNodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderLog.Log.print
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> WonderLog.Log.print
  |> (({parentId}: textureResultType) => parentId);

let buildTextureNodeResult = (textureIndex, parentId, imageId) => {
  textureIndex,
  parentId,
  imageId,
};

let setTextureNodeResultParent = (parentId, texureResult: textureResultType) => {
  ...texureResult,
  parentId,
};