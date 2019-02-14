open AssetType;

open MaterialDataAssetType;

let getMaterialData = assetRecord => assetRecord.materialData;

let setMaterialData = (materialData, assetRecord) => {
  ...assetRecord,
  materialData,
};