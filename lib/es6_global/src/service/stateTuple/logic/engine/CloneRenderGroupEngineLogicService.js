

import * as RenderGroupEngineService$WonderEditor from "../../../state/engine/RenderGroupEngineService.js";
import * as CloneMaterialEngineLogicService$WonderEditor from "./CloneMaterialEngineLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectComponentEngineService.js";
import * as CloneMeshRenderEngineLogicService$WonderEditor from "./CloneMeshRenderEngineLogicService.js";

function _createRenderGroupAddToGameObject(targetGameObject, newMeshRenderer, param, targetEngineState) {
  return RenderGroupEngineService$WonderEditor.addRenderGroupComponents(targetGameObject, RenderGroupEngineService$WonderEditor.buildRenderGroup(newMeshRenderer, param[0]), /* tuple */[
              GameObjectComponentEngineService$WonderEditor.addMeshRendererComponent,
              param[1]
            ], targetEngineState);
}

function _addRenderGroupIfHasBasicMaterial(targetGameObject, newMeshRenderer, param, targetEngineState) {
  var clonedEngineState = param[1];
  var clonedGameObjectMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(param[0], clonedEngineState);
  var match = CloneMaterialEngineLogicService$WonderEditor.cloneBasicMaterialToOtherEngineState(clonedGameObjectMaterial, clonedEngineState, targetEngineState);
  return /* tuple */[
          RenderGroupEngineService$WonderEditor.buildRenderGroup(newMeshRenderer, match[0]),
          GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent,
          match[1]
        ];
}

function _addRenderGroupIfHasLightMaterial(targetGameObject, newMeshRenderer, param, editorState, targetEngineState) {
  var clonedEngineState = param[1];
  var clonedGameObjectMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(param[0], clonedEngineState);
  var match = CloneMaterialEngineLogicService$WonderEditor.cloneLightMaterialToOtherEngineState(clonedGameObjectMaterial, editorState, clonedEngineState, targetEngineState);
  return /* tuple */[
          RenderGroupEngineService$WonderEditor.buildRenderGroup(newMeshRenderer, match[0]),
          GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent,
          match[1],
          match[2]
        ];
}

function cloneRenderGroupToOtherEngineState(targetGameObject, param, editorState, targetEngineState) {
  var clonedEngineState = param[1];
  var clonedGameObject = param[0];
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(clonedGameObject, clonedEngineState);
  var match = CloneMeshRenderEngineLogicService$WonderEditor.cloneMeshRendererToOtherEngineState(__x, clonedEngineState, targetEngineState);
  var targetEngineState$1 = match[1];
  var newMeshRenderer = match[0];
  var match$1 = GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(clonedGameObject, clonedEngineState);
  if (match$1) {
    var match$2 = _addRenderGroupIfHasBasicMaterial(targetGameObject, newMeshRenderer, /* tuple */[
          clonedGameObject,
          clonedEngineState
        ], targetEngineState$1);
    return /* tuple */[
            match$2[0],
            match$2[1],
            editorState,
            match$2[2]
          ];
  } else {
    return _addRenderGroupIfHasLightMaterial(targetGameObject, newMeshRenderer, /* tuple */[
                clonedGameObject,
                clonedEngineState
              ], editorState, targetEngineState$1);
  }
}

export {
  _createRenderGroupAddToGameObject ,
  _addRenderGroupIfHasBasicMaterial ,
  _addRenderGroupIfHasLightMaterial ,
  cloneRenderGroupToOtherEngineState ,
  
}
/* RenderGroupEngineService-WonderEditor Not a pure module */
