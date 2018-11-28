

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as LogUtils$WonderEditor from "../../../../utils/console/LogUtils.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as RelateGameObjectAndAssetUtils$WonderEditor from "../../../utils/RelateGameObjectAndAssetUtils.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../service/state/engine/GenerateSceneGraphEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../service/state/engine/GameObjectComponentEngineService.js";

var _isSceneGameObjectImageUint8Array = GenerateSceneGraphEngineService$WonderEditor.isUint8ArrayHasOneUint32Data;

function _isImageDataEqual(param, image2, texture2, imageUint8ArrayDataMap) {
  var uint8Array = param[3];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene gameObject->image to be undefined", "not"), (function () {
                        return Contract$WonderLog.assertTrue((image2 == null));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = SparseMapService$WonderCommonlib.get(texture2, imageUint8ArrayDataMap);
  if (match !== undefined) {
    var uint8Array2 = match[1];
    var match$1 = GenerateSceneGraphEngineService$WonderEditor.isUint8ArrayHasOneUint32Data(uint8Array2);
    if (match$1) {
      if (uint8Array !== undefined) {
        return Js_primitive.valFromOption(uint8Array).length === GenerateSceneGraphEngineService$WonderEditor.readUint32DataFromUint8Array(uint8Array2);
      } else {
        return true;
      }
    } else {
      return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be scene gameObject image uint8Array", "", "", ""));
    }
  } else {
    return true;
  }
}

function _isLightMaterialDataEqualForSceneGameObject(param, material2, imageUint8ArrayDataMap, engineState) {
  return RelateGameObjectAndAssetUtils$WonderEditor.isLightMaterialDataEqual(/* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], material2, imageUint8ArrayDataMap, (function (param, param$1, param$2, param$3) {
                return RelateGameObjectAndAssetUtils$WonderEditor.isTextureDataEqual(_isImageDataEqual, param, param$1, param$2, param$3);
              }), engineState);
}

function _replaceSceneGameObjectMaterialComponentToMaterialAsset(gameObject, defaultMaterialData, materialDataMapData, imageUint8ArrayDataMap, engineState) {
  var match = RelateGameObjectAndAssetUtils$WonderEditor.getRelatedMaterialDataFromGameObject(gameObject, SparseMapService$WonderCommonlib.createEmpty(/* () */0), imageUint8ArrayDataMap, defaultMaterialData, materialDataMapData, _isLightMaterialDataEqualForSceneGameObject, engineState);
  return RelateGameObjectAndAssetUtils$WonderEditor.replaceToMaterialAssetMaterialComponent(gameObject, /* tuple */[
              match[0],
              match[1],
              match[2]
            ], engineState);
}

function _isLightMaterialDataEqualForWDBAssetGameObject(param, material2, imageUint8ArrayDataMap, engineState) {
  return RelateGameObjectAndAssetUtils$WonderEditor.isLightMaterialDataEqual(/* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], material2, imageUint8ArrayDataMap, (function (param, param$1, param$2, param$3) {
                return RelateGameObjectAndAssetUtils$WonderEditor.isTextureDataEqual(RelateGameObjectAndAssetUtils$WonderEditor.isImageDataEqual, param, param$1, param$2, param$3);
              }), engineState);
}

function _replaceWDBAssetGameObjectMaterialComponentToMaterialAsset(gameObject, defaultMaterialData, materialDataMapData, imageUint8ArrayDataMap, engineState) {
  var match = RelateGameObjectAndAssetUtils$WonderEditor.getRelatedMaterialDataFromGameObject(gameObject, SparseMapService$WonderCommonlib.createEmpty(/* () */0), imageUint8ArrayDataMap, defaultMaterialData, materialDataMapData, _isLightMaterialDataEqualForWDBAssetGameObject, engineState);
  return RelateGameObjectAndAssetUtils$WonderEditor.replaceToMaterialAssetMaterialComponent(gameObject, /* tuple */[
              match[0],
              match[1],
              match[2]
            ], engineState);
}

