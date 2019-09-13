let component = ReasonReact.statelessComponent("SelectTextureNode");

let render =
    (
      (label, title, currentAssetDataOpt, isShowTextureGroup),
      (removeTextureFunc, onDropFunc, findAllTextureNodesFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <SelectAssetNode
    label
    assetGroupHeader="Texture"
    title
    currentAssetDataOpt
    removeAssetFunc=removeTextureFunc
    findAllAssetNodesFunc=findAllTextureNodesFunc
    onDropFunc
    getCurrentAssetDataFromNodeFunc={
      node => TextureNodeAssetService.getTextureComponent(node)
    }
    getAssetImageSrcFromEngineFunc={
      (currentTextureComponent, engineState) => {
        let source =
          BasicSourceTextureEngineService.unsafeGetSource(
            currentTextureComponent,
            engineState,
          );

        ImageType.convertImageElementToSrcImageElements(source)##src;
      }
    }
    getAssetImageSrcFromEditorFunc={
      (node, editorState) =>
        ImageDataMapUtils.getImgSrc(
          TextureNodeAssetService.getImageDataIndex(node),
          editorState,
        )
    }
    isCurrentAssetFunc={
      (currentTextureComponent, node) =>
        currentTextureComponent
        === TextureNodeAssetService.getTextureComponent(node)
    }
    getAssetNodeNameByNodeFunc={
      (node, engineState) =>
        NodeNameAssetLogicService.getTextureNodeName(
          ~texture=TextureNodeAssetService.getTextureComponent(node),
          ~engineState,
        )
    }
    renderAssetNameFunc={(_, _) => ReasonReact.null}
    isShowAssetGroup=isShowTextureGroup
  />;

let make =
    (
      ~label,
      ~currentTextureComponent,
      ~onDropFunc,
      ~removeTextureFunc,
      ~findAllTextureNodesFunc,
      ~isShowTextureGroup,
      ~title,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (label, title, currentTextureComponent, isShowTextureGroup),
      (removeTextureFunc, onDropFunc, findAllTextureNodesFunc),
      self,
    ),
};