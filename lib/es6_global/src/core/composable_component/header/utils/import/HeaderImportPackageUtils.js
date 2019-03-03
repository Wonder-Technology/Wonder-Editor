

import * as Most from "most";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as AppStore$WonderEditor from "../../../../ui/store/AppStore.js";
import * as MostUtils$WonderEditor from "../../../utils/MostUtils.js";
import * as FileReader$WonderEditor from "../../../../external/FileReader.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";
import * as EventHelper$WonderEditor from "../../../../external/EventHelper.js";
import * as AllStateData$WonderEditor from "../../../../../service/stateTuple/data/AllStateData.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../utils/ui/ConsoleUtils.js";
import * as DataViewUtils$WonderEditor from "../DataViewUtils.js";
import * as OptionService$WonderEditor from "../../../../../service/primitive/OptionService.js";
import * as SceneWDBUtils$WonderEditor from "../SceneWDBUtils.js";
import * as LoadAssetUtils$WonderEditor from "../../../mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/LoadAssetUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as JobEngineService$WonderEditor from "../../../../../service/state/engine/job/JobEngineService.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/state/StateEngineService.js";
import * as ShaderEngineService$WonderEditor from "../../../../../service/state/engine/ShaderEngineService.js";
import * as StackHistoryService$WonderEditor from "../../../../../service/stateTuple/history/StackHistoryService.js";
import * as HeaderImportASBUtils$WonderEditor from "./HeaderImportASBUtils.js";
import * as PickingEditorService$WonderEditor from "../../../../../service/state/editor/picking/PickingEditorService.js";
import * as ReallocateCPUMemoryJob$WonderEditor from "../../../../job/loop/ReallocateCPUMemoryJob.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as MaterialAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/MaterialAssetLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../service/state/engine/LightMaterialEngineService.js";
import * as DisposeTreeAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/DisposeTreeAssetLogicService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as ImportPackageRelateGameObjectAndAssetUtils$WonderEditor from "./ImportPackageRelateGameObjectAndAssetUtils.js";

function _disposeAssets(param) {
  return StateLogicService$WonderEditor.getAndSetState(DisposeTreeAssetLogicService$WonderEditor.disposeTree);
}

function _readHeader(dataView) {
  var match = DataViewUtils$WonderEditor.getUint32_1(0, dataView);
  var match$1 = DataViewUtils$WonderEditor.getUint32_1(match[1], dataView);
  var match$2 = DataViewUtils$WonderEditor.getUint32_1(match$1[1], dataView);
  return /* tuple */[
          match$2[1],
          match[0],
          match$1[0],
          match$2[0]
        ];
}

function _readWPK(wpk, dataView) {
  var match = _readHeader(dataView);
  var sceneWDBByteLength = match[2];
  var byteOffset = match[0];
  return /* tuple */[
          match[1],
          wpk.slice(byteOffset, byteOffset + sceneWDBByteLength | 0),
          wpk.slice(byteOffset + BufferUtils$WonderEditor.alignedLength(sceneWDBByteLength) | 0),
          dataView
        ];
}

function _initAssetTreeRoot(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEditorService$WonderEditor.setState(TreeAssetEditorService$WonderEditor.createTree(editorState));
  StateEngineService$WonderEditor.setState(engineState);
  return /* () */0;
}

function _reInitDefaultMaterials(editorState, engineState) {
  var __x = /* array */[MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultBasicMaterial(editorState)];
  var engineState$1 = BasicMaterialEngineService$WonderEditor.reInitMaterials(__x, engineState);
  var __x$1 = /* array */[MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState)];
  return LightMaterialEngineService$WonderEditor.reInitMaterials(__x$1, engineState$1);
}

function _checkMaterial(gameObjectMaterials, type_, param) {
  var engineState = param[1];
  var editorState = param[0];
  gameObjectMaterials.sort();
  var materialAssets = MaterialNodeAssetEditorService$WonderEditor.getMaterialComponentsByType(type_, editorState);
  materialAssets.sort();
  return gameObjectMaterials.filter((function (gameObjectMaterial) {
                if (materialAssets.includes(gameObjectMaterial)) {
                  return true;
                } else {
                  return MaterialAssetLogicService$WonderEditor.isDefaultMaterial(gameObjectMaterial, type_, /* tuple */[
                              editorState,
                              engineState
                            ]);
                }
              })).length === gameObjectMaterials.length;
}

