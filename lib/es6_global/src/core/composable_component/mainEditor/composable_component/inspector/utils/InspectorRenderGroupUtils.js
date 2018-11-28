

import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../service/state/engine/StateEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "../../../../../../service/state/engine/RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as OperateRenderGroupLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/OperateRenderGroupLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function _getMaterialHandleFuncByType(materialType) {
  if (materialType) {
    return /* tuple */[
            GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent,
            GameObjectComponentEngineService$WonderEditor.removeLightMaterialComponent
          ];
  } else {
    return /* tuple */[
            GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent,
            GameObjectComponentEngineService$WonderEditor.removeBasicMaterialComponent
          ];
  }
}

function disposeRenderGroup(gameObject, materialType, engineState) {
  var match = _getMaterialHandleFuncByType(materialType);
  return RenderGroupEngineService$WonderEditor.disposeRenderGroupComponents(gameObject, RenderGroupEngineService$WonderEditor.getRenderGroupComponents(gameObject, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent,
                  match[0]
                ], engineState), /* tuple */[
              GameObjectComponentEngineService$WonderEditor.disposeMeshRendererComponent,
              match[1]
            ], engineState);
}

function hasRenderGroupComponents(gameObject, engineState) {
  if (RenderGroupEngineService$WonderEditor.hasRenderGroupComponents(gameObject, /* tuple */[
          GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent,
          GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent
        ], engineState)) {
    return true;
  } else {
    return RenderGroupEngineService$WonderEditor.hasRenderGroupComponents(gameObject, /* tuple */[
                GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent,
                GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent
              ], engineState);
  }
}

function _getOperateSourceRenderGroupFunc(materialType, gameObject, engineStateToGetData) {
  if (materialType) {
    return /* tuple */[
            RenderGroupEngineService$WonderEditor.getRenderGroupComponents(gameObject, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent,
                  GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent
                ], engineStateToGetData),
            GameObjectComponentEngineService$WonderEditor.removeLightMaterialComponent
          ];
  } else {
    return /* tuple */[
            RenderGroupEngineService$WonderEditor.getRenderGroupComponents(gameObject, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent,
                  GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent
                ], engineStateToGetData),
            GameObjectComponentEngineService$WonderEditor.removeBasicMaterialComponent
          ];
  }
}

function _getOperateTargetRenderGroupFunc(materialType, engineState) {
  if (materialType) {
    return /* tuple */[
            OperateRenderGroupLogicService$WonderEditor.createRenderGroup(/* tuple */[
                  MeshRendererEngineService$WonderEditor.create,
                  LightMaterialEngineService$WonderEditor.create
                ], engineState),
            GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent
          ];
  } else {
    return /* tuple */[
            OperateRenderGroupLogicService$WonderEditor.createRenderGroup(/* tuple */[
                  MeshRendererEngineService$WonderEditor.create,
                  BasicMaterialEngineService$WonderEditor.create
                ], engineState),
            GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent
          ];
  }
}

function _replaceRenderGroup(param, sourceMeshRenderer, sourceMaterial, targetMeshRenderer, targetMaterial, gameObject, state) {
  return RenderGroupEngineService$WonderEditor.replaceRenderGroupComponents(/* tuple */[
              /* record */[
                /* meshRenderer */sourceMeshRenderer,
                /* material */sourceMaterial
              ],
              /* record */[
                /* meshRenderer */targetMeshRenderer,
                /* material */targetMaterial
              ]
            ], gameObject, /* tuple */[
              param[0],
              param[1]
            ], state);
}

function replaceRenderGroupByMaterialType(sourceMateralType, targetMaterialType) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = _getOperateSourceRenderGroupFunc(sourceMateralType, gameObject, engineState);
  var sourceRenderGroup = match[0];
  var match$1 = _getOperateTargetRenderGroupFunc(targetMaterialType, engineState);
  var match$2 = match$1[0];
  var targetRenderGroup = match$2[1];
  return StateLogicService$WonderEditor.refreshEngineState(_replaceRenderGroup(/* tuple */[
                  match[1],
                  match$1[1]
                ], sourceRenderGroup[/* meshRenderer */0], sourceRenderGroup[/* material */1], targetRenderGroup[/* meshRenderer */0], targetRenderGroup[/* material */1], gameObject, match$2[0]));
}

export {
  _getMaterialHandleFuncByType ,
  disposeRenderGroup ,
  hasRenderGroupComponents ,
  _getOperateSourceRenderGroupFunc ,
  _getOperateTargetRenderGroupFunc ,
  _replaceRenderGroup ,
  replaceRenderGroupByMaterialType ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
