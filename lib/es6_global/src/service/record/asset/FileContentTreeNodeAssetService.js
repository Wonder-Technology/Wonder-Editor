'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getFileContentTreeNode(assetRecord) {
  return assetRecord[/* fileContentTreeNode */3];
}

function unsafeGetFileContentTreeNode(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* fileContentTreeNode */3]);
}

function clearFileContentTreeNode(assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* fileContentTreeNode */3] = /* None */0;
  return newrecord;
}

function setFileContentTreeNode(fileContentTreeNode, assetRecord) {
  var newrecord = assetRecord.slice();
  newrecord[/* fileContentTreeNode */3] = /* Some */[fileContentTreeNode];
  return newrecord;
}

export {
  getFileContentTreeNode       ,
  unsafeGetFileContentTreeNode ,
  clearFileContentTreeNode     ,
  setFileContentTreeNode       ,
  
}
/* OptionService-WonderEditor Not a pure module */
