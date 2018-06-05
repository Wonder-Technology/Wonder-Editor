open AssetType;

let unsafeGetNodeMap = assetRecord => assetRecord.nodeMap;

let setNodeMap = (nodeMap, assetRecord) => {...assetRecord, nodeMap};