let getDataByTextureNode = (textureNode, editorState) => {
  let {imageDataIndex}: NodeAssetType.textureNodeData =
    TextureNodeAssetService.getNodeData(textureNode);

  ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex, editorState);
};