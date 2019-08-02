let getDataByTextureNode = (textureNode, editorState) => {
  let {imageDataIndex}: NodeAssetType.textureNodeData =
    TextureNodeAssetService.getNodeData(textureNode);

  BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(imageDataIndex, editorState);
};

let getMapValidLength = editorState =>
  BasicSourceTextureImageDataMapAssetEditorService.getMap(editorState)
  |> WonderCommonlib.ImmutableSparseMapService.getValidValues
  |> Js.Array.length;

let getNewImageDataMapIndex = (~editorState=StateEditorService.getState(), ()) =>
  IndexAssetEditorService.getBasicSourceTextureImageDataMapIndex(editorState) |> succ;