

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GeometryEngineService$WonderEditor from "../../../state/engine/GeometryEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../../state/editor/inspector/InspectorEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeAssetEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/GameObjectEngineService.js";
import * as GeometryAssetLogicService$WonderEditor from "./GeometryAssetLogicService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as LightMaterialEngineService$WonderEditor from "../../../state/engine/LightMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../OperateTextureLogicService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeRootAssetEditorService.js";
import * as RemoveNodeAssetEditorService$WonderEditor from "../../../state/editor/asset/RemoveNodeAssetEditorService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../state/editor/asset/MaterialDataAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../state/editor/asset/MaterialNodeMapAssetEditorService.js";

function _disposeWDBGameObjects(wdbGameObjects, param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(gameObject, engineState);
              }), param[1], wdbGameObjects);
}

function _getClonedGameObjects(wdbGameObjects, param) {
  var engineState = param[1];
  return ArrayService$WonderEditor.exclude(wdbGameObjects, ArrayService$WonderCommonlib.flatten(GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(wdbGameObjects, /* tuple */[
                        param[0],
                        engineState
                      ]).map((function (geometry) {
                        return GeometryEngineService$WonderEditor.unsafeGetGeometryGameObjects(geometry, engineState);
                      }))));
}

function _removeClonedGameObjectsComponentType(clonedGameObjects, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, wdbGameObject) {
                return InspectorEditorService$WonderEditor.removeComponentTypeToMap(wdbGameObject, /* Geometry */2, editorState);
              }), editorState, clonedGameObjects);
}

function _disposeGeometryAssets(wdbGameObjects, param) {
  var engineState = param[1];
  var __x = GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(wdbGameObjects, /* tuple */[
        param[0],
        engineState
      ]);
  return GeometryEngineService$WonderEditor.batchDisposeGeometry(__x, engineState);
}

function _removeWDBTreeNode(nodeId, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState));
  var wdbGameObjects = GameObjectEngineService$WonderEditor.getAllGameObjects(match[/* wdbGameObject */3], engineState);
  var editorState$1 = _removeClonedGameObjectsComponentType(_getClonedGameObjects(wdbGameObjects, /* tuple */[
            editorState,
            engineState
          ]), editorState);
  var engineState$1 = _disposeGeometryAssets(wdbGameObjects, /* tuple */[
        editorState$1,
        engineState
      ]);
  var engineState$2 = _disposeWDBGameObjects(wdbGameObjects, /* tuple */[
        editorState$1,
        engineState$1
      ]);
  return /* tuple */[
          RemoveNodeAssetEditorService$WonderEditor.removeWDBNodeEditorData(nodeId, editorState$1),
          engineState$2
        ];
}

function _removeTextureFromAllLightMaterials(textureComponent, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, lightMaterial) {
                return OperateTextureLogicService$WonderEditor.handleLightMaterialComponentFromHasDiffuseMapToNoMap(lightMaterial, engineState);
              }), engineState, LightMaterialEngineService$WonderEditor.getAllLightMaterials(engineState).filter((function (lightMaterial) {
                    return LightMaterialEngineService$WonderEditor.isDiffuseMap(lightMaterial, textureComponent, engineState);
                  })));
}

var _removeTextureEngineData = _removeTextureFromAllLightMaterials;

function _removeTextureTreeNode(nodeId, param) {
  var editorState = param[0];
  var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState));
  var engineState = _removeTextureFromAllLightMaterials(match[/* textureComponent */0], param[1]);
  return /* tuple */[
          RemoveNodeAssetEditorService$WonderEditor.removeTextureNodeEditorData(nodeId, editorState),
          engineState
        ];
}

function _removeMaterialTreeNode(nodeId, param) {
  var editorState = param[0];
  var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(nodeId, editorState);
  var type_ = match[/* type_ */1];
  var match$1 = MaterialDataAssetEditorService$WonderEditor.unsafeGetMaterialDataByType(type_, editorState);
  var engineState = InspectorRenderGroupUtils$WonderEditor.Dispose[/* replaceGameObjectsMaterialsOfTheMaterial */3](/* tuple */[
        /* tuple */[
          match[/* materialComponent */2],
          match$1[0]
        ],
        /* tuple */[
          type_,
          match$1[1]
        ]
      ], param[1]);
  return /* tuple */[
          RemoveNodeAssetEditorService$WonderEditor.removeMaterialNodeEditorData(nodeId, editorState),
          engineState
        ];
}

