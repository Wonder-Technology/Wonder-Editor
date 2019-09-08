exception LoadAssetException(string);

type uploadAssetFileType =
  | LoadWDB
  | LoadGLB
  | LoadZip
  | LoadGLTFZip
  | LoadTexture
  | LoadAssetBundle
  | LoadError(string);

type uploadAssetFileResultType = {
  name: string,
  type_: uploadAssetFileType,
  result: FileReader.resultType,
};

type nodeId = int;

type wdbNodeData = {
  name: string,
  wdbGameObject: int,
  imageDataIndex: int,
};

type textureContentIndex = int;

type imguiCustomImageTextureContent = {
  id: WonderImgui.ExtendType.customImageId,
};

type imguiCustomImageTextureContentMap =
  WonderCommonlib.ImmutableSparseMapService.t(imguiCustomImageTextureContent);

type textureType =
  | BasicSource
  | IMGUICustomImage;

type textureNodeData = {
  type_: textureType,
  textureContentIndex: option(textureContentIndex),
  textureComponent: Wonderjs.BasicSourceTextureType.basicSourceTexture,
  imageDataIndex: ImageDataType.basicSourceTextureImageDataIndex,
};

type cubemapNodeData = {
  textureComponent: int,
  imageDataIndex: ImageDataType.cubemapTextureImageDataIndex,
  /* pxImageDataIndex: option(int),
     nxImageDataIndex: option(int),
     pyImageDataIndex: option(int),
     nyImageDataIndex: option(int),
     pzImageDataIndex: option(int),
     nzImageDataIndex: option(int), */
};

type materialNodeData = {
  type_: MaterialDataAssetType.materialType,
  materialComponent: int,
  snapshotImageDataIndex: int,
};

type scriptEventFunctionNodeData = {
  name: string,
  eventFunctionData: Wonderjs.StateDataMainType.eventFunctionData,
};

type scriptAttributeNodeData = {
  name: string,
  attribute: Wonderjs.ScriptAttributeType.scriptAttribute,
};

type assetBundleType =
  | RAB
  | SAB
  | WAB;

type assetBundleNodeData = {
  name: string,
  type_: assetBundleType,
  assetBundle: Js.Typed_array.ArrayBuffer.t,
};

type imguiExecFuncDataNodeData = {
  name: string,
  execFuncData: Wonderjs.ExecIMGUIType.execFuncData,
};

type imguiSkinNodeData = {
  name: string,
  singleSkinData: WonderImgui.SkinType.singleSkinData,
};

type imguiCustomControlNodeData = {
  name: string,
  customControlFunc: Wonderjs.ExtendIMGUIType.customControlFunc,
};

type fntNodeData = {
  name: string,
  fntContent: string,
};

type folderNodeData = {name: string};

external convertTextureTypeToInt: textureType => int = "%identity";

external convertIntToTextureType: int => textureType = "%identity";

external convertAssetBundleTypeToInt: assetBundleType => int = "%identity";

external convertIntToAssetBundleType: int => assetBundleType = "%identity";