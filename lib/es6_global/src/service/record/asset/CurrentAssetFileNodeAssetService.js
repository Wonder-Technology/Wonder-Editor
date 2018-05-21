'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentAssetFileNode(assetRecord) {
  return assetRecord[/* currentAssetFileNode */3];
}

function unsafeGetCurrentAssetFileNode(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentAssetFileNode */3]);
}

function clearCurrentAssetFileNode(assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* currentAssetFileNode */3] = /* None */0;
  return newrecord;
}

function setCurrentAssetFileNode(currentAssetFileNode, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* currentAssetFileNode */3] = /* Some */[currentAssetFileNode];
  return newrecord;
}

export {
  getCurrentAssetFileNode       ,
  unsafeGetCurrentAssetFileNode ,
  clearCurrentAssetFileNode     ,
  setCurrentAssetFileNode       ,
  
}
/* OptionService-WonderEditor Not a pure module */
