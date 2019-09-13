let renderTextureGroup = (state , sendFunc, findAllTextureNodesFunc) =>
  SelectAssetNode._renderAssetGroup(
    "Texture",
    /* {
  style: ReactDOMRe.Style.t,
  isShowAssetGroup: bool,
  currentAssetDataOpt: option(int),

    } : SelectAssetNode.state , */
    state,
    (currentTextureComponent, node) =>
      currentTextureComponent
      === TextureNodeAssetService.getTextureComponent(node),
    (node, editorState) =>
      ImageDataMapUtils.getImgSrc(
        TextureNodeAssetService.getImageDataIndex(node),
        editorState,
      ),
    (node, engineState) =>
      NodeNameAssetLogicService.getTextureNodeName(
        ~texture=TextureNodeAssetService.getTextureComponent(node),
        ~engineState,
      ),
    sendFunc,
    findAllTextureNodesFunc,
  );