'use strict';


function getIndex(assetRecord) {
  return assetRecord[/* index */1];
}

function setIndex(index, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* index */1] = index;
  return newrecord;
}

export {
  getIndex ,
  setIndex ,
  
}
/* No side effect */
