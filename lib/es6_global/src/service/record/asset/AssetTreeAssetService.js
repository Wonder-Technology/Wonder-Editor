'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getAssetTree(assetRecord) {
  return assetRecord[/* assetTree */0];
}

function unsafeGetAssetTree(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* assetTree */0]);
}

function setAssetTree(assetTree, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* assetTree */0] = /* Some */[assetTree];
  return newrecord;
}

function clearAssetTree(assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* assetTree */0] = /* None */0;
  return newrecord;
}

export {
  getAssetTree       ,
  unsafeGetAssetTree ,
  setAssetTree       ,
  clearAssetTree     ,
  
}
/* OptionService-WonderEditor Not a pure module */
