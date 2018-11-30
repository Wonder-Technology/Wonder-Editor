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

let getImage = (nodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({image}: textureResultType) => image);

let getParentFolderNodeId = (nodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({parentFolderNodeId}: textureResultType) => parentFolderNodeId);

let buildTextureNodeResult =
    (~textureComponent, ~parentFolderNodeId, ~image, ~isInWDB=false, ()) => {
  textureComponent,
  parentFolderNodeId,
  image,
  isInWDB,
};

let setTextureNodeResultParent =
    (parentFolderNodeId, texureResult: textureResultType) => {
  ...texureResult,
  parentFolderNodeId,
};

let getValidValues = editorState =>
  getTextureNodeMap(editorState) |> SparseMapService.getValidValues;

let getResultByTextureComponent = (textureComponent, editorState) =>
  editorState
  |> getValidValues
  |> SparseMapService.find((texureResult: textureResultType) =>
       texureResult.textureComponent === textureComponent
     );

let doesAnyTextureUseImage = (targetImage, editorState) =>
  getValidValues(editorState)
  |> Js.Array.filter(({image}) => image === targetImage)
  |> Js.Array.length > 0;

let getTextureComponents = editorState =>
  getValidValues(editorState)
  |> SparseMapService.map(({textureComponent}) => textureComponent);