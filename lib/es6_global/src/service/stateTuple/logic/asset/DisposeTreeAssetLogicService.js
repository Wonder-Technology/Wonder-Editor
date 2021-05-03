

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as ScriptEngineService$WonderEditor from "../../../state/engine/script/ScriptEngineService.js";
import * as GeometryEngineService$WonderEditor from "../../../state/engine/GeometryEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../../state/editor/inspector/InspectorEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeAssetEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectEngineService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";
import * as GeometryAssetLogicService$WonderEditor from "./GeometryAssetLogicService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as LightMaterialEngineService$WonderEditor from "../../../state/engine/LightMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../OperateTextureLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../state/editor/asset/ImageDataMapAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../state/editor/asset/MaterialDataAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../state/engine/BasicSourceTextureEngineService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as SourceTextureCacheInspectorCanvasLogicService$WonderEditor from "../inspectorCanvas/SourceTextureCacheInspectorCanvasLogicService.js";
import * as SourceTextureCacheInspectorCanvasEditorService$WonderEditor from "../../../state/editor/inspectorCanvas/SourceTextureCacheInspectorCanvasEditorService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

function _disposeClonedGameObjectsComponentType(clonedGameObjects, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, wdbGameObject) {
                return InspectorEditorService$WonderEditor.removeComponentTypeToMap(wdbGameObject, /* Geometry */2, editorState);
              }), editorState, clonedGameObjects);
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

function _disposeTextureNodeEditorDataBeforeRemoveNode(param, engineState, editorState) {
  var imageDataIndex = param[/* imageDataIndex */1];
  var match = TextureNodeAssetEditorService$WonderEditor.doesAnyTextureUseImage(imageDataIndex, editorState);
  var editorState$1 = match ? editorState : ImageDataMapAssetEditorService$WonderEditor.removeData(imageDataIndex, editorState);
  return SourceTextureCacheInspectorCanvasLogicService$WonderEditor.removeCache(param[/* textureComponent */0], engineState, editorState$1);
}

function _disposeMaterialNodeEditorDataBeforeRemoveNode(param, editorState) {
  return ImageDataMapAssetEditorService$WonderEditor.removeData(param[/* imageDataIndex */2], editorState);
}

function _disposeWDBNodeEditorDataBeforeRemoveNode(param, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var wdbGameObjects = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(param[/* wdbGameObject */1], engineState);
  return _disposeClonedGameObjectsComponentType(_getClonedGameObjects(wdbGameObjects, /* tuple */[
                  editorState,
                  engineState
                ]), editorState);
}

function _disposeNodeEditorDataBeforeRemoveNode(node, engineState, editorState) {
  return NodeAssetService$WonderEditor.handleNode(node, (function (param, nodeData) {
                return _disposeTextureNodeEditorDataBeforeRemoveNode(nodeData, engineState, editorState);
              }), (function (param, nodeData) {
                return _disposeMaterialNodeEditorDataBeforeRemoveNode(nodeData, editorState);
              }), (function (param, param$1) {
                return editorState;
              }), (function (param, param$1) {
                return editorState;
              }), (function (param, nodeData) {
                return _disposeWDBNodeEditorDataBeforeRemoveNode(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (param, param$1) {
                return editorState;
              }), (function (param, param$1, param$2) {
                return editorState;
              }));
}

function _disposeTextureFromAllLightMaterials(textureComponent, engineState) {
  return BasicSourceTextureEngineService$WonderEditor.disposeBasicSourceTexture(textureComponent, false, ArrayService$WonderCommonlib.reduceOneParam((function (engineState, lightMaterial) {
                    return OperateTextureLogicService$WonderEditor.handleLightMaterialComponentFromHasDiffuseMapToNoMap(lightMaterial, engineState);
                  }), engineState, LightMaterialEngineService$WonderEditor.getAllLightMaterials(engineState).filter((function (lightMaterial) {
                        return LightMaterialEngineService$WonderEditor.isDiffuseMap(lightMaterial, textureComponent, engineState);
                      }))));
}

function _disposeGeometryAssets(wdbGameObjects, param) {
  var engineState = param[1];
  var __x = GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(wdbGameObjects, /* tuple */[
        param[0],
        engineState
      ]);
  return GeometryEngineService$WonderEditor.batchDisposeGeometry(__x, engineState);
}

function _disposeWDBGameObjects(wdbGameObjects, param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(gameObject, engineState);
              }), param[1], wdbGameObjects);
}

function _disposeTextureNodeEngineData(param, engineState) {
  return _disposeTextureFromAllLightMaterials(param[/* textureComponent */0], engineState);
}

function _disposeMaterialNodeEngineData(param, param$1) {
  var type_ = param[/* type_ */0];
  var match = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultMaterialDataByType(type_, param$1[0]);
  return InspectorRenderGroupUtils$WonderEditor.Dispose[/* disposeMaterialOrReplaceGameObjectsMaterialsOfTheMaterial */4](/* tuple */[
              /* tuple */[
                param[/* materialComponent */1],
                match[0]
              ],
              /* tuple */[
                type_,
                match[1]
              ]
            ], param$1[1]);
}

