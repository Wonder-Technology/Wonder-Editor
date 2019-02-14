

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as RayUtils$WonderEditor from "../../rayCaster/RayUtils.js";
import * as Matrix4Service$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as Vector3Service$WonderEditor from "../../../../../../service/primitive/Vector3Service.js";
import * as RayIntersectUtils$WonderEditor from "../../rayCaster/RayIntersectUtils.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../service/state/engine/GeometryEngineService.js";
import * as AbstractIndicesService$WonderEditor from "../../../../../../service/state/engine/AbstractIndicesService.js";

function _forEachIndices(_, indices, indicesCount, checkIntersectFunc) {
  var index = 0;
  var checkIntersectData = undefined;
  while(Js_option.isNone(checkIntersectData) && index < indicesCount) {
    checkIntersectData = Curry._3(checkIntersectFunc, AbstractIndicesService$WonderEditor.unsafeGetIndex(index, indices), AbstractIndicesService$WonderEditor.unsafeGetIndex(index + 1 | 0, indices), AbstractIndicesService$WonderEditor.unsafeGetIndex(index + 2 | 0, indices));
    index = index + 3 | 0;
  };
  return checkIntersectData;
}

function _checkIntersect(cullType, _, ray, va, vb, vc) {
  return RayIntersectUtils$WonderEditor.checkIntersectTriangle(cullType, va, vb, vc, ray);
}

function _checkIntersectMesh(param, localToWorldMatrix, cullType, param$1, ray) {
  var vertices = param$1[0];
  var engineState = param[1];
  var geometry = param[0];
  var inverseMatrix = Matrix4Service$Wonderjs.invert(localToWorldMatrix, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0));
  var ray$1 = RayUtils$WonderEditor.applyMatrix4(ray, inverseMatrix);
  var match = GeometryEngineService$WonderEditor.hasIndices16(geometry, engineState);
  return _forEachIndices(/* tuple */[
              geometry,
              engineState
            ], match ? param$1[1] : param$1[2], param$1[3], (function (index1, index2, index3) {
                return _checkIntersect(cullType, /* tuple */[
                            0,
                            Number.POSITIVE_INFINITY
                          ], ray$1, Vector3Service$WonderEditor.fromBufferAttribute(vertices, index1), Vector3Service$WonderEditor.fromBufferAttribute(vertices, index2), Vector3Service$WonderEditor.fromBufferAttribute(vertices, index3));
              }));
}

function checkIntersectMesh(ray, param, engineState) {
  var geometry = param[0];
  return _checkIntersectMesh(/* tuple */[
              geometry,
              engineState
            ], param[1], param[2], /* tuple */[
              GeometryEngineService$WonderEditor.getGeometryVertices(geometry, engineState),
              GeometryEngineService$WonderEditor.getGeometryIndices16(geometry, engineState),
              GeometryEngineService$WonderEditor.getGeometryIndices32(geometry, engineState),
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
