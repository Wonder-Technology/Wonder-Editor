

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as LogUtils$WonderEditor from "../../../../utils/console/LogUtils.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/state/StateEngineService.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../service/state/engine/GenerateSceneGraphEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as RelateGameObjectAndTextureAssetUtils$WonderEditor from "../../../utils/RelateGameObjectAndTextureAssetUtils.js";
import * as RelateGameObjectAndGeometryAssetUtils$WonderEditor from "../../../utils/RelateGameObjectAndGeometryAssetUtils.js";
import * as RelateGameObjectAndMaterialAssetUtils$WonderEditor from "../../../utils/RelateGameObjectAndMaterialAssetUtils.js";

var _isImageUint8ArrayWhichHasLengthData = GenerateSceneGraphEngineService$WonderEditor.isUint8ArrayHasOneUint32Data;

function _isImageUint8ArrayWhichHasLengthDataEqual(imageUint8ArrayWhichHasLengthData, uint8Array) {
  if (uint8Array !== undefined) {
    return Caml_option.valFromOption(uint8Array).length === GenerateSceneGraphEngineService$WonderEditor.readUint32DataFromUint8Array(imageUint8ArrayWhichHasLengthData);
  } else {
    return true;
  }
}

function _isImageDataEqual(param, image2, texture2, imageUint8ArrayDataMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gameObject->image to be nullable", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue((image2 == null));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = ImmutableSparseMapService$WonderCommonlib.get(texture2, imageUint8ArrayDataMap);
  if (match !== undefined) {
    var uint8Array2 = match[1];
    var match$1 = GenerateSceneGraphEngineService$WonderEditor.isUint8ArrayHasOneUint32Data(uint8Array2);
    if (match$1) {
      return _isImageUint8ArrayWhichHasLengthDataEqual(uint8Array2, param[3]);
    } else {
      return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be image uint8Array which has length data", "", "", ""));
    }
  } else {
    return true;
  }
}

function _isLightMaterialDataEqualForSceneGameObject(param, material2, imageUint8ArrayDataMap, engineState) {
  return RelateGameObjectAndMaterialAssetUtils$WonderEditor.isLightMaterialDataEqual(/* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], material2, /* tuple */[
              imageUint8ArrayDataMap,
              (function (param, param$1, param$2, param$3) {
                  return RelateGameObjectAndTextureAssetUtils$WonderEditor.isTextureDataEqual(_isImageDataEqual, param, param$1, param$2, param$3);
                }),
              engineState
            ]);
}

function _replaceGameObjectMaterialComponentToMaterialAsset(gameObject, param, isLightMaterialDataEqualFunc, engineState) {
  var match = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getRelatedMaterialDataFromGameObject(gameObject, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), param[2], param[0], param[1], isLightMaterialDataEqualFunc, engineState);
  return RelateGameObjectAndMaterialAssetUtils$WonderEditor.replaceToMaterialAssetMaterialComponent(gameObject, /* tuple */[
              match[0],
              match[1],
              match[2]
            ], engineState);
}

function _replaceSceneGameObjectMaterialComponentToMaterialAsset(gameObject, param, engineState) {
  return _replaceGameObjectMaterialComponentToMaterialAsset(gameObject, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], _isLightMaterialDataEqualForSceneGameObject, engineState);
}

function _isLightMaterialDataEqualForWDBAssetGameObject(param, material2, imageUint8ArrayDataMap, engineState) {
  return RelateGameObjectAndMaterialAssetUtils$WonderEditor.isLightMaterialDataEqual(/* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], material2, /* tuple */[
              imageUint8ArrayDataMap,
              (function (param, param$1, param$2, param$3) {
                  return RelateGameObjectAndTextureAssetUtils$WonderEditor.isTextureDataEqual(_isImageDataEqual, param, param$1, param$2, param$3);
                }),
              engineState
            ]);
}

function _replaceWDBAssetGameObjectMaterialComponentToMaterialAsset(gameObject, param, engineState) {
  return _replaceGameObjectMaterialComponentToMaterialAsset(gameObject, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], _isLightMaterialDataEqualForWDBAssetGameObject, engineState);
}

