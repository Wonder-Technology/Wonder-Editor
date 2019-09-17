let component = ReasonReact.statelessComponent("SelectTextureNode");

let render =
    (
      (
        label,
        title,
        assetGroupHeader,
        currentAssetDataOpt,
        isShowTextureGroup,
      ),
      (removeTextureFunc, onDropFunc, findAllTextureNodesFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <SelectAssetByImage
    label
    assetGroupHeader
    title
    currentAssetDataOpt={
      currentAssetDataOpt
      |> Js.Option.map((. currentAssetData) =>
           currentAssetData |> SelectAssetByImage.convertIntToAssetDataType
         )
    }
    removeAssetFunc=removeTextureFunc
    findAllAssetRelatedDataFunc=findAllTextureNodesFunc
    onDropFunc
    getCurrentAssetDataFromNodeFunc={
      node =>
        TextureNodeAssetService.getTextureComponent(node)
        |> SelectAssetByImage.convertIntToAssetDataType
    }
    getCurrentAssetImageSrcFunc={
      (currentTextureComponent, (_, engineState)) =>
        SelectAssetNodeUtils.getImageSrc(
          currentTextureComponent |> SelectAssetByImage.convertAssetDataTypeToInt,
          engineState,
        )
    }
    getAssetGroupSingleAssetImageSrcFunc={
      (node, (editorState, engineState)) =>
        ImageDataMapUtils.getImgSrc(
          TextureNodeAssetService.getImageDataIndex(node),
          editorState,
        )
    }
    isCurrentAssetFunc={
      (currentTextureComponent, node) =>
        currentTextureComponent
        |> SelectAssetByImage.convertAssetDataTypeToInt
        === TextureNodeAssetService.getTextureComponent(node)
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
      ~assetGroupHeader="Texture",
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (
        label,
        title,
        assetGroupHeader,
        currentTextureComponent,
        isShowTextureGroup,
      ),
      (removeTextureFunc, onDropFunc, findAllTextureNodesFunc),
      self,
    ),
};