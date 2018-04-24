open AssetType;

let unsafeGetImageMap = (assetRecord) => assetRecord.imageMap |> OptionService.unsafeGet;

let setImageMap = (imageMap, assetRecord) => {...assetRecord, imageMap: Some(imageMap)};