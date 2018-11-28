open AssetType;

open AssetMaterialDataType;

let getMaterialData = assetRecord => assetRecord.materialData;

let setMaterialData = (materialData, assetRecord) => {
  ...assetRecord,
  materialData,
};