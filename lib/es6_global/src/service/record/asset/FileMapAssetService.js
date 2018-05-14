'use strict';


function unsafeGetFileMap(assetRecord) {
  return assetRecord[/* fileMap */4];
}

function setFileMap(fileMap, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode */assetRecord[/* currentTreeNode */2],
          /* currentFile */assetRecord[/* currentFile */3],
          /* fileMap */fileMap
        ];
}

export {
  unsafeGetFileMap ,
  setFileMap       ,
  
}
/* No side effect */
