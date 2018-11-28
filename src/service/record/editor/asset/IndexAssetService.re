open AssetType;

let getIndex = assetRecord => assetRecord.index;

let increaseIndex = ({index} as record) => {
  ...record,
  index: index |> succ,
};
