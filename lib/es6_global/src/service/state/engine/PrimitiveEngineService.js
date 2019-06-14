

import * as CameraEngineService$WonderEditor from "./camera/CameraEngineService.js";
import * as GeometryEngineService$WonderEditor from "./GeometryEngineService.js";
import * as GameObjectEngineService$WonderEditor from "./gameObject/GameObjectEngineService.js";
import * as CameraGroupEngineService$WonderEditor from "./CameraGroupEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "./RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "./MeshRendererEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "./DirectionLightEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./gameObject/GameObjectComponentEngineService.js";

function createCamera(engineState) {
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var camera = match[1];
  var match$1 = CameraEngineService$WonderEditor.createCameraGroup(match[0]);
  var engineState$1 = CameraGroupEngineService$WonderEditor.addCameraGroupComponents(camera, match$1[1], /* tuple */[
        GameObjectComponentEngineService$WonderEditor.addBasicCameraViewComponent,
        GameObjectComponentEngineService$WonderEditor.addPerspectiveCameraProjectionComponent
      ], match$1[0]);
  return /* tuple */[
          engineState$1,
          camera
        ];
}

function createSphere(material, addMaterialFunc, engineState) {
  var match = GeometryEngineService$WonderEditor.createSphereGeometry(0.5, 28, engineState);
  var match$1 = GameObjectEngineService$WonderEditor.create(match[0]);
  var gameObject = match$1[1];
  var match$2 = MeshRendererEngineService$WonderEditor.create(match$1[0]);
  var renderGroup = RenderGroupEngineService$WonderEditor.buildRenderGroup(match$2[1], material);
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addGeometryComponent(gameObject, match[1], RenderGroupEngineService$WonderEditor.addRenderGroupComponents(gameObject, renderGroup, /* tuple */[
            GameObjectComponentEngineService$WonderEditor.addMeshRendererComponent,
            addMaterialFunc
          ], match$2[0]));
  return /* tuple */[
          engineState$1,
          gameObject
        ];
}

function createDirectionLight(engineState) {
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var gameObject = match[1];
  var match$1 = DirectionLightEngineService$WonderEditor.create(match[0]);
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addDirectionLightComponent(gameObject, match$1[1], match$1[0]);
  return /* tuple */[
          engineState$1,
          gameObject
        ];
}

export {
  createCamera ,
  createSphere ,
  createDirectionLight ,
  
}
/* CameraEngineService-WonderEditor Not a pure module */
