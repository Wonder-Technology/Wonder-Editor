
open AssetType;

open AssetGeometryDataType;

let getGeometryData = assetRecord => assetRecord.geometryData;

let setGeometryData = (geometryData, assetRecord) => {
  ...assetRecord,
  geometryData: geometryData,
};