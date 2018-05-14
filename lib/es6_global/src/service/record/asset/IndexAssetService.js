'use strict';


function getIndex(assetRecord) {
  return assetRecord[/* index */1];
}

function setIndex(index, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */index,
          /* currentTreeNode */assetRecord[/* currentTreeNode */2],
          /* currentFile */assetRecord[/* currentFile */3],
          /* fileMap */assetRecord[/* fileMap */4]
        ];
}

export {
  getIndex ,
  setIndex ,
  
}
/* No side effect */
