'use strict';


function unsafeGetFolderArray(assetRecord) {
  return assetRecord[/* folderArray */4];
}

function setFolderArray(folderArray, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* folderArray */4] = folderArray;
  return newrecord;
}

export {
  unsafeGetFolderArray ,
  setFolderArray       ,
  
}
/* No side effect */