function _isWdbAssetGameObjectGeometry(geometry, wdbAssetGameObjectGeometryDataArr) {
  return Js_option.isSome(Js_primitive.undefined_to_opt(wdbAssetGameObjectGeometryDataArr.find((function (param) {
                        return geometry === param[0];
                      }))));
}

function _checkGameObjectGeometryComponent(geometry, wdbAssetGameObjectGeometryDataArr) {
  return Contract$WonderLog.requireCheck((function () {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gameObject not has wdb asset gameObject->geometry", "has"), (function () {
                              return Contract$WonderLog.assertFalse(_isWdbAssetGameObjectGeometry(geometry, wdbAssetGameObjectGeometryDataArr));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
}

function _isGeometryPointDataEqual(sceneGameObjectGeometryPointsLength, points2, getLengthFunc) {
  return sceneGameObjectGeometryPointsLength === Curry._1(getLengthFunc, points2);
}

function _isGeometryDataEqualForSceneGameObjectGeometry(param, param$1, _) {
  var texCoords1 = param[3];
  var normals1 = param[2];
  var vertices1 = param[1];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene geometry data->points should only has one point data", "not"), (function () {
                        return Contract$WonderLog.assertTrue(Caml_obj.caml_equal(/* tuple */[
                                        vertices1.length,
                                        normals1.length,
                                        texCoords1.length
                                      ], /* tuple */[
                                        3,
                                        3,
                                        2
                                      ]));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  if (RelateGameObjectAndAssetUtils$WonderEditor.isGeometryNameEqual(param[0], param$1[0])) {
    var sceneGameObjectGeometryPointsLength = vertices1[0];
    if (sceneGameObjectGeometryPointsLength === param$1[1].length) {
      var sceneGameObjectGeometryPointsLength$1 = normals1[0];
      if (sceneGameObjectGeometryPointsLength$1 === param$1[2].length) {
        var sceneGameObjectGeometryPointsLength$2 = texCoords1[0];
        return sceneGameObjectGeometryPointsLength$2 === param$1[3].length;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function _replaceSceneGameObjectGeometryComponentToWDBAssetGeometryComponent(gameObject, defaultGeometryData, wdbAssetGameObjectGeometryDataArr, _, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState);
  if (match !== undefined) {
    var geometry = match;
    _checkGameObjectGeometryComponent(geometry, wdbAssetGameObjectGeometryDataArr);
    var sceneGameObjectGeometryData = RelateGameObjectAndAssetUtils$WonderEditor.getGeometryData(geometry, engineState);
    var match$1 = RelateGameObjectAndAssetUtils$WonderEditor.getTargetGeometryByJudgeDefaultGeometry(sceneGameObjectGeometryData, defaultGeometryData, RelateGameObjectAndAssetUtils$WonderEditor.isGeometryDataEqualForDefaultGeometry, engineState);
    var targetGeometry;
    if (match$1 !== undefined) {
      targetGeometry = match$1;
    } else {
      var match$2 = wdbAssetGameObjectGeometryDataArr.find((function (param) {
              return _isGeometryDataEqualForSceneGameObjectGeometry(sceneGameObjectGeometryData, param[1], engineState);
            }));
      targetGeometry = match$2 !== undefined ? match$2[0] : undefined;
    }
    return RelateGameObjectAndAssetUtils$WonderEditor.replaceGeometryComponent(gameObject, geometry, targetGeometry, engineState);
  } else {
    return engineState;
  }
}

function _getGeometryDataArr(geometryArr, engineState) {
  return geometryArr.map((function (geometry) {
                return /* tuple */[
                        geometry,
                        RelateGameObjectAndAssetUtils$WonderEditor.getGeometryData(geometry, engineState)
                      ];
              }));
}

function relateSceneWDBGameObjectsAndAssets(allWDBGameObjectsArr, imageUint8ArrayDataMap, param, wdbAssetGameObjectGeometryAssetArr) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var basicMaterialDataMap = RelateGameObjectAndAssetUtils$WonderEditor.getBasicMaterialDataMap(param[0], engineState);
  var lightMaterialDataMap = RelateGameObjectAndAssetUtils$WonderEditor.getLightMaterialDataMap(param[1], /* tuple */[
        editorState,
        engineState
      ]);
  var defaultMaterialData = RelateGameObjectAndAssetUtils$WonderEditor.getDefaultMaterialData(editorState, engineState);
  var defaultGeometryData = RelateGameObjectAndAssetUtils$WonderEditor.getDefaultGeometryData(editorState, engineState);
  var wdbAssetGameObjectGeometryDataArr = _getGeometryDataArr(wdbAssetGameObjectGeometryAssetArr, engineState);
  var engineState$1 = ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
          return _replaceSceneGameObjectGeometryComponentToWDBAssetGeometryComponent(gameObject, defaultGeometryData, wdbAssetGameObjectGeometryDataArr, editorState, _replaceSceneGameObjectMaterialComponentToMaterialAsset(gameObject, defaultMaterialData, /* tuple */[
                          basicMaterialDataMap,
                          lightMaterialDataMap
                        ], imageUint8ArrayDataMap, engineState));
        }), engineState, allWDBGameObjectsArr);
  StateEngineService$WonderEditor.setState(engineState$1);
  return Contract$WonderLog.ensureCheck((function () {
                var sceneGeometryAssets = GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(allWDBGameObjectsArr, /* tuple */[
                      editorState,
                      engineState$1
                    ]);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("wdb assets->geometry assets: " + (String(wdbAssetGameObjectGeometryAssetArr) + (" include scene wdb gameObjects->geometry assets: " + (String(sceneGeometryAssets) + ""))), "not"), (function () {
                              StateEditorService$WonderEditor.getState(/* () */0);
                              StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              return Contract$WonderLog.assertTrue(ArrayService$WonderEditor.isInclude(wdbAssetGameObjectGeometryAssetArr, sceneGeometryAssets));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), /* () */0);
}

function relateWDBAssetGameObjectsAndAssets(allWDBGameObjectsArr, param, imageUint8ArrayDataMap) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var basicMaterialDataMap = RelateGameObjectAndAssetUtils$WonderEditor.getBasicMaterialDataMap(param[0], engineState);
  var lightMaterialDataMap = RelateGameObjectAndAssetUtils$WonderEditor.getLightMaterialDataMap(param[1], /* tuple */[
        editorState,
        engineState
      ]);
  var defaultMaterialData = RelateGameObjectAndAssetUtils$WonderEditor.getDefaultMaterialData(editorState, engineState);
  var defaultGeometryData = RelateGameObjectAndAssetUtils$WonderEditor.getDefaultGeometryData(editorState, engineState);
  var engineState$1 = ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
          return RelateGameObjectAndAssetUtils$WonderEditor.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(gameObject, defaultGeometryData, _replaceWDBAssetGameObjectMaterialComponentToMaterialAsset(gameObject, defaultMaterialData, /* tuple */[
                          basicMaterialDataMap,
                          lightMaterialDataMap
                        ], imageUint8ArrayDataMap, engineState));
        }), engineState, allWDBGameObjectsArr);
  StateEngineService$WonderEditor.setState(engineState$1);
  return /* () */0;
}

export {
  _isSceneGameObjectImageUint8Array ,
  _isImageDataEqual ,
  _isLightMaterialDataEqualForSceneGameObject ,
  _replaceSceneGameObjectMaterialComponentToMaterialAsset ,
  _isLightMaterialDataEqualForWDBAssetGameObject ,
  _replaceWDBAssetGameObjectMaterialComponentToMaterialAsset ,
  _isWdbAssetGameObjectGeometry ,
  _checkGameObjectGeometryComponent ,
  _isGeometryPointDataEqual ,
  _isGeometryDataEqualForSceneGameObjectGeometry ,
  _replaceSceneGameObjectGeometryComponentToWDBAssetGeometryComponent ,
  _getGeometryDataArr ,
  relateSceneWDBGameObjectsAndAssets ,
  relateWDBAssetGameObjectsAndAssets ,
  
}
/* Log-WonderLog Not a pure module */
