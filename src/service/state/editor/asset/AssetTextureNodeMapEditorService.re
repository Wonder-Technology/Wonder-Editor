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

let getParentFolderNodeId = (currentNodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({parentFolderNodeId}: textureResultType) => parentFolderNodeId);

let buildTextureNodeResult = (textureComponent, parentFolderNodeId, image) => {
  textureComponent,
  parentFolderNodeId,
  image,
};

let setTextureNodeResultParent =
    (parentFolderNodeId, texureResult: textureResultType) => {
  ...texureResult,
  parentFolderNodeId,
};

let getValidValues = editorState =>
  getTextureNodeMap(editorState) |> SparseMapService.getValidValues;

let doesAnyTextureUseImage = (targetImage, editorState) =>
  getValidValues(editorState)
  |> Js.Array.filter(({image}) => image === targetImage)
  |> Js.Array.length > 0;