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

type textureNodeData = {
  textureComponent: int,
  imageDataIndex: int,
};

type cubemapNodeData = {
  textureComponent: int,
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

type folderNodeData = {name: string};

external convertAssetBundleTypeToInt: assetBundleType => int = "%identity";

external convertIntToAssetBundleType: int => assetBundleType = "%identity";