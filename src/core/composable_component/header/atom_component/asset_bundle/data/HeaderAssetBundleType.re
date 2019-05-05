open SelectTreeType;

type materialData = {
  materialComponent: int,
  imageDataIndex: int,
};

type textureData = Wonderjs.RABType.textureData;

type scriptEventFunctionData = Wonderjs.RABType.scriptEventFunctionData;

type scriptAttributeData = Wonderjs.RABType.scriptAttributeData;

type imageData = Wonderjs.RABType.imageData;

type imageDataMap = Wonderjs.RABType.imageDataMap;

external convertMaterialDataToValue: materialData => value = "%identity";

external convertValueToMaterialData: value => materialData = "%identity";

external convertGeometryComponentToValue: int => value = "%identity";

external convertValueToGeometryComponent: value => int = "%identity";

external convertTextureDataToValue: textureData => value = "%identity";

external convertValueToTextureData: value => textureData = "%identity";

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