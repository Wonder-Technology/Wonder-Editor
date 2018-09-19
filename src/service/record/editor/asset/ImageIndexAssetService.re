open AssetType;

let getImageIndex = assetRecord => assetRecord.imageIndex;

let increaseImageIndex = ({imageIndex} as record) => {
  ...record,
  imageIndex: imageIndex |> succ,
};
