

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as AABBShapeUtils$WonderEditor from "./AABBShapeUtils.js";
import * as Matrix4Service$WonderEditor from "../../../../../../service/primitive/Matrix4Service.js";
import * as Vector3Service$WonderEditor from "../../../../../../service/primitive/Vector3Service.js";

function _forEachVertices(vertices, verticesCount, func) {
  var index = 0;
  var maxRadiusSqRef = 0;
  while(index < verticesCount) {
    var maxRadiusSq = Curry._2(func, /* tuple */[
          vertices[index],
          vertices[index + 1 | 0],
          vertices[index + 2 | 0]
        ], maxRadiusSqRef);
    maxRadiusSqRef = maxRadiusSq;
    index = index + 3 | 0;
  };
  return maxRadiusSqRef;
}

function _findMaxDistanceOfPointsToCenter(center, vertices) {
  return _forEachVertices(vertices, vertices.length, (function (vertex, maxRadiusSq) {
                return Math.max(maxRadiusSq, Vector3Service$WonderEditor.distanceToSquared(center, vertex));
              }));
}

function setFromPoints(vertices) {
  var center = AABBShapeUtils$WonderEditor.getCenter(AABBShapeUtils$WonderEditor.setFromPoints(vertices));
  return /* record */[
          /* radius */Math.sqrt(_findMaxDistanceOfPointsToCenter(center, vertices)),
          /* center */center
        ];
}

function applyMatrix4(param, localToWorldMatrixTypeArray) {
  return /* record */[
          /* radius */param[/* radius */0] * Matrix4Service$WonderEditor.getMaxScaleOnAxis(localToWorldMatrixTypeArray),
          /* center */Vector3Service$Wonderjs.transformMat4Tuple(param[/* center */1], localToWorldMatrixTypeArray)
        ];
}

export {
  _forEachVertices ,
  _findMaxDistanceOfPointsToCenter ,
  setFromPoints ,
  applyMatrix4 ,
  
}
/* AABBShapeUtils-WonderEditor Not a pure module */
