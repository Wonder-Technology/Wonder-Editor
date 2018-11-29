

import * as Most from "most";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as AppStore$WonderEditor from "../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as MostUtils$WonderEditor from "../../../utils/MostUtils.js";
import * as FileReader$WonderEditor from "../../../../external/FileReader.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";
import * as AllStateData$WonderEditor from "../../../../../service/stateTuple/data/AllStateData.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../utils/ui/ConsoleUtils.js";
import * as DataViewUtils$WonderEditor from "../DataViewUtils.js";
import * as OptionService$WonderEditor from "../../../../../service/primitive/OptionService.js";
import * as SceneWDBUtils$WonderEditor from "../SceneWDBUtils.js";
import * as AssetTreeUtils$WonderEditor from "../../../mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/utils/AssetTreeUtils.js";
import * as LoadAssetUtils$WonderEditor from "../../../mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/LoadAssetUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SceneGraphUtils$WonderEditor from "../../../mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as JobEngineService$WonderEditor from "../../../../../service/state/engine/JobEngineService.js";
import * as SparseMapService$WonderEditor from "../../../../../service/atom/SparseMapService.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/StateEngineService.js";
import * as ShaderEngineService$WonderEditor from "../../../../../service/state/engine/ShaderEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as StackHistoryService$WonderEditor from "../../../../../service/stateTuple/history/StackHistoryService.js";
import * as HeaderImportASBUtils$WonderEditor from "./HeaderImportASBUtils.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../service/state/engine/GameObjectEngineService.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../service/state/engine/LightMaterialEngineService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as ReallocateCPUMemoryJobUtils$WonderEditor from "../../../../utils/engine/job/ReallocateCPUMemoryJobUtils.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as RemoveWholeAssetTreeAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/RemoveWholeAssetTreeAssetLogicService.js";
import * as ImportPackageRelateGameObjectAndAssetUtils$WonderEditor from "./ImportPackageRelateGameObjectAndAssetUtils.js";

function _disposeAssets() {
  return StateLogicService$WonderEditor.getAndSetStateToGetData(RemoveWholeAssetTreeAssetLogicService$WonderEditor.deepDisposeAssetTreeRoot);
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

function _initAssetTreeRoot() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = AssetTreeUtils$WonderEditor.initRootAssetTree(editorState, engineState);
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(match[0], match[1]));
  StateEngineService$WonderEditor.setState(engineState);
  return /* () */0;
}

function _reInitDefaultMaterials(editorState, engineState) {
  var __x = /* array */[MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultBasicMaterial(editorState)];
  var engineState$1 = BasicMaterialEngineService$WonderEditor.reInitMaterials(__x, engineState);
  var __x$1 = /* array */[MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState)];
  return LightMaterialEngineService$WonderEditor.reInitMaterials(__x$1, engineState$1);
}

function _checkSceneTextures() {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all scene gameObjects->textures should be texture assets", "not"), (function () {
                var __x = SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                var sceneTextures = GameObjectEngineService$WonderEditor.getAllLightMaterials(GameObjectEngineService$WonderEditor.getAllGameObjects(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).map((function (material) {
                            return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(material, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                          })).filter(Js_option.isSome).map(OptionService$WonderEditor.unsafeGet);
                sceneTextures.sort();
                var textureAssets = TextureNodeMapAssetEditorService$WonderEditor.getTextureComponents(StateEditorService$WonderEditor.getState(/* () */0));
                textureAssets.sort();
                return Contract$WonderLog.assertTrue(ArrayService$WonderEditor.isInclude(textureAssets, sceneTextures));
              }));
}

function _init(allWDBGameObjectsArrRef) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState$1 = ShaderEngineService$WonderEditor.clearShaderCache(engineState);
  var engineState$2 = _reInitDefaultMaterials(editorState, engineState$1);
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.initGameObject(gameObject, engineState);
              }), engineState$2, ArrayService$WonderEditor.fastConcat(allWDBGameObjectsArrRef[0], GameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState$2), engineState$2)));
}

