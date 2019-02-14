

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentNodeId(param) {
  return param[/* currentNodeId */3];
}

function unsafeGetCurrentNodeId(record) {
  return OptionService$WonderEditor.unsafeGet(getCurrentNodeId(record));
}

function clearCurrentNodeId(record) {
  return /* record */[
          /* nodeIndex */record[/* nodeIndex */0],
          /* imageDataMapIndex */record[/* imageDataMapIndex */1],
          /* tree */record[/* tree */2],
          /* currentNodeId */undefined,
          /* selectedFolderNodeIdInAssetTree */record[/* selectedFolderNodeIdInAssetTree */4],
          /* imageDataMap */record[/* imageDataMap */5],
          /* geometryData */record[/* geometryData */6],
          /* materialData */record[/* materialData */7]
        ];
}

function setCurrentNodeId(currentNodeId, record) {
  return /* record */[
          /* nodeIndex */record[/* nodeIndex */0],
          /* imageDataMapIndex */record[/* imageDataMapIndex */1],
          /* tree */record[/* tree */2],
          /* currentNodeId */currentNodeId,
          /* selectedFolderNodeIdInAssetTree */record[/* selectedFolderNodeIdInAssetTree */4],
          /* imageDataMap */record[/* imageDataMap */5],
          /* geometryData */record[/* geometryData */6],
          /* materialData */record[/* materialData */7]
        ];
}

export {
  getCurrentNodeId ,
  unsafeGetCurrentNodeId ,
  clearCurrentNodeId ,
  setCurrentNodeId ,
  
}
/* OptionService-WonderEditor Not a pure module */
