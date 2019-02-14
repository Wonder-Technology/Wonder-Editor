

import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as SceneEngineService$WonderEditor from "../../state/engine/SceneEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../state/editor/inspector/InspectorEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../state/editor/sceneTree/SceneTreeEditorService.js";
import * as CameraGroupEngineService$WonderEditor from "../../state/engine/CameraGroupEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "../../state/engine/RenderGroupEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/gameObject/GameObjectComponentEngineService.js";

function createGameObject(param) {
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
          GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, component, param[1])
        ];
}

function addCameraGroup(gameObject, cameraGroup, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* CameraGroup */4, param[0]),
          CameraGroupEngineService$WonderEditor.addCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
                GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent,
                GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent
              ], param[1])
        ];
}

function addDirectionLight(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, component, param[1])
        ];
}

function addPointLight(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectAPI$Wonderjs.addGameObjectPointLightComponent(gameObject, component, param[1])
        ];
}

function addArcballCameraController(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* ArcballCameraController */3, param[0]),
          GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent(gameObject, component, param[1])
        ];
}

function disposeRenderGroup(gameObject, materialType, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* RenderGroup */1, param[0]),
          InspectorRenderGroupUtils$WonderEditor.disposeRenderGroup(gameObject, materialType, param[1])
        ];
}

function disposeGeometry(gameObject, geometryComponent, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Geometry */2, param[0]),
          GameObjectComponentEngineService$WonderEditor.disposeGeometryComponent(gameObject, geometryComponent, param[1])
        ];
}

function disposeCameraGroup(gameObject, cameraGroup, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* CameraGroup */4, param[0]),
          CameraGroupEngineService$WonderEditor.disposeCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
                GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent,
                GameObjectAPI$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent
              ], param[1])
        ];
}

function disposeDirectionLight(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectAPI$Wonderjs.disposeGameObjectDirectionLightComponent(gameObject, component, param[1])
        ];
}

function disposePointLight(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* Light */5, param[0]),
          GameObjectAPI$Wonderjs.disposeGameObjectPointLightComponent(gameObject, component, param[1])
        ];
}

function disposeArcballCameraController(gameObject, component, param) {
  return /* tuple */[
          InspectorEditorService$WonderEditor.removeComponentTypeToMap(gameObject, /* ArcballCameraController */3, param[0]),
          GameObjectAPI$Wonderjs.disposeGameObjectArcballCameraControllerComponent(gameObject, component, param[1])
        ];
}

function isCurrentSceneTreeNodeCanBeOperate(param) {
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
  addArcballCameraController ,
  disposeRenderGroup ,
  disposeGeometry ,
  disposeCameraGroup ,
  disposeDirectionLight ,
  disposePointLight ,
  disposeArcballCameraController ,
  isCurrentSceneTreeNodeCanBeOperate ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