function _checkMaterials(where, gameObjects) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all " + (String(where) + "->materials should be material assets or default materials"), "not"), (function (param) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                return Contract$WonderLog.assertTrue(_checkMaterial(GameObjectEngineService$WonderEditor.getAllLightMaterials(gameObjects, engineState), /* LightMaterial */1, /* tuple */[
                                editorState,
                                engineState
                              ]) && _checkMaterial(GameObjectEngineService$WonderEditor.getAllBasicMaterials(gameObjects, engineState), /* BasicMaterial */0, /* tuple */[
                                editorState,
                                engineState
                              ]));
              }));
}

function _checkSceneMaterials(param) {
  var __x = SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  return _checkMaterials("scene gameObjects", HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function _checkWDBGameObjectMaterials(allWDBGameObjectArr) {
  return _checkMaterials("wdb gameObjects", allWDBGameObjectArr);
}

function _checkTextures(where, gameObjects) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all " + (String(where) + "->textures should be texture assets"), "not"), (function (param) {
                var gameObjectTextures = GameObjectEngineService$WonderEditor.getAllLightMaterials(gameObjects, StateEngineService$WonderEditor.unsafeGetState(/* () */0)).map((function (material) {
                            return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(material, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                          })).filter(Js_option.isSome).map(OptionService$WonderEditor.unsafeGet);
                gameObjectTextures.sort();
                var textureAssets = TextureNodeAssetEditorService$WonderEditor.getTextureComponents(StateEditorService$WonderEditor.getState(/* () */0));
                textureAssets.sort();
                return Contract$WonderLog.assertTrue(ArrayService$WonderEditor.isInclude(textureAssets, gameObjectTextures));
              }));
}

function _checkSceneTextures(param) {
  var __x = SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  return _checkTextures("scene gameObjects", HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function _checkWDBGameObjectTextures(allWDBGameObjectArr) {
  return _checkTextures("wdb gameObjects", allWDBGameObjectArr);
}

function _init(allWDBGameObjectArrRef) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState$1 = ShaderEngineService$WonderEditor.clearInitShaderCache(engineState);
  var engineState$2 = _reInitDefaultMaterials(editorState, engineState$1);
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.initGameObject(gameObject, engineState);
              }), engineState$2, ArrayService$WonderEditor.fastConcat(allWDBGameObjectArrRef[0], HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState$2), engineState$2)));
}

