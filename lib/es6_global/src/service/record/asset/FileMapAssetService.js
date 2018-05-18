'use strict';


function unsafeGetFileMap(assetRecord) {
  return assetRecord[/* fileMap */5];
}

function setFileMap(fileMap, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* fileMap */5] = fileMap;
  return newrecord;
}

export {
  unsafeGetFileMap ,
  setFileMap       ,
  
}
/* No side effect */
