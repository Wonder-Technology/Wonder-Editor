'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentAssetTreeNode(assetRecord) {
  return assetRecord[/* currentAssetTreeNode */2];
}

function unsafeGetCurrentAssetTreeNode(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentAssetTreeNode */2]);
}

function clearCurrentAssetTreeNode(assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* currentAssetTreeNode */2] = /* None */0;
  return newrecord;
}

function setCurrentAssetTreeNode(currentAssetTreeNode, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* currentAssetTreeNode */2] = /* Some */[currentAssetTreeNode];
  return newrecord;
}

export {
  getCurrentAssetTreeNode       ,
  unsafeGetCurrentAssetTreeNode ,
  clearCurrentAssetTreeNode     ,
  setCurrentAssetTreeNode       ,
  
}
/* OptionService-WonderEditor Not a pure module */
