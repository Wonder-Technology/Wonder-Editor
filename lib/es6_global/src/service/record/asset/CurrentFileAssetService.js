'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentFile(assetRecord) {
  return assetRecord[/* currentFile */3];
}

function unsafeGetCurrentFile(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentFile */3]);
}

function clearCurrentFile(assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode */assetRecord[/* currentTreeNode */2],
          /* currentFile : None */0,
          /* fileMap */assetRecord[/* fileMap */4]
        ];
}

function setCurrentFile(currentFile, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode */assetRecord[/* currentTreeNode */2],
          /* currentFile : Some */[currentFile],
          /* fileMap */assetRecord[/* fileMap */4]
        ];
}

export {
  getCurrentFile       ,
  unsafeGetCurrentFile ,
  clearCurrentFile     ,
  setCurrentFile       ,
  
}
/* OptionService-WonderEditor Not a pure module */
