

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as GeometryEngineService$WonderEditor from "../../../state/engine/GeometryEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/GameObjectEngineService.js";
import * as PrepareDefaultComponentUtils$WonderEditor from "../../../../core/utils/engine/PrepareDefaultComponentUtils.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../state/editor/asset/GeometryDataAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../state/engine/GameObjectComponentEngineService.js";

function isGeometryPointDataEqual(points1, points2, getLengthFunc) {
  return Curry._1(getLengthFunc, points1) === Curry._1(getLengthFunc, points2);
}

function _isGeometryVertexDataEqual(geometry1, geometry2, engineState) {
  if (isGeometryPointDataEqual(GeometryEngineService$WonderEditor.getGeometryVertices(geometry1, engineState), GeometryEngineService$WonderEditor.getGeometryVertices(geometry2, engineState), (function (prim) {
            return prim.length;
          })) && isGeometryPointDataEqual(GeometryEngineService$WonderEditor.getGeometryNormals(geometry1, engineState), GeometryEngineService$WonderEditor.getGeometryNormals(geometry2, engineState), (function (prim) {
            return prim.length;
          })) && isGeometryPointDataEqual(GeometryEngineService$WonderEditor.getGeometryTexCoords(geometry1, engineState), GeometryEngineService$WonderEditor.getGeometryTexCoords(geometry2, engineState), (function (prim) {
            return prim.length;
          }))) {
    return isGeometryPointDataEqual(GeometryEngineService$WonderEditor.getGeometryIndices(geometry1, engineState), GeometryEngineService$WonderEditor.getGeometryIndices(geometry2, engineState), (function (prim) {
                  return prim.length;
                }));
  } else {
    return false;
  }
}

function isGeometryEqualDefaultGeometryData(geometry, defaultGeometry, defaultGeometryName, engineState) {
  if (GeometryEngineService$WonderEditor.unsafeGetGeometryName(geometry, engineState) === defaultGeometryName) {
    return _isGeometryVertexDataEqual(geometry, defaultGeometry, engineState);
  } else {
    return false;
  }
}

function isDefaultGeometry(geometry, param) {
  var engineState = param[1];
  var editorState = param[0];
  var defaultCubeGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
  var defaultCubeGeometryName = PrepareDefaultComponentUtils$WonderEditor.getDefaultCubeGeometryName(/* () */0);
  var defaultSphereGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultSphereGeometryComponent(editorState);
  var defaultSphereGeometryName = PrepareDefaultComponentUtils$WonderEditor.getDefaultSphereGeometryName(/* () */0);
  if (isGeometryEqualDefaultGeometryData(geometry, defaultCubeGeometry, defaultCubeGeometryName, engineState)) {
    return true;
  } else {
    return isGeometryEqualDefaultGeometryData(geometry, defaultSphereGeometry, defaultSphereGeometryName, engineState);
  }
}

function isGeometryAsset(geometry, param) {
  return !isDefaultGeometry(geometry, /* tuple */[
              param[0],
              param[1]
            ]);
}

function getAllWDBGameObjects(editorState, engineState) {
  return SparseMapService$WonderEditor.reduceValid((function (allWDBGameObjects, param) {
                return ArrayService$WonderEditor.fastConcat(allWDBGameObjects, GameObjectEngineService$WonderEditor.getAllGameObjects(param[/* wdbGameObject */2], engineState));
              }), /* array */[], WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState));
}

function getGeometryAssetsFromWDBGameObjects(wdbGameObjects, param) {
  var engineState = param[1];
  var editorState = param[0];
  return ArrayService$WonderCommonlib.removeDuplicateItems(ArrayService$WonderCommonlib.reduceOneParam((function (geometryAssetArr, gameObject) {
                    var match = GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState);
                    if (match !== undefined) {
                      var geometry = match;
                      var match$1 = isGeometryAsset(geometry, /* tuple */[
                            editorState,
                            engineState
                          ]);
                      if (match$1) {
                        return ArrayService$WonderEditor.push(geometry, geometryAssetArr);
                      } else {
                        return geometryAssetArr;
                      }
                    } else {
                      return geometryAssetArr;
                    }
                  }), /* array */[], wdbGameObjects));
}

function getGeometryAssets(editorState, engineState) {
  return getGeometryAssetsFromWDBGameObjects(getAllWDBGameObjects(editorState, engineState), /* tuple */[
              editorState,
              engineState
            ]);
}

export {
  isGeometryPointDataEqual ,
  _isGeometryVertexDataEqual ,
  isGeometryEqualDefaultGeometryData ,
  isDefaultGeometry ,
  isGeometryAsset ,
  getAllWDBGameObjects ,
  getGeometryAssetsFromWDBGameObjects ,
  getGeometryAssets ,
  
}
/* ArrayService-WonderEditor Not a pure module */
