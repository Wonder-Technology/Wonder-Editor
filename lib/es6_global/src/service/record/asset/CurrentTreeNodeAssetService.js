'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentTreeNode(assetRecord) {
  return assetRecord[/* currentTreeNode */2];
}

function unsafeGetCurrentTreeNode(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentTreeNode */2]);
}

function clearCurrentTreeNode(assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* currentTreeNode */2] = /* None */0;
  return newrecord;
}

function setCurrentTreeNode(currentTreeNode, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* currentTreeNode */2] = /* Some */[currentTreeNode];
  return newrecord;
}

export {
  getCurrentTreeNode       ,
  unsafeGetCurrentTreeNode ,
  clearCurrentTreeNode     ,
  setCurrentTreeNode       ,
  
}
/* OptionService-WonderEditor Not a pure module */
