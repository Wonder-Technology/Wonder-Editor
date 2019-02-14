

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getSelectedFolderNodeIdInAssetTree(param) {
  return param[/* selectedFolderNodeIdInAssetTree */4];
}

function unsafeGetSelectedFolderNodeIdInAssetTree(record) {
  return OptionService$WonderEditor.unsafeGet(getSelectedFolderNodeIdInAssetTree(record));
}

function clearSelectedFolderNodeIdInAssetTree(record) {
  return /* record */[
          /* nodeIndex */record[/* nodeIndex */0],
          /* imageDataMapIndex */record[/* imageDataMapIndex */1],
          /* tree */record[/* tree */2],
          /* currentNodeId */record[/* currentNodeId */3],
          /* selectedFolderNodeIdInAssetTree */undefined,
          /* imageDataMap */record[/* imageDataMap */5],
          /* geometryData */record[/* geometryData */6],
          /* materialData */record[/* materialData */7]
        ];
}

function setSelectedFolderNodeIdInAssetTree(selectedFolderNodeInAssetTree, record) {
  return /* record */[
          /* nodeIndex */record[/* nodeIndex */0],
          /* imageDataMapIndex */record[/* imageDataMapIndex */1],
          /* tree */record[/* tree */2],
          /* currentNodeId */record[/* currentNodeId */3],
          /* selectedFolderNodeIdInAssetTree */selectedFolderNodeInAssetTree,
          /* imageDataMap */record[/* imageDataMap */5],
          /* geometryData */record[/* geometryData */6],
          /* materialData */record[/* materialData */7]
        ];
}

export {
  getSelectedFolderNodeIdInAssetTree ,
  unsafeGetSelectedFolderNodeIdInAssetTree ,
  clearSelectedFolderNodeIdInAssetTree ,
  setSelectedFolderNodeIdInAssetTree ,
  
}
/* OptionService-WonderEditor Not a pure module */
