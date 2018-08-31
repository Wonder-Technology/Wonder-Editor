

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as Index from "antd/lib/message/index";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/CameraEngineService.js";
import * as OperateComponentUtils$WonderEditor from "./OperateComponentUtils.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as RenderGroupEngineService$WonderEditor from "../../../../../../service/state/engine/RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../service/state/engine/BasicCameraViewEngineService.js";
import * as AssetGeometryDataEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetGeometryDataEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/OperateLightMaterialLogicService.js";

function addComponentByTypeForEditEngineState(type_, currentSceneTreeNode, engineState) {
  var exit = 0;
  switch (type_) {
    case 1 : 
        var match = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
              MeshRendererEngineService$WonderEditor.create,
              LightMaterialEngineService$WonderEditor.create
            ], engineState);
        return GameObjectLogicService$WonderEditor.addRenderGroupForEditEngineState(currentSceneTreeNode, match[1], /* tuple */[
                    GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
                    GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
                  ], match[0]);
    case 2 : 
        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
        var editCubeGeometry = StateLogicService$WonderEditor.getEditEngineComponent(/* Geometry */2, AssetGeometryDataEditorService$WonderEditor.getGeometryData(editorState)[/* defaultCubeGeometryIndex */0]);
        return GameObjectLogicService$WonderEditor.addGeometryForEditEngineState(currentSceneTreeNode, editCubeGeometry, engineState);
    case 3 : 
        var match$1 = ArcballCameraEngineService$WonderEditor.create(engineState);
        return GameObjectLogicService$WonderEditor.addArcballCameraControllerForEditEngineState(currentSceneTreeNode, match$1[1], match$1[0]);
    case 4 : 
        var match$2 = CameraEngineService$WonderEditor.createCameraGroup(engineState);
        return GameObjectLogicService$WonderEditor.addCameraGroupForEditEngineState(currentSceneTreeNode, match$2[1], match$2[0]);
    case 5 : 
        var match$3 = DirectionLightEngineService$WonderEditor.isMaxCount(engineState);
        if (match$3) {
          var messageObj = Index.default;
          messageObj.info("the direction light count is exceed max count !", 4);
          return engineState;
        } else {
          var match$4 = DirectionLightEngineService$WonderEditor.create(engineState);
          return OperateLightMaterialLogicService$WonderEditor.reInitAllMaterials(GameObjectLogicService$WonderEditor.addDirectionLightForEditEngineState(currentSceneTreeNode, match$4[1], match$4[0]));
        }
    case 0 : 
    case 6 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addComponentByTypeForEditEngineState", "the type:" + (String(type_) + " in inspectorComponentType is can\'t add "), "", "", ""));
  }
  
}

function addComponentByTypeForRunEngineState(type_, currentSceneTreeNode, param) {
  var engineState = param[1];
  var editorState = param[0];
  var exit = 0;
  switch (type_) {
    case 1 : 
        var match = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
              MeshRendererEngineService$WonderEditor.create,
              LightMaterialEngineService$WonderEditor.create
            ], engineState);
        return GameObjectLogicService$WonderEditor.addRenderGroupForRunEngineState(currentSceneTreeNode, match[1], /* tuple */[
                    GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
                    GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
                  ], /* tuple */[
                    editorState,
                    match[0]
                  ]);
    case 2 : 
        var editorState$1 = StateEditorService$WonderEditor.getState(/* () */0);
        var param$1 = AssetGeometryDataEditorService$WonderEditor.getGeometryData(editorState$1);
        var runCubeGeometry = param$1[/* defaultCubeGeometryIndex */0];
        return GameObjectLogicService$WonderEditor.addGeometryForRunEngineState(currentSceneTreeNode, runCubeGeometry, /* tuple */[
                    editorState$1,
                    engineState
                  ]);
    case 3 : 
        var match$1 = ArcballCameraEngineService$WonderEditor.create(engineState);
        var param$2 = GameObjectLogicService$WonderEditor.addArcballCameraControllerForRunEngineState(currentSceneTreeNode, match$1[1], /* tuple */[
              editorState,
              match$1[0]
            ]);
        return /* tuple */[
                param$2[0],
                OperateComponentUtils$WonderEditor.handleAddArcballCameraControllerIfInRunMode(currentSceneTreeNode, param$2[1])
              ];
    case 4 : 
        var match$2 = CameraEngineService$WonderEditor.createCameraGroup(engineState);
        var param$3 = GameObjectLogicService$WonderEditor.addCameraGroupForRunEngineState(currentSceneTreeNode, match$2[1], /* tuple */[
              editorState,
              match$2[0]
            ]);
        var engineState$1 = param$3[1];
        return /* tuple */[
                param$3[0],
                OperateComponentUtils$WonderEditor.handleAddCameraGroupIfInRunMode(currentSceneTreeNode, BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(currentSceneTreeNode, engineState$1), engineState$1))
              ];
    case 5 : 
        var match$3 = DirectionLightEngineService$WonderEditor.isMaxCount(engineState);
        if (match$3) {
          var messageObj = Index.default;
          messageObj.info("the direction light count is exceed max count !", 4);
          return /* tuple */[
                  editorState,
                  engineState
                ];
        } else {
          var match$4 = DirectionLightEngineService$WonderEditor.create(engineState);
          var param$4 = GameObjectLogicService$WonderEditor.addDirectionLightForRunEngineState(currentSceneTreeNode, match$4[1], /* tuple */[
                editorState,
                match$4[0]
              ]);
          return /* tuple */[
                  param$4[0],
                  OperateLightMaterialLogicService$WonderEditor.reInitAllMaterials(param$4[1])
                ];
        }
    case 0 : 
    case 6 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addComponentByTypeForRunEngineState", "the type:" + (String(type_) + " in inspectorComponentType is can\'t add "), "", "", ""));
  }
  
}

export {
  addComponentByTypeForEditEngineState ,
  addComponentByTypeForRunEngineState ,
  
}
/* Log-WonderLog Not a pure module */
