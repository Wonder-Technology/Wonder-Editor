

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as ConsoleUtils$WonderEditor from "../../../../../utils/ui/ConsoleUtils.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../service/state/engine/SceneEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/camera/CameraEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as RenderGroupEngineService$WonderEditor from "../../../../../../service/state/engine/RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as AssetGeometryDataEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetGeometryDataEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function addComponentByType(type_, currentSceneTreeNode, param) {
  var engineState = param[1];
  var editorState = param[0];
  var exit = 0;
  switch (type_) {
    case 1 : 
        var match = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
              MeshRendererEngineService$WonderEditor.create,
              LightMaterialEngineService$WonderEditor.create
            ], engineState);
        return GameObjectLogicService$WonderEditor.addRenderGroup(currentSceneTreeNode, match[1], /* tuple */[
                    GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
                    GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
                  ], /* tuple */[
                    editorState,
                    match[0]
                  ]);
    case 2 : 
        var param$1 = AssetGeometryDataEditorService$WonderEditor.getGeometryData(editorState);
        var defaultCubeGeometry = param$1[/* defaultCubeGeometryIndex */0];
        return GameObjectLogicService$WonderEditor.addGeometry(currentSceneTreeNode, defaultCubeGeometry, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 3 : 
        var match$1 = ArcballCameraEngineService$WonderEditor.create(engineState);
        var cameraController = match$1[1];
        var engineState$1 = match$1[0];
        var match$2 = SceneEditorService$WonderEditor.getIsRun(editorState);
        var engineState$2;
        if (match$2) {
          var match$3 = GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(currentSceneTreeNode, engineState$1);
          if (match$3) {
            var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(currentSceneTreeNode, engineState$1);
            var match$4 = BasicCameraViewEngineService$WonderEditor.isActiveBasicCameraView(__x, engineState$1);
            engineState$2 = match$4 ? ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView(cameraController, engineState$1) : engineState$1;
          } else {
            engineState$2 = engineState$1;
          }
        } else {
          engineState$2 = engineState$1;
        }
        return GameObjectLogicService$WonderEditor.addArcballCameraController(currentSceneTreeNode, cameraController, /* tuple */[
                    editorState,
                    engineState$2
                  ]);
    case 4 : 
        var match$5 = CameraEngineService$WonderEditor.createCameraGroup(engineState);
        return GameObjectLogicService$WonderEditor.addCameraGroup(currentSceneTreeNode, match$5[1], /* tuple */[
                    editorState,
                    match$5[0]
                  ]);
    case 5 : 
        var match$6 = DirectionLightEngineService$WonderEditor.isMaxCount(engineState);
        if (match$6) {
          ConsoleUtils$WonderEditor.warn("the direction light count is exceed max count !");
          return /* tuple */[
                  editorState,
                  engineState
                ];
        } else {
          var match$7 = DirectionLightEngineService$WonderEditor.create(engineState);
          var param$2 = GameObjectLogicService$WonderEditor.addDirectionLight(currentSceneTreeNode, match$7[1], /* tuple */[
                editorState,
                match$7[0]
              ]);
          return /* tuple */[
                  param$2[0],
                  SceneEngineService$WonderEditor.clearShaderCacheAndReInitSceneAllLightMaterials(param$2[1])
                ];
        }
    case 0 : 
    case 6 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addComponentByType", "the type:" + (String(type_) + " in inspectorComponentType is can\'t add "), "", "", ""));
  }
  
}

export {
  addComponentByType ,
  
}
/* Log-WonderLog Not a pure module */
