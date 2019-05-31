

import * as LogUtils$WonderEditor from "../../../../../utils/console/LogUtils.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as ConsoleUtils$WonderEditor from "../../../../../utils/ui/ConsoleUtils.js";
import * as SceneEngineService$WonderEditor from "../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/camera/CameraEngineService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as MainEditorLightUtils$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as RenderGroupEngineService$WonderEditor from "../../../../../../service/state/engine/RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../../../service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../../../service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function _addRenderGroup(currentSceneTreeNode, param) {
  var editorState = param[0];
  var defaultLightMaterialData = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState);
  var match = MeshRendererEngineService$WonderEditor.create(param[1]);
  var renderGroup = RenderGroupEngineService$WonderEditor.buildRenderGroup(match[1], defaultLightMaterialData);
  return GameObjectLogicService$WonderEditor.addRenderGroup(currentSceneTreeNode, renderGroup, /* tuple */[
              GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
              GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
            ], /* tuple */[
              editorState,
              match[0]
            ]);
}

function _addGeometry(currentSceneTreeNode, param) {
  var editorState = param[0];
  var defaultCubeGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
  return GameObjectLogicService$WonderEditor.addGeometry(currentSceneTreeNode, defaultCubeGeometry, /* tuple */[
              editorState,
              param[1]
            ]);
}

function _addLight(currentSceneTreeNode, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = DirectionLightEngineService$WonderEditor.isMaxCount(engineState);
  if (match) {
    ConsoleUtils$WonderEditor.warn(MainEditorLightUtils$WonderEditor.getDirectionLightExceedMaxCountMessage(/* () */0), editorState);
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    var match$1 = DirectionLightEngineService$WonderEditor.create(engineState);
    var param$1 = GameObjectLogicService$WonderEditor.addDirectionLight(currentSceneTreeNode, match$1[1], /* tuple */[
          editorState,
          match$1[0]
        ]);
    return /* tuple */[
            param$1[0],
            SceneEngineService$WonderEditor.clearShaderCacheAndReInitAllLightMaterials(param$1[1])
          ];
  }
}

function _addScript(currentSceneTreeNode, param) {
  var match = ScriptEngineService$WonderEditor.create(param[1]);
  return GameObjectLogicService$WonderEditor.addScript(currentSceneTreeNode, match[1], /* tuple */[
              param[0],
              match[0]
            ]);
}

function _addArcballCameraController(currentSceneTreeNode, param) {
  var match = ArcballCameraEngineService$WonderEditor.create(param[1]);
  var cameraController = match[1];
  var engineState = match[0];
  var match$1 = false;
  if (StateEditorService$WonderEditor.getIsRun(/* () */0)) {
    var tmp = false;
    if (GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(currentSceneTreeNode, engineState)) {
      var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(currentSceneTreeNode, engineState);
      tmp = BasicCameraViewEngineService$WonderEditor.isActiveBasicCameraView(__x, engineState);
    }
    match$1 = tmp;
  }
  var engineState$1 = match$1 ? ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView(cameraController, engineState) : engineState;
  return GameObjectLogicService$WonderEditor.addArcballCameraController(currentSceneTreeNode, cameraController, /* tuple */[
              param[0],
              engineState$1
            ]);
}

function addComponentByType(type_, currentSceneTreeNode, param) {
  var engineState = param[1];
  var editorState = param[0];
  var exit = 0;
  switch (type_) {
    case 1 : 
        return _addRenderGroup(currentSceneTreeNode, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 2 : 
        return _addGeometry(currentSceneTreeNode, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 3 : 
        return _addArcballCameraController(currentSceneTreeNode, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 4 : 
        var match = CameraEngineService$WonderEditor.createCameraGroup(engineState);
        return GameObjectLogicService$WonderEditor.addCameraGroup(currentSceneTreeNode, match[1], /* tuple */[
                    editorState,
                    match[0]
                  ]);
    case 5 : 
        return _addLight(currentSceneTreeNode, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 7 : 
        return _addScript(currentSceneTreeNode, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 0 : 
    case 6 : 
    case 8 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("the type:" + (String(type_) + " in inspectorComponentType can\'t add "), "", "", ""), editorState);
    return /* tuple */[
            editorState,
            engineState
          ];
  }
  
}

export {
  _addRenderGroup ,
  _addGeometry ,
  _addLight ,
  _addScript ,
  _addArcballCameraController ,
  addComponentByType ,
  
}
/* LogUtils-WonderEditor Not a pure module */
