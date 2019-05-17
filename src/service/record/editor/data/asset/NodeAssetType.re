exception LoadException(string);

type uploadFileType =
  | LoadWDB
  | LoadGLB
  | LoadGLTFZip
  | LoadTexture
  | LoadAssetBundle
  | LoadWPK
  | LoadError;

type nodeResultType = {
  name: string,
  type_: uploadFileType,
  result: FileReader.resultType,
};

type nodeId = int;

type wdbNodeData = {
  name: string,
  wdbGameObject: int,
  /* imageDataIndex: int, */
};

type textureNodeData = {
  textureComponent: int,
  imageDataIndex: int,
};

type materialNodeData = {
  type_: MaterialDataAssetType.materialType,
  materialComponent: int,
  imageDataIndex: int,
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