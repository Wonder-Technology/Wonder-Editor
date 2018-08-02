

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
    case 0 : 
        var match = MeshRendererEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addMeshRendererComponent(currentSceneTreeNode, match[1], /* tuple */[
                    editState,
                    match[0]
                  ]);
    case 1 : 
        var match$1 = ArcballCameraEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addArcballCameraControllerComponent(currentSceneTreeNode, match$1[1], /* tuple */[
                    editState,
                    match$1[0]
                  ]);
    case 2 : 
        var match$2 = BasicCameraViewEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addBasicCameraViewComponent(currentSceneTreeNode, match$2[1], /* tuple */[
                    editState,
                    match$2[0]
                  ]);
    case 3 : 
        var match$3 = CameraEngineService$WonderEditor.createPerspectiveCamera(engineState);
        return GameObjectLogicService$WonderEditor.addPerspectiveCameraProjectionComponent(currentSceneTreeNode, match$3[1], /* tuple */[
                    editState,
                    match$3[0]
                  ]);
    case 4 : 
        var match$4 = LightMaterialEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addLightMaterialComponent(currentSceneTreeNode, match$4[1], /* tuple */[
                    editState,
                    match$4[0]
                  ]);
    case 5 : 
        var match$5 = DirectionLightEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addDirectionLightComponent(currentSceneTreeNode, match$5[1], /* tuple */[
                    editState,
                    match$5[0]
                  ]);
    
  }
}

function isHasSpecificComponentByType(type_, gameObject, engineState) {
  switch (type_) {
    case 0 : 
        return GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(gameObject, engineState);
    case 1 : 
        return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
    case 2 : 
        return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
    case 3 : 
        return GameObjectComponentEngineService$WonderEditor.hasPerspectiveCameraProjectionComponent(gameObject, engineState);
    case 4 : 
        return MaterialEngineService$WonderEditor.hasMaterialComponent(gameObject, engineState);
    case 5 : 
        return LightEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
    
  }
}

export {
  addComponentByType ,
  isHasSpecificComponentByType ,
  
}
/* LightEngineService-WonderEditor Not a pure module */
