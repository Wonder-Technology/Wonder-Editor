

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getNodeId(materialComponent, editorState) {
  return SparseMapService$WonderCommonlib.get(materialComponent, editorState[/* assetRecord */2][/* materialNodeIdMap */10]);
}

function setNodeId(materialComponent, nodeId, editorState) {
  var init = editorState[/* assetRecord */2];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord : record */[
            /* assetTreeRoot */init[/* assetTreeRoot */0],
            /* index */init[/* index */1],
            /* imageIndex */init[/* imageIndex */2],
            /* removedAssetIdArray */init[/* removedAssetIdArray */3],
            /* currentNodeData */init[/* currentNodeData */4],
            /* currentNodeParentId */init[/* currentNodeParentId */5],
            /* textureNodeMap */init[/* textureNodeMap */6],
            /* folderNodeMap */init[/* folderNodeMap */7],
            /* wdbNodeMap */init[/* wdbNodeMap */8],
            /* materialNodeMap */init[/* materialNodeMap */9],
            /* materialNodeIdMap */SparseMapService$WonderCommonlib.set(materialComponent, nodeId, editorState[/* assetRecord */2][/* materialNodeIdMap */10]),
            /* imageNodeMap */init[/* imageNodeMap */11],
            /* geometryData */init[/* geometryData */12],
            /* materialData */init[/* materialData */13]
          ],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function remove(materialComponent, editorState) {
  var init = editorState[/* assetRecord */2];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord : record */[
            /* assetTreeRoot */init[/* assetTreeRoot */0],
            /* index */init[/* index */1],
            /* imageIndex */init[/* imageIndex */2],
            /* removedAssetIdArray */init[/* removedAssetIdArray */3],
            /* currentNodeData */init[/* currentNodeData */4],
            /* currentNodeParentId */init[/* currentNodeParentId */5],
            /* textureNodeMap */init[/* textureNodeMap */6],
            /* folderNodeMap */init[/* folderNodeMap */7],
            /* wdbNodeMap */init[/* wdbNodeMap */8],
            /* materialNodeMap */init[/* materialNodeMap */9],
            /* materialNodeIdMap */SparseMapService$WonderEditor.immutableDeleteVal(materialComponent, editorState[/* assetRecord */2][/* materialNodeIdMap */10]),
            /* imageNodeMap */init[/* imageNodeMap */11],
            /* geometryData */init[/* geometryData */12],
            /* materialData */init[/* materialData */13]
          ],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

export {
  getNodeId ,
  setNodeId ,
  remove ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