function _checkRemovedTreeNodeAndGetVal(param) {
  var removedTreeNode = param[1];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("removedTreeNode should exist", "not"), (function () {
                        return Contract$WonderLog.assertTrue(Js_option.isSome(removedTreeNode));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return /* tuple */[
          ArrayService$WonderEditor.unsafeGetFirst(param[0]),
          OptionService$WonderEditor.unsafeGet(removedTreeNode)
        ];
}

function removeSpecificTreeNode(targetNodeId, assetTreeRoot) {
  var _iterateAssetTree = function (targetNodeId, assetTreeArr, newAssetTree, removedTreeNode) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, treeNode) {
                  var newAssetTree = param[0];
                  var match = TreeAssetEditorService$WonderEditor.isIdEqual(treeNode[/* nodeId */0], targetNodeId);
                  if (match) {
                    return /* tuple */[
                            newAssetTree,
                            treeNode
                          ];
                  } else {
                    var match$1 = _iterateAssetTree(targetNodeId, treeNode[/* children */1], /* array */[], param[1]);
                    return /* tuple */[
                            ArrayService$WonderEditor.push(/* record */[
                                  /* nodeId */treeNode[/* nodeId */0],
                                  /* children */match$1[0],
                                  /* type_ */treeNode[/* type_ */2],
                                  /* isShowChildren */treeNode[/* isShowChildren */3]
                                ], newAssetTree),
                            match$1[1]
                          ];
                  }
                }), /* tuple */[
                newAssetTree,
                removedTreeNode
              ], assetTreeArr);
  };
  return _checkRemovedTreeNodeAndGetVal(_iterateAssetTree(targetNodeId, /* array */[assetTreeRoot], /* array */[], undefined));
}

function _iterateRemovedTreeNode(nodeArr, removedAssetIdArr, param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var nodeId = param$1[/* nodeId */0];
                var match = param[0];
                var engineState = match[1];
                var editorState = match[0];
                var match$1;
                switch (param$1[/* type_ */2]) {
                  case 0 : 
                      match$1 = /* tuple */[
                        RemoveNodeAssetEditorService$WonderEditor.removeFolderNodeEditorData(nodeId, editorState),
                        engineState
                      ];
                      break;
                  case 1 : 
                      match$1 = _removeTextureTreeNode(nodeId, /* tuple */[
                            editorState,
                            engineState
                          ]);
                      break;
                  case 2 : 
                      match$1 = _removeWDBTreeNode(nodeId, /* tuple */[
                            editorState,
                            engineState
                          ]);
                      break;
                  case 3 : 
                      match$1 = _removeMaterialTreeNode(nodeId, /* tuple */[
                            editorState,
                            engineState
                          ]);
                      break;
                  
                }
                return _iterateRemovedTreeNode(param$1[/* children */1], ArrayService$WonderEditor.push(nodeId, param[1]), /* tuple */[
                            match$1[0],
                            match$1[1]
                          ]);
              }), /* tuple */[
              /* tuple */[
                param[0],
                param[1]
              ],
              removedAssetIdArr
            ], nodeArr);
}

function deepRemoveTreeNode(removedTreeNode, param) {
  return _iterateRemovedTreeNode(/* array */[removedTreeNode], /* array */[], /* tuple */[
              param[0],
              param[1]
            ]);
}

function deepDisposeAssetTreeRoot(param) {
  var editorState = param[0];
  var removedTreeNode = OptionService$WonderEditor.unsafeGet(TreeRootAssetEditorService$WonderEditor.getAssetTreeRoot(editorState));
  var match = deepRemoveTreeNode(removedTreeNode, /* tuple */[
        editorState,
        param[1]
      ]);
  var match$1 = match[0];
  return /* tuple */[
          RemoveNodeAssetEditorService$WonderEditor.deepDisposeAssetTreeRoot(match[1], match$1[0]),
          match$1[1]
        ];
}

export {
  _disposeWDBGameObjects ,
  _getClonedGameObjects ,
  _removeClonedGameObjectsComponentType ,
  _disposeGeometryAssets ,
  _removeWDBTreeNode ,
  _removeTextureFromAllLightMaterials ,
  _removeTextureEngineData ,
  _removeTextureTreeNode ,
  _removeMaterialTreeNode ,
  _checkRemovedTreeNodeAndGetVal ,
  removeSpecificTreeNode ,
  _iterateRemovedTreeNode ,
  deepRemoveTreeNode ,
  deepDisposeAssetTreeRoot ,
  
}
/* Log-WonderLog Not a pure module */
