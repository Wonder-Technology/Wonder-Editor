let getDataByTextureNode = (textureNode, editorState) => {
  let {imageDataIndex}: NodeAssetType.textureNodeData =
    TextureNodeAssetService.getNodeData(textureNode);

  ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex, editorState);
};

let getMapValidLength = editorState =>
  ImageDataMapAssetEditorService.getMap(editorState)
  |> WonderCommonlib.ImmutableSparseMapService.getValidValues
  |> Js.Array.length;

let getNewImageDataMapIndex = (~editorState=StateEditorService.getState(), ()) =>
  IndexAssetEditorService.getImageDataMapIndex(editorState) |> succ;