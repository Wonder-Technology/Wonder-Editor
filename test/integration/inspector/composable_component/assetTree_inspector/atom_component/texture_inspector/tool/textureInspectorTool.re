open AssetNodeType;

let getWrapRepeatType = () =>
  Wonderjs.SourceTextureType.Repeat |> TextureTypeUtils.convertWrapToInt;

let getWrapMirroredRepeatType = () =>
  Wonderjs.SourceTextureType.Mirrored_repeat
  |> TextureTypeUtils.convertWrapToInt;

let getFilterLinearMipmapLinearType = () =>
  Wonderjs.SourceTextureType.Linear_mipmap_linear
  |> TextureTypeUtils.convertFilterToInt;

let getFilterNearestType = () =>
  Wonderjs.SourceTextureType.Nearest |> TextureTypeUtils.convertFilterToInt;

let getFilterNearestMipmapLinearType = () =>
  Wonderjs.SourceTextureType.Nearest_mipmap_linear
  |> TextureTypeUtils.convertFilterToInt;

let getTextureComponentFromCurrentNodeData = () => {
  let editorState = StateEditorService.getState();
  let {textureComponent} =
    editorState
    |> TextureNodeMapAssetEditorService.getTextureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(
         editorState
         |> CurrentNodeDataAssetEditorService.unsafeGetCurrentNodeData
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

let getMagFilterOptions = TextureFilterUtils.getMagFilterOptions;

let getMinFilterOptions = TextureFilterUtils.getMinFilterOptions;