function _isWdbAssetGameObjectGeometry(geometry, wdbAssetGameObjectGeometryDataArr) {
  return Js_option.isSome(Caml_option.undefined_to_opt(wdbAssetGameObjectGeometryDataArr.find((function (param) {
                        return geometry === param[0];
                      }))));
}

function _checkGameObjectGeometryComponent(geometry, wdbAssetGameObjectGeometryDataArr) {
  return Contract$WonderLog.requireCheck((function (param) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gameObject not has wdb asset gameObject->geometry", "has"), (function (param) {
                              return Contract$WonderLog.assertFalse(_isWdbAssetGameObjectGeometry(geometry, wdbAssetGameObjectGeometryDataArr));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
}

function _isGeometryPointDataEqual(sceneGameObjectGeometryPointsLength, points2, getLengthFunc) {
  return sceneGameObjectGeometryPointsLength === Curry._1(getLengthFunc, points2);
}

function _getSceneGameObjectGeometryPointsLength(points) {
  return points[0];
}

function _isGeometryDataEqualForSceneGameObjectGeometry(param, param$1, engineState) {
  var texCoords1 = param[3];
  var normals1 = param[2];
  var vertices1 = param[1];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene geometry data->points should only has one point data", "not"), (function (param) {
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
  if (RelateGameObjectAndGeometryAssetUtils$WonderEditor.isGeometryNameEqual(param[0], param$1[0])) {
    var sceneGameObjectGeometryPointsLength = _getSceneGameObjectGeometryPointsLength(vertices1);
    if (sceneGameObjectGeometryPointsLength === param$1[1].length) {
      var sceneGameObjectGeometryPointsLength$1 = _getSceneGameObjectGeometryPointsLength(normals1);
      if (sceneGameObjectGeometryPointsLength$1 === param$1[2].length) {
        var sceneGameObjectGeometryPointsLength$2 = _getSceneGameObjectGeometryPointsLength(texCoords1);
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

function _findWDBAssetGameObjectGeometry(sceneGameObjectGeometryData, wdbAssetGameObjectGeometryDataArr, engineState) {
  var match = wdbAssetGameObjectGeometryDataArr.find((function (param) {
          return _isGeometryDataEqualForSceneGameObjectGeometry(sceneGameObjectGeometryData, param[1], engineState);
        }));
  if (match !== undefined) {
    return Caml_option.some(match[0]);
  }
  
}

function _replaceSceneGameObjectGeometryComponentToWDBAssetGeometryComponent(gameObject, param, editorState, engineState) {
  var wdbAssetGameObjectGeometryDataArr = param[1];
  var match = GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState);
  if (match !== undefined) {
    var geometry = match;
    _checkGameObjectGeometryComponent(geometry, wdbAssetGameObjectGeometryDataArr);
    var sceneGameObjectGeometryData = RelateGameObjectAndGeometryAssetUtils$WonderEditor.getGeometryData(geometry, engineState);
    var match$1 = RelateGameObjectAndGeometryAssetUtils$WonderEditor.getTargetGeometryByJudgeDefaultGeometry(sceneGameObjectGeometryData, param[0], RelateGameObjectAndGeometryAssetUtils$WonderEditor.isGeometryDataEqualForDefaultGeometry, engineState);
    var targetGeometry = match$1 !== undefined ? match$1 : _findWDBAssetGameObjectGeometry(sceneGameObjectGeometryData, wdbAssetGameObjectGeometryDataArr, engineState);
    return RelateGameObjectAndGeometryAssetUtils$WonderEditor.replaceGeometryComponent(gameObject, geometry, targetGeometry, engineState);
  } else {
    return engineState;
  }
}

function _getGeometryDataArr(geometryArr, engineState) {
  return geometryArr.map((function (geometry) {
                return /* tuple */[
                        geometry,
                        RelateGameObjectAndGeometryAssetUtils$WonderEditor.getGeometryData(geometry, engineState)
                      ];
              }));
}

function relateSceneWDBGameObjectsAndAssets(allWDBGameObjectsArr, imageUint8ArrayDataMap, param, wdbAssetGameObjectGeometryAssetArr) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var basicMaterialDataMap = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getBasicMaterialDataMap(param[0], engineState);
  var lightMaterialDataMap = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getLightMaterialDataMap(param[1], /* tuple */[
        editorState,
        engineState
      ]);
  var defaultMaterialData = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getDefaultMaterialData(editorState, engineState);
  var defaultGeometryData = RelateGameObjectAndGeometryAssetUtils$WonderEditor.getDefaultGeometryData(editorState, engineState);
  var wdbAssetGameObjectGeometryDataArr = _getGeometryDataArr(wdbAssetGameObjectGeometryAssetArr, engineState);
  var engineState$1 = ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
          return _replaceSceneGameObjectGeometryComponentToWDBAssetGeometryComponent(gameObject, /* tuple */[
                      defaultGeometryData,
                      wdbAssetGameObjectGeometryDataArr
                    ], editorState, _replaceSceneGameObjectMaterialComponentToMaterialAsset(gameObject, /* tuple */[
                          defaultMaterialData,
                          /* tuple */[
                            basicMaterialDataMap,
                            lightMaterialDataMap
                          ],
                          imageUint8ArrayDataMap
                        ], engineState));
        }), engineState, allWDBGameObjectsArr);
  StateEngineService$WonderEditor.setState(engineState$1);
  return Contract$WonderLog.ensureCheck((function (r) {
                var sceneGeometryAssets = GeometryAssetLogicService$WonderEditor.getGeometryAssetsFromWDBGameObjects(allWDBGameObjectsArr, /* tuple */[
                      editorState,
                      engineState$1
                    ]);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("wdb assets->geometry assets: " + (String(wdbAssetGameObjectGeometryAssetArr) + (" include scene wdb gameObjects->geometry assets: " + (String(sceneGeometryAssets) + ""))), "not"), (function (param) {
                              StateEditorService$WonderEditor.getState(/* () */0);
                              StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              return Contract$WonderLog.assertTrue(ArrayService$WonderEditor.isInclude(wdbAssetGameObjectGeometryAssetArr, sceneGeometryAssets));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), /* () */0);
}

function relateWDBAssetGameObjectsAndAssets(allWDBGameObjectsArr, param, imageUint8ArrayDataMap) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var basicMaterialDataMap = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getBasicMaterialDataMap(param[0], engineState);
  var lightMaterialDataMap = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getLightMaterialDataMap(param[1], /* tuple */[
        editorState,
        engineState
      ]);
  var defaultMaterialData = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getDefaultMaterialData(editorState, engineState);
  var defaultGeometryData = RelateGameObjectAndGeometryAssetUtils$WonderEditor.getDefaultGeometryData(editorState, engineState);
  var engineState$1 = ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
          return RelateGameObjectAndGeometryAssetUtils$WonderEditor.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(gameObject, defaultGeometryData, _replaceWDBAssetGameObjectMaterialComponentToMaterialAsset(gameObject, /* tuple */[
                          defaultMaterialData,
                          /* tuple */[
                            basicMaterialDataMap,
                            lightMaterialDataMap
                          ],
                          imageUint8ArrayDataMap
                        ], engineState));
        }), engineState, allWDBGameObjectsArr);
  StateEngineService$WonderEditor.setState(engineState$1);
  return /* () */0;
}

export {
  _isImageUint8ArrayWhichHasLengthData ,
  _isImageUint8ArrayWhichHasLengthDataEqual ,
  _isImageDataEqual ,
  _isLightMaterialDataEqualForSceneGameObject ,
  _replaceGameObjectMaterialComponentToMaterialAsset ,
  _replaceSceneGameObjectMaterialComponentToMaterialAsset ,
  _isLightMaterialDataEqualForWDBAssetGameObject ,
  _replaceWDBAssetGameObjectMaterialComponentToMaterialAsset ,
  _isWdbAssetGameObjectGeometry ,
  _checkGameObjectGeometryComponent ,
  _isGeometryPointDataEqual ,
  _getSceneGameObjectGeometryPointsLength ,
  _isGeometryDataEqualForSceneGameObjectGeometry ,
  _findWDBAssetGameObjectGeometry ,
  _replaceSceneGameObjectGeometryComponentToWDBAssetGeometryComponent ,
  _getGeometryDataArr ,
  relateSceneWDBGameObjectsAndAssets ,
  relateWDBAssetGameObjectsAndAssets ,
  
}
/* Log-WonderLog Not a pure module */
