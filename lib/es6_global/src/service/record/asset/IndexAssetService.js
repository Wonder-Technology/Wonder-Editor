'use strict';


function getIndex(assetRecord) {
  return assetRecord[/* index */1];
}

function setIndex(index, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */index,
          /* imageMap */assetRecord[/* imageMap */2]
        ];
}

export {
  getIndex ,
  setIndex ,
  
}
/* No side effect */
