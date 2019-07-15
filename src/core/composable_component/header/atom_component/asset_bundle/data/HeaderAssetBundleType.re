open SelectTreeType;

type materialData = {
  materialComponent: int,
  snapshotImageDataIndex: int,
};

type basicSourceTextureData = Wonderjs.RABType.ResourceData.basicSourceTextureData;

type cubemapTextureData = Wonderjs.RABType.ResourceData.cubemapTextureData;

type scriptEventFunctionData = Wonderjs.RABType.ResourceData.scriptEventFunctionData;

type scriptAttributeData = Wonderjs.RABType.ResourceData.scriptAttributeData;

type assetBundleData = {
  assetBundle: Js.Typed_array.ArrayBuffer.t,
  path: string,
  type_: NodeAssetType.assetBundleType,
};

type imageData = Wonderjs.RABType.ResourceData.imageData;

type basicSourceTextureImageData = Wonderjs.RABType.ResourceData.basicSourceTextureImageData;

type basicSourceTextureImageDataMap = Wonderjs.RABType.ResourceData.basicSourceTextureImageDataMap;

type cubemapTextureImageData = Wonderjs.RABType.ResourceData.cubemapTextureImageData;

type cubemapTextureImageDataMap = Wonderjs.RABType.ResourceData.cubemapTextureImageDataMap;

external convertMaterialDataToValue: materialData => value = "%identity";

external convertValueToMaterialData: value => materialData = "%identity";

external convertGeometryComponentToValue: int => value = "%identity";

external convertValueToGeometryComponent: value => int = "%identity";

external convertBasicSourceTextureDataToValue: basicSourceTextureData => value =
  "%identity";

external convertValueToBasicSourceTextureData: value => basicSourceTextureData =
  "%identity";

external convertCubemapTextureDataToValue: cubemapTextureData => value =
  "%identity";

external convertValueToCubemapTextureData: value => cubemapTextureData =
  "%identity";

external convertScriptEventFunctionDataToValue:
  scriptEventFunctionData => value =
  "%identity";

external convertValueToScriptEventFunctionData:
  value => scriptEventFunctionData =
  "%identity";

external convertScriptAttributeDataToValue: scriptAttributeData => value =
  "%identity";

external convertValueToScriptAttributeData: value => scriptAttributeData =
  "%identity";

external convertAssetBundleDataToValue: assetBundleData => value = "%identity";

external convertValueToAssetBundleData: value => assetBundleData = "%identity";