function _disposeWDBNodeEngineData(param, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var wdbGameObjects = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(param[/* wdbGameObject */1], engineState);
  var engineState$1 = _disposeGeometryAssets(wdbGameObjects, /* tuple */[
        editorState,
        engineState
      ]);
  return _disposeWDBGameObjects(wdbGameObjects, /* tuple */[
              editorState,
              engineState$1
            ]);
}

function _removeScriptEventFunctionFromScriptComponents(param, engineState) {
  return ScriptEngineService$WonderEditor.removeEventFunctionInAllScriptComponents(param[/* name */0], engineState);
}

function _removeScriptAttributeFromScriptComponents(param, engineState) {
  return ScriptEngineService$WonderEditor.removeAttributeInAllScriptComponents(param[/* name */0], engineState);
}

function _disposeNodeEngineData(node, editorState, engineState) {
  return NodeAssetService$WonderEditor.handleNode(node, (function (param, nodeData) {
                return _disposeTextureNodeEngineData(nodeData, engineState);
              }), (function (param, nodeData) {
                return _disposeMaterialNodeEngineData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (param, nodeData) {
                return _removeScriptEventFunctionFromScriptComponents(nodeData, engineState);
              }), (function (param, nodeData) {
                return _removeScriptAttributeFromScriptComponents(nodeData, engineState);
              }), (function (param, nodeData) {
                return _disposeWDBNodeEngineData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (param, nodeData) {
                return engineState;
              }), (function (param, param$1, param$2) {
                return engineState;
              }));
}

function disposeNode(node, param) {
  var engineState = param[1];
  var editorState = OperateTreeAssetEditorService$WonderEditor.removeNode(node, _disposeNodeEditorDataBeforeRemoveNode(node, engineState, param[0]));
  var engineState$1 = _disposeNodeEngineData(node, editorState, engineState);
  return /* tuple */[
          editorState,
          engineState$1
        ];
}

function _disposeTreeEditorData(engineState, editorState) {
  return IterateTreeAssetService$WonderEditor.fold((function (editorState, param, param$1, param$2) {
                return editorState;
              }), editorState, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, undefined, undefined, (function (editorState, param, nodeData) {
                return editorState;
              }), (function (editorState, param, nodeData) {
                return editorState;
              }), (function (editorState, param, nodeData) {
                return _disposeWDBNodeEditorDataBeforeRemoveNode(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (editorState, param, nodeData) {
                return editorState;
              }), /* () */0);
}

function _disposeTreeEngineData(editorState, engineState) {
  return IterateTreeAssetService$WonderEditor.fold((function (engineState, param, param$1, param$2) {
                return engineState;
              }), engineState, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, (function (engineState, param, nodeData) {
                return _disposeTextureNodeEngineData(nodeData, engineState);
              }), (function (engineState, param, nodeData) {
                return _disposeMaterialNodeEngineData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (engineState, param, nodeData) {
                return _removeScriptEventFunctionFromScriptComponents(nodeData, engineState);
              }), (function (engineState, param, nodeData) {
                return _removeScriptAttributeFromScriptComponents(nodeData, engineState);
              }), (function (engineState, param, nodeData) {
                return _disposeWDBNodeEngineData(nodeData, /* tuple */[
                            editorState,
                            engineState
                          ]);
              }), (function (engineState, param, nodeData) {
                return engineState;
              }), /* () */0);
}

function disposeTree(param) {
  var engineState = param[1];
  var editorState = _disposeTreeEditorData(engineState, param[0]);
  var engineState$1 = _disposeTreeEngineData(editorState, engineState);
  return /* tuple */[
          CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(ImageDataMapAssetEditorService$WonderEditor.clearMap(TreeAssetEditorService$WonderEditor.clearTree(SourceTextureCacheInspectorCanvasEditorService$WonderEditor.clearCache(editorState))))),
          engineState$1
        ];
}

export {
  _disposeClonedGameObjectsComponentType ,
  _getClonedGameObjects ,
  _disposeTextureNodeEditorDataBeforeRemoveNode ,
  _disposeMaterialNodeEditorDataBeforeRemoveNode ,
  _disposeWDBNodeEditorDataBeforeRemoveNode ,
  _disposeNodeEditorDataBeforeRemoveNode ,
  _disposeTextureFromAllLightMaterials ,
  _disposeGeometryAssets ,
  _disposeWDBGameObjects ,
  _disposeTextureNodeEngineData ,
  _disposeMaterialNodeEngineData ,
  _disposeWDBNodeEngineData ,
  _removeScriptEventFunctionFromScriptComponents ,
  _removeScriptAttributeFromScriptComponents ,
  _disposeNodeEngineData ,
  disposeNode ,
  _disposeTreeEditorData ,
  _disposeTreeEngineData ,
  disposeTree ,
  
}
/* ArrayService-WonderEditor Not a pure module */
