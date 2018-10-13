open AssetNodeType;

let getWrapRepeatType = () =>
  Wonderjs.SourceTextureType.Repeat |> TextureTypeUtils.convertWrapToInt;

let getWrapMirroredRepeatType = () =>
  Wonderjs.SourceTextureType.Mirrored_repeat
  |> TextureTypeUtils.convertWrapToInt;

let getFilterLinearMipmapLinearType = () =>
  Wonderjs.SourceTextureType.Linear_mipmap_linear
  |> TextureTypeUtils.convertFilterToInt;

let getFilterNearestMipmapLinearType = () =>
  Wonderjs.SourceTextureType.Nearest_mipmap_linear
  |> TextureTypeUtils.convertFilterToInt;

let getTextureComponentFromCurrentNodeData = () => {
  let editorState = StateEditorService.getState();
  let {textureComponent} =
    editorState
    |> AssetTextureNodeMapEditorService.getTextureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(
         editorState
         |> AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData
         |> (({currentNodeId, nodeType}) => currentNodeId),
       );
  textureComponent;
};

let changeWrapS = (textureComponent, value) =>
  TextureWrapUtils.changeWrapS(textureComponent, value);

let changeWrapT = (textureComponent, value) =>
  TextureWrapUtils.changeWrapT(textureComponent, value);

let changeMagFilter = (textureComponent, value) =>
  TextureFilterUtils.changeMagFilter(textureComponent, value);

let changeMinFilter = (textureComponent, value) =>
  TextureFilterUtils.changeMinFilter(textureComponent, value);