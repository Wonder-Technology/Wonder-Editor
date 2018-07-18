open AssetType;

let getIndex = assetState => assetState.index;

let increaseIndex = ({index} as record) => {
  ...record,
  index: index |> succ,
};