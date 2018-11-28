

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GeometryEngineService$WonderEditor from "../../../state/engine/GeometryEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../../state/editor/inspector/InspectorEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/GameObjectEngineService.js";
import * as GeometryAssetLogicService$WonderEditor from "./GeometryAssetLogicService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeRootAssetEditorService.js";
import * as RemoveNodeAssetEditorService$WonderEditor from "../../../state/editor/asset/RemoveNodeAssetEditorService.js";
import * as IterateAssetTreeAssetEditorService$WonderEditor from "../../../state/editor/asset/IterateAssetTreeAssetEditorService.js";

function _disposeAllGeometryAssets(allWDBGameObjects, param) {
  var engineState = param[1];
  var __x = GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(allWDBGameObjects, /* tuple */[
        param[0],
        engineState
      ]);
  return GeometryEngineService$WonderEditor.batchDisposeGeometry(__x, engineState);
}

function _disposeWDBGameObjects(wdbGameObjects, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(gameObject, engineState);
              }), engineState, wdbGameObjects);
}

function _clearAssetNodeMap(editorState) {
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
            /* textureNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* folderNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* wdbNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* materialNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* materialNodeIdMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* imageNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
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

function deepDisposeAssetTreeRoot(param) {
  var engineState = param[1];
  var editorState = InspectorEditorService$WonderEditor.clearComponentType(param[0]);
  var allWDBGameObjects = GeometryAssetLogicService$WonderEditor.getAllWDBGameObjects(editorState, engineState);
  var engineState$1 = _disposeWDBGameObjects(allWDBGameObjects, _disposeAllGeometryAssets(allWDBGameObjects, /* tuple */[
            editorState,
            engineState
          ]));
  var editorState$1 = _clearAssetNodeMap(editorState);
  return /* tuple */[
          RemoveNodeAssetEditorService$WonderEditor.deepDisposeAssetTreeRoot(IterateAssetTreeAssetEditorService$WonderEditor.getAllChildrennNodeIds(OptionService$WonderEditor.unsafeGet(TreeRootAssetEditorService$WonderEditor.getAssetTreeRoot(editorState$1))), editorState$1),
          engineState$1
        ];
}

export {
  _disposeAllGeometryAssets ,
  _disposeWDBGameObjects ,
  _clearAssetNodeMap ,
  deepDisposeAssetTreeRoot ,
  
}
/* OptionService-WonderEditor Not a pure module */
