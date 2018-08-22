open AssetType;

let getIndex = assetRecord => assetRecord.index;

let increaseIndex = ({index} as record) => {
  ...record,
  index: index |> succ,
};

let getLastDefaultComponentIndex = assetRecord =>
  assetRecord.lastDefaultComponentIndex;

let setLastDefaultComponentIndex = (lastDefaultComponentIndex,record) => {
  ...record,
  lastDefaultComponentIndex,
};