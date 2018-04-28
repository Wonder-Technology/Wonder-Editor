'use strict';


function getFileMap(assetRecord) {
  return assetRecord[/* fileMap */3];
}

function setFileMap(fileMap, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode */assetRecord[/* currentTreeNode */2],
          /* fileMap */fileMap
        ];
}

export {
  getFileMap ,
  setFileMap ,
  
}
/* No side effect */
