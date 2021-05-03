

import * as SceneEngineService$WonderEditor from "../../state/engine/SceneEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../state/editor/inspector/InspectorEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../state/editor/sceneTree/SceneTreeEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/gameObject/GameObjectEngineService.js";
import * as CameraGroupEngineService$WonderEditor from "../../state/engine/CameraGroupEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "../../state/engine/RenderGroupEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/gameObject/GameObjectComponentEngineService.js";

function createGameObject(param) {
  var match = GameObjectEngineService$WonderEditor.create(param[1]);
  var gameObject = match[1];
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Transform */0, param[0]),
          /* tuple */[
            match[0],
            gameObject
          ]
        ];
}

function addRenderGroup(gameObject, renderGroup, param, param$1) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* RenderGroup */1, param$1[0]),
          RenderGroupEngineService$WonderEditor.addRenderGroupComponents(gameObject, renderGroup, /* tuple */[
                param[0],
                param[1]
              ], param$1[1])
        ];
}

function addGeometry(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Geometry */2, param[0]),
          GameObjectComponentEngineService$WonderEditor.addGeometryComponent(gameObject, component, param[1])
        ];
}

function addCameraGroup(gameObject, cameraGroup, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* CameraGroup */4, param[0]),
          CameraGroupEngineService$WonderEditor.addCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
                GameObjectComponentEngineService$WonderEditor.addBasicCameraViewComponent,
                GameObjectComponentEngineService$WonderEditor.addPerspectiveCameraProjectionComponent
              ], param[1])
        ];
}

function addDirectionLight(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectComponentEngineService$WonderEditor.addDirectionLightComponent(gameObject, component, param[1])
        ];
}

function addPointLight(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectComponentEngineService$WonderEditor.addPointLightComponent(gameObject, component, param[1])
        ];
}

function addScript(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Script */7, param[0]),
          GameObjectComponentEngineService$WonderEditor.addScriptComponent(gameObject, component, param[1])
        ];
}

function addArcballCameraController(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* ArcballCameraController */3, param[0]),
          GameObjectComponentEngineService$WonderEditor.addArcballCameraControllerComponent(gameObject, component, param[1])
        ];
}

function disposeRenderGroup(gameObject, materialType, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* RenderGroup */1, param[0]),
          InspectorRenderGroupUtils$WonderEditor.disposeRenderGroup(gameObject, materialType, param[1])
        ];
}

function removeGeometry(gameObject, geometryComponent, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Geometry */2, param[0]),
          GameObjectComponentEngineService$WonderEditor.removeGeometryComponent(gameObject, geometryComponent, param[1])
        ];
}

function disposeCameraGroup(gameObject, cameraGroup, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* CameraGroup */4, param[0]),
          CameraGroupEngineService$WonderEditor.disposeCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
                GameObjectComponentEngineService$WonderEditor.disposeBasicCameraViewComponent,
                GameObjectComponentEngineService$WonderEditor.disposePerspectiveCameraProjectionComponent
              ], param[1])
        ];
}

function disposeDirectionLight(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectComponentEngineService$WonderEditor.disposeDirectionLightComponent(gameObject, component, param[1])
        ];
}

function disposePointLight(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectComponentEngineService$WonderEditor.disposePointLightComponent(gameObject, component, param[1])
        ];
}

function disposeArcballCameraController(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* ArcballCameraController */3, param[0]),
          GameObjectComponentEngineService$WonderEditor.disposeArcballCameraControllerComponent(gameObject, component, param[1])
        ];
}

function disposeScript(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Script */7, param[0]),
          GameObjectComponentEngineService$WonderEditor.disposeScriptComponent(gameObject, component, param[1])
        ];
}

function isCurrentSceneTreeNodeSceneGameObject(param) {
  var match = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(param[0]);
  if (match !== undefined) {
    return SceneEngineService$WonderEditor.isSceneGameObject(match, param[1]);
  } else {
    return false;
  }
}

function isCurrentSceneTreeNodeSceneChildren(param) {
  var match = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(param[0]);
  if (match !== undefined) {
    return !SceneEngineService$WonderEditor.isSceneGameObject(match, param[1]);
  } else {
    return false;
  }
}

export {
  createGameObject ,
  addRenderGroup ,
  addGeometry ,
  addCameraGroup ,
  addDirectionLight ,
  addPointLight ,
  addScript ,
  addArcballCameraController ,
  disposeRenderGroup ,
  removeGeometry ,
  disposeCameraGroup ,
  disposeDirectionLight ,
  disposePointLight ,
  disposeArcballCameraController ,
  disposeScript ,
  isCurrentSceneTreeNodeSceneGameObject ,
  isCurrentSceneTreeNodeSceneChildren ,
  
}
/* SceneEngineService-WonderEditor Not a pure module */
