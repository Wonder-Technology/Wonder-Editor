open AssetType;

let getAssetTree = (assetRecord) => assetRecord.assetTree;

let unsafeGetAssetTree = (assetRecord) => assetRecord.assetTree |> OptionService.unsafeGet;

let setAssetTree = (assetTree, assetRecord) => {...assetRecord, assetTree: Some(assetTree)};

let clearAssetTree = (assetRecord) => {...assetRecord, assetTree: None};