'use strict';


function getIndex(assetRecord) {
  return assetRecord[/* index */1];
}

function setIndex(index, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */index,
          /* currentTreeNode */assetRecord[/* currentTreeNode */2],
          /* fileMap */assetRecord[/* fileMap */3]
        ];
}

export {
  getIndex ,
  setIndex ,
  
}
/* No side effect */
