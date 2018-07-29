

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LightEngineService$WonderEditor from "../../../../../../service/state/engine/LightEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/CameraEngineService.js";
import * as MaterialEngineService$WonderEditor from "../../../../../../service/state/engine/MaterialEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../service/state/engine/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function addComponentByType(type_, currentSceneTreeNode, param) {
  var engineState = param[1];
  var editState = param[0];
  switch (type_) {
    case "ArcballCameraController" : 
        var match = ArcballCameraEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addArcballCameraControllerComponent(currentSceneTreeNode, match[1], /* tuple */[
                    editState,
                    match[0]
                  ]);
    case "BasicCameraView" : 
        var match$1 = BasicCameraViewEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addBasicCameraViewComponent(currentSceneTreeNode, match$1[1], /* tuple */[
                    editState,
                    match$1[0]
                  ]);
    case "Light" : 
        var match$2 = DirectionLightEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addDirectionLightComponent(currentSceneTreeNode, match$2[1], /* tuple */[
                    editState,
                    match$2[0]
                  ]);
    case "Material" : 
        var match$3 = LightMaterialEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addLightMaterialComponent(currentSceneTreeNode, match$3[1], /* tuple */[
                    editState,
                    match$3[0]
                  ]);
    case "MeshRenderer" : 
        var match$4 = MeshRendererEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addMeshRendererComponent(currentSceneTreeNode, match$4[1], /* tuple */[
                    editState,
                    match$4[0]
                  ]);
    case "PerspectiveCameraProjection" : 
        var match$5 = CameraEngineService$WonderEditor.createPerspectiveCamera(engineState);
        return GameObjectLogicService$WonderEditor.addPerspectiveCameraProjectionComponent(currentSceneTreeNode, match$5[1], /* tuple */[
                    editState,
                    match$5[0]
                  ]);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addComponentByType", "the type:" + (String(type_) + " is not find"), "", "", "type:" + (String(type_) + (" , currentSceneTreeNode:" + (String(currentSceneTreeNode) + "")))));
  }
}

function isHasSpecificComponentByType(type_, gameObject, engineState) {
  switch (type_) {
    case "ArcballCameraController" : 
        return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
    case "BasicCameraView" : 
        return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
    case "Light" : 
        return LightEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
    case "Material" : 
        return MaterialEngineService$WonderEditor.hasMaterialComponent(gameObject, engineState);
    case "MeshRenderer" : 
        return GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(gameObject, engineState);
    case "PerspectiveCameraProjection" : 
        return GameObjectComponentEngineService$WonderEditor.hasPerspectiveCameraProjectionComponent(gameObject, engineState);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("isHasSpecificComponentByType", "the component: " + (String(type_) + " not exist"), "", "", "type:" + (String(type_) + "")));
  }
}

export {
  addComponentByType ,
  isHasSpecificComponentByType ,
  
}
/* Log-WonderLog Not a pure module */
