'use strict';

import * as GeometryEngineService$WonderEditor                    from "./GeometryEngineService.js";
import * as GameObjectEngineService$WonderEditor                  from "./GameObjectEngineService.js";
import * as MeshRendererEngineService$WonderEditor                from "./MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor               from "./BasicMaterialEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor             from "./BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor         from "./GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "./PerspectiveCameraProjectionEngineService.js";

function createPerspectiveCamera(engineState) {
  var match = PerspectiveCameraProjectionEngineService$WonderEditor.create(engineState);
  var cameraProjection = match[1];
  var engineState$1 = PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(cameraProjection, 1, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(cameraProjection, 60, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(cameraProjection, 1000, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(cameraProjection, 0.1, match[0]))));
  return /* tuple */[
          engineState$1,
          cameraProjection
        ];
}

function createCamera(engineState) {
  var match = BasicCameraViewEngineService$WonderEditor.create(engineState);
  var match$1 = createPerspectiveCamera(match[0]);
  var match$2 = GameObjectEngineService$WonderEditor.create(match$1[0]);
  var gameObject = match$2[1];
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addPerspectiveCameraProjectionComponent(gameObject, match$1[1], GameObjectComponentEngineService$WonderEditor.addBasicCameraViewComponent(gameObject, match[1], match$2[0]));
  return /* tuple */[
          engineState$1,
          gameObject
        ];
}

function createCameraBox(engineState) {
  var match = BasicCameraViewEngineService$WonderEditor.create(engineState);
  var match$1 = createPerspectiveCamera(match[0]);
  var match$2 = BasicMaterialEngineService$WonderEditor.create(match$1[0]);
  var match$3 = MeshRendererEngineService$WonderEditor.create(match$2[0]);
  var match$4 = GeometryEngineService$WonderEditor.createBoxGeometry(match$3[0]);
  var geometry = match$4[1];
  var match$5 = GameObjectEngineService$WonderEditor.create(match$4[0]);
  var gameObject = match$5[1];
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addPerspectiveCameraProjectionComponent(gameObject, match$1[1], GameObjectComponentEngineService$WonderEditor.addBasicCameraViewComponent(gameObject, match[1], GameObjectComponentEngineService$WonderEditor.addBoxGeometryComponent(gameObject, geometry, GameObjectComponentEngineService$WonderEditor.addMeshRendererComponent(gameObject, match$3[1], GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent(gameObject, match$2[1], GeometryEngineService$WonderEditor.setBoxGeometryConfigData(geometry, {
                            width: 1,
                            height: 1,
                            depth: 1,
                            widthSegment: undefined,
                            heightSegment: undefined,
                            depthSegment: undefined
                          }, match$5[0]))))));
  return /* tuple */[
          engineState$1,
          gameObject
        ];
}

var isCamera = GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent;

export {
  createPerspectiveCamera ,
  createCamera            ,
  createCameraBox         ,
  isCamera                ,
  
}
/* GeometryEngineService-WonderEditor Not a pure module */
