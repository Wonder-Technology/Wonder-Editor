open AssetType;

open GeometryDataAssetType;

let getGeometryData = assetRecord => assetRecord.geometryData;

let setGeometryData = (geometryData, assetRecord) => {
  ...assetRecord,
  geometryData,
};