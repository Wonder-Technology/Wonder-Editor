open AssetType;

let unsafeGetAssetTree = (assetRecord) => assetRecord.assetTree |> OptionService.unsafeGet;

let setAssetTree = (assetTree, assetRecord) => {...assetRecord, assetTree: Some(assetTree)};