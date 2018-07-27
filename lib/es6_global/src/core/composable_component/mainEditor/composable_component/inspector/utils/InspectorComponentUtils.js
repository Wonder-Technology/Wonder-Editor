

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LightEngineService$WonderEditor from "../../../../../../service/state/engine/LightEngineService.js";
import * as MaterialEngineService$WonderEditor from "../../../../../../service/state/engine/MaterialEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as SourceInstanceEngineService$WonderEditor from "../../../../../../service/state/engine/SourceInstanceEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function addComponentByType(type_, currentSceneTreeNode, engineState) {
  switch (type_) {
    case "ArcballCamera" : 
        var match = ArcballCameraEngineService$WonderEditor.create(engineState);
        return GameObjectComponentEngineService$WonderEditor.addArcballCameraControllerComponent(currentSceneTreeNode, match[1], match[0]);
    case "Light" : 
        var match$1 = DirectionLightEngineService$WonderEditor.create(engineState);
        return GameObjectComponentEngineService$WonderEditor.addDirectionLightComponent(currentSceneTreeNode, match$1[1], match$1[0]);
    case "MeshRenderer" : 
        var match$2 = MeshRendererEngineService$WonderEditor.create(engineState);
        return GameObjectComponentEngineService$WonderEditor.addMeshRendererComponent(currentSceneTreeNode, match$2[1], match$2[0]);
    case "SourceInstance" : 
        var match$3 = SourceInstanceEngineService$WonderEditor.create(engineState);
        return GameObjectComponentEngineService$WonderEditor.addSourceInstanceComponent(currentSceneTreeNode, match$3[1], match$3[0]);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addComponentByType", "the type:" + (String(type_) + " is not find"), "", "", "type:" + (String(type_) + (" , currentSceneTreeNode:" + (String(currentSceneTreeNode) + "")))));
  }
}

function isHasSpecificComponentByType(type_, gameObject, engineState) {
  switch (type_) {
    case "ArcballCamera" : 
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
    case "SourceInstance" : 
        return GameObjectComponentEngineService$WonderEditor.hasSourceInstanceComponent(gameObject, engineState);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("isHasSpecificComponentByType", "the component: " + (String(type_) + " not exist"), "", "", "type:" + (String(type_) + "")));
  }
}

export {
  addComponentByType ,
  isHasSpecificComponentByType ,
  
}
/* Log-WonderLog Not a pure module */
