

import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as ComponentToolEngine$WonderEditor from "./ComponentToolEngine.js";
import * as GeometryEngineService$WonderEditor from "../../../src/service/state/engine/GeometryEngineService.js";
import * as RecordGeometryMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/RecordGeometryMainService.js";
import * as DisposeGeometryMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/DisposeGeometryMainService.js";
import * as GameObjectEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";

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
  var engineState$2 = GeometryEngineService$WonderEditor.setGeometryIndices16(geometry, indices1, GeometryEngineService$WonderEditor.setGeometryNormals(geometry, normals1, GeometryEngineService$WonderEditor.setGeometryVertices(geometry, vertices1, engineState$1)));
  var engineState$3 = hasTexCoords ? GeometryEngineService$WonderEditor.setGeometryTexCoords(geometry, texCoords1, engineState$2) : engineState$2;
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
  return GeometryEngineService$WonderEditor.getGeometryVertices(__x, engineState);
}

function getGameObjectNormals(gameObject, engineState) {
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
  return GeometryEngineService$WonderEditor.getGeometryNormals(__x, engineState);
}

function getGameObjectTexCoords(gameObject, engineState) {
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
  return GeometryEngineService$WonderEditor.getGeometryTexCoords(__x, engineState);
}

function getGameObjectIndices16(gameObject, engineState) {
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
  return GeometryEngineService$WonderEditor.getGeometryIndices16(__x, engineState);
}

export {
  createGameObjectAndSetPointData ,
  getNewGeometry ,
  isGeometryDisposed ,
  getVertices ,
  getGameObjectVertices ,
  getGameObjectNormals ,
  getGameObjectTexCoords ,
  getGameObjectIndices16 ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
