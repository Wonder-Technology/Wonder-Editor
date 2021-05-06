'use strict';

var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var ComponentToolEngine$WonderEditor = require("./ComponentToolEngine.js");
var GeometryEngineService$WonderEditor = require("../../../src/service/state/engine/GeometryEngineService.js");
var RecordGeometryMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/geometry/RecordGeometryMainService.js");
var DisposeGeometryMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/geometry/DisposeGeometryMainService.js");
var GameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function createGameObjectAndSetPointData(engineState, $staropt$star, param) {
  var hasTexCoords = $staropt$star !== undefined ? $staropt$star : true;
  var match = GeometryEngineService$WonderEditor.create(engineState);
  var geometry = match[1];
  var match$1 = GameObjectEngineService$WonderEditor.create(match[0]);
  var gameObject = match$1[1];
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addGeometryComponent(gameObject, geometry, match$1[0]);
  var vertices1 = new Float32Array(/* array */[10]);
  var texCoords1 = new Float32Array(/* array */[0.5]);
  var normals1 = new Float32Array(/* array */[1]);
  var indices1 = new Uint16Array(/* array */[2]);
  var engineState$2 = GeometryEngineService$WonderEditor.setGeometryIndices16(indices1, geometry, GeometryEngineService$WonderEditor.setGeometryNormals(normals1, geometry, GeometryEngineService$WonderEditor.setGeometryVertices(vertices1, geometry, engineState$1)));
  var engineState$3 = hasTexCoords ? GeometryEngineService$WonderEditor.setGeometryTexCoords(texCoords1, geometry, engineState$2) : engineState$2;
  var name = hasTexCoords ? "geometryWithTexCoord" : "geometryNoTexCoord";
  var engineState$4 = GeometryEngineService$WonderEditor.setGeometryName(geometry, name, engineState$3);
  return /* tuple */[
          engineState$4,
          gameObject,
          geometry,
          /* tuple */[
            vertices1,
            texCoords1,
            normals1,
            indices1
          ],
          name
        ];
}

function getNewGeometry($staropt$star, param) {
  var engineState = $staropt$star !== undefined ? $staropt$star : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(engineState);
  var disposedIndexArray = geometryRecord[/* disposedIndexArray */19];
  return ComponentToolEngine$WonderEditor.computeGeneratedIndex(geometryRecord[/* index */0], disposedIndexArray)[0];
}

function isGeometryDisposed(geometry, engineState) {
  return !DisposeGeometryMainService$Wonderjs.isAliveWithRecord(geometry, RecordGeometryMainService$Wonderjs.getRecord(engineState));
}

function getVertices(engineState) {
  return RecordGeometryMainService$Wonderjs.getRecord(engineState)[/* vertices */2];
}

function getGameObjectVertices(gameObject, engineState) {
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
  return GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(__x, engineState);
}

function getGameObjectNormals(gameObject, engineState) {
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
  return GeometryEngineService$WonderEditor.unsafeGetGeometryNormals(__x, engineState);
}

function getGameObjectTexCoords(gameObject, engineState) {
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
  return GeometryEngineService$WonderEditor.unsafeGetGeometryTexCoords(__x, engineState);
}

function getGameObjectIndices16(gameObject, engineState) {
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
  return GeometryEngineService$WonderEditor.unsafeGetGeometryIndices16(__x, engineState);
}

exports.createGameObjectAndSetPointData = createGameObjectAndSetPointData;
exports.getNewGeometry = getNewGeometry;
exports.isGeometryDisposed = isGeometryDisposed;
exports.getVertices = getVertices;
exports.getGameObjectVertices = getGameObjectVertices;
exports.getGameObjectNormals = getGameObjectNormals;
exports.getGameObjectTexCoords = getGameObjectTexCoords;
exports.getGameObjectIndices16 = getGameObjectIndices16;
/* StateEngineService-WonderEditor Not a pure module */
