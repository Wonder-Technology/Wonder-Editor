

import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as InspectorEditorService$WonderEditor from "../../state/editor/inspector/InspectorEditorService.js";
import * as CameraGroupEngineService$WonderEditor from "../../state/engine/CameraGroupEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "../../state/engine/RenderGroupEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";

var createGameObjectForEditEngineState = GameObjectAPI$Wonderjs.createGameObject;

function createGameObjectForRunEngineState(param) {
  var match = GameObjectAPI$Wonderjs.createGameObject(param[1]);
  var gameObject = match[1];
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Transform */0, param[0]),
          /* tuple */[
            match[0],
            gameObject
          ]
        ];
}

function addRenderGroupForEditEngineState(gameObject, renderGroup, param, engineState) {
  return RenderGroupEngineService$WonderEditor.addRenderGroupComponents(gameObject, renderGroup, /* tuple */[
              param[0],
              param[1]
            ], engineState);
}

function addRenderGroupForRunEngineState(gameObject, renderGroup, param, param$1) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* RenderGroup */1, param$1[0]),
          RenderGroupEngineService$WonderEditor.addRenderGroupComponents(gameObject, renderGroup, /* tuple */[
                param[0],
                param[1]
              ], param$1[1])
        ];
}

var addGeometryForEditEngineState = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent;

function addGeometryForRunEngineState(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Geometry */2, param[0]),
          GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, component, param[1])
        ];
}

function addCameraGroupForEditEngineState(gameObject, cameraGroup, engineState) {
  return CameraGroupEngineService$WonderEditor.addCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
              GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent,
              GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent
            ], engineState);
}

function addCameraGroupForRunEngineState(gameObject, cameraGroup, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* CameraGroup */4, param[0]),
          CameraGroupEngineService$WonderEditor.addCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
                GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent,
                GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent
              ], param[1])
        ];
}

var addDirectionLightForEditEngineState = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent;

function addDirectionLightForRunEngineState(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, component, param[1])
        ];
}

var addPointLightForEditEngineState = GameObjectAPI$Wonderjs.addGameObjectPointLightComponent;

function addPointLightForRunEngineState(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectAPI$Wonderjs.addGameObjectPointLightComponent(gameObject, component, param[1])
        ];
}

var addArcballCameraControllerForEditEngineState = GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent;

function addArcballCameraControllerForRunEngineState(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* ArcballCameraController */3, param[0]),
          GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent(gameObject, component, param[1])
        ];
}

var disposeRenderGroupForEditEngineState = InspectorRenderGroupUtils$WonderEditor.disposeRenderGroup;

function disposeRenderGroupForRunEngineState(gameObject, materialType, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* RenderGroup */1, param[0]),
          InspectorRenderGroupUtils$WonderEditor.disposeRenderGroup(gameObject, materialType, param[1])
        ];
}

function disposeCameraGroupForEditEngineState(gameObject, cameraGroup, engineState) {
  return CameraGroupEngineService$WonderEditor.disposeCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
              GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent,
              GameObjectAPI$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent
            ], engineState);
}

function disposeCameraGroupForRunEngineState(gameObject, cameraGroup, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* CameraGroup */4, param[0]),
          CameraGroupEngineService$WonderEditor.disposeCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
                GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent,
                GameObjectAPI$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent
              ], param[1])
        ];
}

var disposeDirectionLightForEditEngineState = GameObjectAPI$Wonderjs.disposeGameObjectDirectionLightComponent;

function disposeDirectionLightForRunEngineState(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectAPI$Wonderjs.disposeGameObjectDirectionLightComponent(gameObject, component, param[1])
        ];
}

var disposePointLightForEditEngineState = GameObjectAPI$Wonderjs.disposeGameObjectPointLightComponent;

function disposePointLightForRunEngineState(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectAPI$Wonderjs.disposeGameObjectPointLightComponent(gameObject, component, param[1])
        ];
}

var disposeArcballCameraControllerForEditEngineState = GameObjectAPI$Wonderjs.disposeGameObjectArcballCameraControllerComponent;

function disposeArcballCameraControllerForRunEngineState(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* ArcballCameraController */3, param[0]),
          GameObjectAPI$Wonderjs.disposeGameObjectArcballCameraControllerComponent(gameObject, component, param[1])
        ];
}

export {
  createGameObjectForEditEngineState ,
  createGameObjectForRunEngineState ,
  addRenderGroupForEditEngineState ,
  addRenderGroupForRunEngineState ,
  addGeometryForEditEngineState ,
  addGeometryForRunEngineState ,
  addCameraGroupForEditEngineState ,
  addCameraGroupForRunEngineState ,
  addDirectionLightForEditEngineState ,
  addDirectionLightForRunEngineState ,
  addPointLightForEditEngineState ,
  addPointLightForRunEngineState ,
  addArcballCameraControllerForEditEngineState ,
  addArcballCameraControllerForRunEngineState ,
  disposeRenderGroupForEditEngineState ,
  disposeRenderGroupForRunEngineState ,
  disposeCameraGroupForEditEngineState ,
  disposeCameraGroupForRunEngineState ,
  disposeDirectionLightForEditEngineState ,
  disposeDirectionLightForRunEngineState ,
  disposePointLightForEditEngineState ,
  disposePointLightForRunEngineState ,
  disposeArcballCameraControllerForEditEngineState ,
  disposeArcballCameraControllerForRunEngineState ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
