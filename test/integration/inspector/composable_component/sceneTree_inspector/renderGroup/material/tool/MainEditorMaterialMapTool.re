let renderTextureGroup = (state, sendFunc, findAllTextureNodesFunc) =>
  SelectAssetByImage._renderAssetGroup(
    "Texture",
    state,
    (currentTextureComponent, node) =>
      currentTextureComponent
      |> SelectAssetByImage.convertAssetDataTypeToInt
      === TextureNodeAssetService.getTextureComponent(node),
    (node, (editorState, _)) =>
      ImageDataMapUtils.getImgSrc(
        TextureNodeAssetService.getImageDataIndex(node),
        editorState,
      ),
    sendFunc,
    findAllTextureNodesFunc,
  );