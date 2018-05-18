'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentFile(assetRecord) {
  return assetRecord[/* currentFile */3];
}

function unsafeGetCurrentFile(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentFile */3]);
}

function clearCurrentFile(assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* currentFile */3] = /* None */0;
  return newrecord;
}

function setCurrentFile(currentFile, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* currentFile */3] = /* Some */[currentFile];
  return newrecord;
}

export {
  getCurrentFile       ,
  unsafeGetCurrentFile ,
  clearCurrentFile     ,
  setCurrentFile       ,
  
}
/* OptionService-WonderEditor Not a pure module */
