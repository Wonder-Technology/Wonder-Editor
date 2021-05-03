

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as Vector3Service$WonderEditor from "../../../../../../service/primitive/Vector3Service.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../service/state/engine/GeometryEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function _forEachVertices(vertices, verticesCount, func) {
  var index = 0;
  var minRef = /* tuple */[
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY
  ];
  var maxRef = /* tuple */[
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY
  ];
  while(index < verticesCount) {
    var match = Curry._3(func, /* tuple */[
          vertices[index],
          vertices[index + 1 | 0],
          vertices[index + 2 | 0]
        ], minRef, maxRef);
    minRef = match[0];
    maxRef = match[1];
    index = index + 3 | 0;
  };
  return /* record */[
          /* min */minRef,
          /* max */maxRef
        ];
}

function _expandByVertex(min, max, vertex) {
  return /* tuple */[
          Vector3Service$WonderEditor.min(min, vertex),
          Vector3Service$WonderEditor.max(max, vertex)
        ];
}

function _forEachVerticesWithMinAndMax(vertices, verticesCount, param, func) {
  var index = 0;
  var minRef = param[0];
  var maxRef = param[1];
  while(index < verticesCount) {
    var match = Curry._3(func, /* tuple */[
          vertices[index],
          vertices[index + 1 | 0],
          vertices[index + 2 | 0]
        ], minRef, maxRef);
    minRef = match[0];
    maxRef = match[1];
    index = index + 3 | 0;
  };
  return /* record */[
          /* min */minRef,
          /* max */maxRef
        ];
}

function setFromGameObject(gameObject, engineState) {
  var localToWorldMatrixTypeArray = TransformEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
  var geometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
  var vertices = GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(geometry, engineState);
  return _forEachVertices(vertices, vertices.length, (function (vertex, min, max) {
                return _expandByVertex(min, max, Vector3Service$Wonderjs.transformMat4Tuple(vertex, localToWorldMatrixTypeArray));
              }));
}

function setFromPoints(vertices) {
  return _forEachVertices(vertices, vertices.length, (function (vertex, min, max) {
                return _expandByVertex(min, max, vertex);
              }));
}

function setFromAllPointsAndLocalToWolrdMatrices(allPointsAndLocalToWolrdMatrices) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var localToWorldMatrixTypeArray = param$1[1];
                var vertices = param$1[0];
                return _forEachVerticesWithMinAndMax(vertices, vertices.length, /* tuple */[
                            param[/* min */0],
                            param[/* max */1]
                          ], (function (vertex, min, max) {
                              return _expandByVertex(min, max, Vector3Service$Wonderjs.transformMat4Tuple(vertex, localToWorldMatrixTypeArray));
                            }));
              }), /* record */[
              /* min : tuple */[
                Number.POSITIVE_INFINITY,
                Number.POSITIVE_INFINITY,
                Number.POSITIVE_INFINITY
              ],
              /* max : tuple */[
                Number.NEGATIVE_INFINITY,
                Number.NEGATIVE_INFINITY,
                Number.NEGATIVE_INFINITY
              ]
            ], allPointsAndLocalToWolrdMatrices);
}

function getCenter(param) {
  return Vector3Service$Wonderjs.scale(/* Float */0, 0.5, Vector3Service$Wonderjs.add(/* Float */0, param[/* max */1], param[/* min */0]));
}

function calcRadiusOfAABB(param, center) {
  return Vector3Service$WonderEditor.distanceTo(param[/* max */1], center);
}

function getHalfExtends(param) {
  return Vector3Service$Wonderjs.scale(/* Float */0, 0.5, Vector3Service$Wonderjs.sub(/* Float */0, param[/* max */1], param[/* min */0]));
}

function expandByScalar(scalar, param) {
  return /* record */[
          /* min */Vector3Service$WonderEditor.addScalar(param[/* min */0], -scalar),
          /* max */Vector3Service$WonderEditor.addScalar(param[/* max */1], scalar)
        ];
}

export {
  _forEachVertices ,
  _expandByVertex ,
  _forEachVerticesWithMinAndMax ,
  setFromGameObject ,
  setFromPoints ,
  setFromAllPointsAndLocalToWolrdMatrices ,
  getCenter ,
  calcRadiusOfAABB ,
  getHalfExtends ,
  expandByScalar ,
  
}
/* Vector3Service-WonderEditor Not a pure module */