function _import(result) {
  StateLogicService$WonderEditor.getAndSetStateToGetData(RemoveWholeAssetTreeAssetLogicService$WonderEditor.deepDisposeAssetTreeRoot);
  StateEngineService$WonderEditor.setState(ReallocateCPUMemoryJobUtils$WonderEditor.reallocate(0.1, JobEngineService$WonderEditor.execDisposeJob(StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  _initAssetTreeRoot(/* () */0);
  var dataView = DataViewUtils$WonderEditor.create(result);
  var match = _readWPK(result, dataView);
  var sceneWDB = match[1];
  var materialMapTupleRef = /* record */[/* contents : tuple */[
      SparseMapService$WonderCommonlib.createEmpty(/* () */0),
      SparseMapService$WonderCommonlib.createEmpty(/* () */0)
    ]];
  var imageUint8ArrayDataMapRef = /* record */[/* contents */SparseMapService$WonderCommonlib.createEmpty(/* () */0)];
  var allWDBGameObjectsArrRef = /* record */[/* contents : array */[]];
  var wdbAssetGameObjectGeometryAssetArrRef = /* record */[/* contents : array */[]];
  StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return Most.map((function (param) {
                    var materialMapTuple = param[1];
                    var match = param[0];
                    var imageUint8ArrayDataMap = match[1];
                    var allWDBGameObjectsArr = match[0];
                    ImportPackageRelateGameObjectAndAssetUtils$WonderEditor.relateWDBAssetGameObjectsAndAssets(allWDBGameObjectsArr, materialMapTuple, imageUint8ArrayDataMap);
                    allWDBGameObjectsArrRef[0] = allWDBGameObjectsArr;
                    materialMapTupleRef[0] = materialMapTuple;
                    wdbAssetGameObjectGeometryAssetArrRef[0] = StateLogicService$WonderEditor.getStateToGetData((function (param) {
                            return GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(allWDBGameObjectsArr, param);
                          }));
                    imageUint8ArrayDataMapRef[0] = imageUint8ArrayDataMap;
                    return /* () */0;
                  }), HeaderImportASBUtils$WonderEditor.importASB(match[2])).concat(MostUtils$WonderEditor.callStreamFunc((function () {
                      return Most.map((function (param) {
                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                    ImportPackageRelateGameObjectAndAssetUtils$WonderEditor.relateSceneWDBGameObjectsAndAssets(GameObjectEngineService$WonderEditor.getAllGameObjects(param[0], engineState), SparseMapService$WonderEditor.mergeSparseMaps(/* array */[
                                              imageUint8ArrayDataMapRef[0],
                                              param[1]
                                            ]), materialMapTupleRef[0], wdbAssetGameObjectGeometryAssetArrRef[0]);
                                    return /* () */0;
                                  }), SceneWDBUtils$WonderEditor.importSceneWDB(sceneWDB));
                    }))).concat(MostUtils$WonderEditor.callFunc((function () {
                    Contract$WonderLog.requireCheck((function () {
                            return _checkSceneTextures(/* () */0);
                          }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
                    return StateLogicService$WonderEditor.refreshEngineState(_init(allWDBGameObjectsArrRef));
                  })));
}

function _handleIsRun(dispatchFunc, editorState) {
  ConsoleUtils$WonderEditor.warn("should import package when stop, but now is run!", editorState);
  return new Promise((function (resolve, _) {
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
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[StateLogicService$WonderEditor.getStateToGetData(SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine)]
      ]);
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
    DomHelper$WonderEditor.preventDefault($$event);
    var match$1 = ArrayService$WonderEditor.getFirst(Js_dict.values($$event.target.files));
    if (match$1 !== undefined) {
      var fileInfo = FileReader$WonderEditor.convertFileJsObjectToFileInfoRecord(Js_primitive.valFromOption(match$1));
      return Most.drain(Most.flatMap((function (fileResult) {
                          return _import(fileResult[/* result */2]);
                        }), Most.fromPromise(new Promise((function (resolve, _) {
                                  return _readFile(fileInfo, resolve);
                                }))))).then((function () {
                    StackHistoryService$WonderEditor.clearAllStack(AllStateData$WonderEditor.getHistoryState(/* () */0));
                    return Promise.resolve(_dispatch(dispatchFunc));
                  }));
    } else {
      return new Promise((function (resolve, _) {
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
  _checkSceneTextures ,
  _init ,
  _import ,
  _handleIsRun ,
  _readFile ,
  _dispatch ,
  importPackage ,
  
}
/* most Not a pure module */
