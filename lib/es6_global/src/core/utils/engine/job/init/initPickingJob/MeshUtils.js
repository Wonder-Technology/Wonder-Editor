

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as RayUtils$WonderEditor from "../../rayCaster/RayUtils.js";
import * as Matrix4Service$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as Vector3Service$WonderEditor from "../../../../../../service/primitive/Vector3Service.js";
import * as RayIntersectUtils$WonderEditor from "../../rayCaster/RayIntersectUtils.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../service/state/engine/GeometryEngineService.js";
import * as AbstractIndicesEngineService$WonderEditor from "../../../../../../service/state/engine/AbstractIndicesEngineService.js";

function _forEachIndices(param, indices, indicesCount, checkIntersectFunc) {
  var index = 0;
  var checkIntersectData = undefined;
  while(Js_option.isNone(checkIntersectData) && index < indicesCount) {
    checkIntersectData = Curry._3(checkIntersectFunc, AbstractIndicesEngineService$WonderEditor.unsafeGetIndex(index, indices), AbstractIndicesEngineService$WonderEditor.unsafeGetIndex(index + 1 | 0, indices), AbstractIndicesEngineService$WonderEditor.unsafeGetIndex(index + 2 | 0, indices));
    index = index + 3 | 0;
  };
  return checkIntersectData;
}

function _checkIntersect(cullType, param, ray, param$1) {
  return RayIntersectUtils$WonderEditor.checkIntersectTriangle(cullType, /* tuple */[
              param$1[0],
              param$1[1],
              param$1[2]
            ], ray);
}

function _checkIntersectMesh(param, param$1, ray) {
  var vertices = param$1[0];
  var engineState = param[3];
  var cullType = param[2];
  var geometry = param[0];
  var inverseMatrix = Matrix4Service$Wonderjs.invert(param[1], Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0));
  var ray$1 = RayUtils$WonderEditor.applyMatrix4(ray, inverseMatrix);
  var match = GeometryEngineService$WonderEditor.hasIndices16(geometry, engineState);
  return _forEachIndices(/* tuple */[
              geometry,
              engineState
            ], match ? param$1[1] : param$1[2], param$1[3], (function (index1, index2, index3) {
                return _checkIntersect(cullType, /* tuple */[
                            0,
                            Number.POSITIVE_INFINITY
                          ], ray$1, /* tuple */[
                            Vector3Service$WonderEditor.fromBufferAttribute(vertices, index1),
                            Vector3Service$WonderEditor.fromBufferAttribute(vertices, index2),
                            Vector3Service$WonderEditor.fromBufferAttribute(vertices, index3)
                          ]);
              }));
}

function checkIntersectMesh(ray, param, engineState) {
  var geometry = param[0];
  return _checkIntersectMesh(/* tuple */[
              geometry,
              param[1],
              param[2],
              engineState
            ], /* tuple */[
              GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(geometry, engineState),
              GeometryEngineService$WonderEditor.unsafeGetGeometryIndices16(geometry, engineState),
              GeometryEngineService$WonderEditor.unsafeGetGeometryIndices32(geometry, engineState),
              GeometryEngineService$WonderEditor.getIndicesCount(geometry, engineState)
            ], ray);
}

export {
  _forEachIndices ,
  _checkIntersect ,
  _checkIntersectMesh ,
  checkIntersectMesh ,
  
}
/* RayUtils-WonderEditor Not a pure module */