function _import(result) {
  StateLogicService$WonderEditor.getAndSetState(DisposeTreeAssetLogicService$WonderEditor.disposeTree);
  StateEngineService$WonderEditor.setState(ReallocateCPUMemoryJob$WonderEditor.reallocate(0.1, JobEngineService$WonderEditor.execDisposeJob(StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  _initAssetTreeRoot(/* () */0);
  StateLogicService$WonderEditor.getAndSetEditorState(PickingEditorService$WonderEditor.clearSphereShape);
  var dataView = DataViewUtils$WonderEditor.create(result);
  var match = _readWPK(result, dataView);
  var sceneWDB = match[1];
  var materialMapTupleRef = /* record */[/* contents : tuple */[
      ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
      ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
    ]];
  var asbImageUint8ArrayDataMapRef = /* record */[/* contents */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)];
  var allWDBGameObjectArrRef = /* record */[/* contents : array */[]];
  var wdbAssetGameObjectGeometryAssetArrRef = /* record */[/* contents : array */[]];
  StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return Most.map((function (param) {
                    var materialMapTuple = param[1];
                    var match = param[0];
                    var asbImageUint8ArrayDataMap = match[1];
                    var allWDBGameObjectArr = match[0];
                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                    ImportPackageRelateGameObjectAndAssetUtils$WonderEditor.relateWDBAssetGameObjectsAndAssets(allWDBGameObjectArr, materialMapTuple, asbImageUint8ArrayDataMap);
                    allWDBGameObjectArrRef[0] = allWDBGameObjectArr;
                    materialMapTupleRef[0] = materialMapTuple;
                    wdbAssetGameObjectGeometryAssetArrRef[0] = GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(allWDBGameObjectArr, /* tuple */[
                          editorState,
                          engineState
                        ]);
                    asbImageUint8ArrayDataMapRef[0] = asbImageUint8ArrayDataMap;
                    StateEditorService$WonderEditor.setState(editorState);
                    StateEngineService$WonderEditor.setState(engineState);
                    return Contract$WonderLog.ensureCheck((function (r) {
                                  _checkTextures("wdb gameObjects", allWDBGameObjectArr);
                                  return _checkMaterials("wdb gameObjects", allWDBGameObjectArr);
                                }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), /* () */0);
                  }), HeaderImportASBUtils$WonderEditor.importASB(match[2])).concat(MostUtils$WonderEditor.callStreamFunc((function (param) {
                      return Most.map((function (param) {
                                    var _sceneGameObjectImageUint8ArrayDataMap = param[1];
                                    Contract$WonderLog.requireCheck((function (param) {
                                            return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("sceneGameObjectImageUint8ArrayDataMap be empty", "not"), (function (param) {
                                                          return Contract$WonderLog.Operators[/* = */0](ImmutableSparseMapService$WonderCommonlib.length(_sceneGameObjectImageUint8ArrayDataMap), 0);
                                                        }));
                                          }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                    ImportPackageRelateGameObjectAndAssetUtils$WonderEditor.relateSceneWDBGameObjectsAndAssets(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(param[0], engineState), asbImageUint8ArrayDataMapRef[0], materialMapTupleRef[0], wdbAssetGameObjectGeometryAssetArrRef[0]);
                                    return /* () */0;
                                  }), SceneWDBUtils$WonderEditor.importSceneWDB(sceneWDB));
                    }))).concat(MostUtils$WonderEditor.callFunc((function (param) {
                    Contract$WonderLog.requireCheck((function (param) {
                            _checkSceneTextures(/* () */0);
                            return _checkSceneMaterials(/* () */0);
                          }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
                    return StateLogicService$WonderEditor.refreshEngineState(_init(allWDBGameObjectArrRef));
                  })));
}

function _handleIsRun(dispatchFunc, editorState) {
  ConsoleUtils$WonderEditor.warn("should import package when stop, but now is run!", editorState);
  return new Promise((function (resolve, reject) {
                return resolve(Curry._1(dispatchFunc, [
                                AppStore$WonderEditor.UpdateAction,
                                /* Update */[/* array */[/* NoUpdate */0]]
                              ]));
              }));
}

function _readFile(fileInfo, resolve) {
  var reader = new FileReader();
  Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
          return resolve(/* record */[
                      /* name */fileInfo[/* name */0],
                      /* type_ */LoadAssetUtils$WonderEditor.getUploadPackageType(fileInfo[/* name */0]),
                      /* result */result
                    ]);
        }));
  return LoadAssetUtils$WonderEditor.readPakckageByTypeSync(reader, fileInfo);
}

function _dispatch(dispatchFunc) {
  return Curry._1(dispatchFunc, [
              AppStore$WonderEditor.UpdateAction,
              /* Update */[/* array */[/* All */1]]
            ]);
}

function importPackage(dispatchFunc, $$event) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    return _handleIsRun(dispatchFunc, editorState);
  } else {
    EventHelper$WonderEditor.preventDefault($$event);
    var match$1 = ArrayService$WonderEditor.getFirst(Js_dict.values($$event.target.files));
    if (match$1 !== undefined) {
      var fileInfo = FileReader$WonderEditor.convertFileJsObjectToFileInfoRecord(Caml_option.valFromOption(match$1));
      return Most.drain(Most.flatMap((function (fileResult) {
                          return _import(fileResult[/* result */2]);
                        }), Most.fromPromise(new Promise((function (resolve, reject) {
                                  return _readFile(fileInfo, resolve);
                                }))))).then((function (param) {
                    StackHistoryService$WonderEditor.clearAllStack(AllStateData$WonderEditor.getHistoryState(/* () */0));
                    return Promise.resolve(_dispatch(dispatchFunc));
                  }));
    } else {
      return new Promise((function (resolve, reject) {
                    return resolve(Curry._1(dispatchFunc, [
                                    AppStore$WonderEditor.UpdateAction,
                                    /* Update */[/* array */[/* NoUpdate */0]]
                                  ]));
                  }));
    }
  }
}

export {
  _disposeAssets ,
  _readHeader ,
  _readWPK ,
  _initAssetTreeRoot ,
  _reInitDefaultMaterials ,
  _checkMaterial ,
  _checkMaterials ,
  _checkSceneMaterials ,
  _checkWDBGameObjectMaterials ,
  _checkTextures ,
  _checkSceneTextures ,
  _checkWDBGameObjectTextures ,
  _init ,
  _import ,
  _handleIsRun ,
  _readFile ,
  _dispatch ,
  importPackage ,
  
}
/* most Not a pure module */
