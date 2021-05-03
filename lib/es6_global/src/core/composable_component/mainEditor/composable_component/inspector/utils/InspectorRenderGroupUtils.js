

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MainEditorMaterialUtils$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as RenderGroupEngineService$WonderEditor from "../../../../../../service/state/engine/RenderGroupEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

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

function _getOperateSourceRenderGroupData(materialType, gameObject, engineStateToGetData) {
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

function _getOperateTargetRenderGroupData(meshRenderer, materialType, engineState) {
  if (materialType) {
    var match = LightMaterialEngineService$WonderEditor.create(engineState);
    return /* tuple */[
            match[0],
            RenderGroupEngineService$WonderEditor.buildRenderGroup(meshRenderer, match[1]),
            GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent
          ];
  } else {
    var match$1 = BasicMaterialEngineService$WonderEditor.create(engineState);
    return /* tuple */[
            match$1[0],
            RenderGroupEngineService$WonderEditor.buildRenderGroup(meshRenderer, match$1[1]),
            GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent
          ];
  }
}

function replaceMaterialByMaterialData(gameObject, param, engineState) {
  var match = param[1];
  var match$1 = param[0];
  var meshRenderer = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(gameObject, engineState);
  var sourceRenderGroup = RenderGroupEngineService$WonderEditor.buildRenderGroup(meshRenderer, match$1[0]);
  var targetRenderGroup = RenderGroupEngineService$WonderEditor.buildRenderGroup(meshRenderer, match$1[1]);
  var removeSourceMaterialFunc = match[0] ? GameObjectComponentEngineService$WonderEditor.removeLightMaterialComponent : GameObjectComponentEngineService$WonderEditor.removeBasicMaterialComponent;
  var addTargetMaterialFunc = match[1] ? GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent : GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent;
  return RenderGroupEngineService$WonderEditor.replaceMaterial(/* tuple */[
              sourceRenderGroup,
              targetRenderGroup
            ], gameObject, /* tuple */[
              removeSourceMaterialFunc,
              addTargetMaterialFunc
            ], engineState);
}

var Remove = /* module */[
  /* _getOperateSourceRenderGroupData */_getOperateSourceRenderGroupData,
  /* _getOperateTargetRenderGroupData */_getOperateTargetRenderGroupData,
  /* replaceMaterialByMaterialData */replaceMaterialByMaterialData
];

function _getDisposeMaterialRemoveTextureFunc(materialType) {
  if (materialType) {
    return LightMaterialEngineService$WonderEditor.disposeLightMaterialRemoveTexture;
  } else {
    return BasicMaterialEngineService$WonderEditor.disposeBasicMaterialRemoveTexture;
  }
}

function _getOperateSourceRenderGroupData$1(meshRenderer, material, materialType, engineState) {
  if (materialType) {
    return /* tuple */[
            RenderGroupEngineService$WonderEditor.buildRenderGroup(meshRenderer, material),
            GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponentRemoveTexture
          ];
  } else {
    return /* tuple */[
            RenderGroupEngineService$WonderEditor.buildRenderGroup(meshRenderer, material),
            GameObjectComponentEngineService$WonderEditor.disposeBasicMaterialComponentRemoveTexture
          ];
  }
}

function _getOperateTargetRenderGroupData$1(meshRenderer, material, materialType, engineState) {
  if (materialType) {
    return /* tuple */[
            engineState,
            RenderGroupEngineService$WonderEditor.buildRenderGroup(meshRenderer, material),
            GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent
          ];
  } else {
    return /* tuple */[
            engineState,
            RenderGroupEngineService$WonderEditor.buildRenderGroup(meshRenderer, material),
            GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent
          ];
  }
}

function replaceMaterial(gameObject, param, engineState) {
  var match = param[1];
  var match$1 = param[0];
  var meshRenderer = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(gameObject, engineState);
  var match$2 = _getOperateSourceRenderGroupData$1(meshRenderer, match$1[0], match[0], engineState);
  var match$3 = _getOperateTargetRenderGroupData$1(meshRenderer, match$1[1], match[1], engineState);
  return RenderGroupEngineService$WonderEditor.replaceMaterial(/* tuple */[
              match$2[0],
              match$3[1]
            ], gameObject, /* tuple */[
              match$2[1],
              match$3[2]
            ], match$3[0]);
}

function disposeMaterialOrReplaceGameObjectsMaterialsOfTheMaterial(param, engineState) {
  var match = param[1];
  var targetMaterialType = match[1];
  var sourceMaterialType = match[0];
  var match$1 = param[0];
  var targetMaterial = match$1[1];
  var sourceMaterial = match$1[0];
  var match$2 = MainEditorMaterialUtils$WonderEditor.getGameObjectsByType(sourceMaterial, sourceMaterialType, engineState);
  if (match$2 !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                  return replaceMaterial(gameObject, /* tuple */[
                              /* tuple */[
                                sourceMaterial,
                                targetMaterial
                              ],
                              /* tuple */[
                                sourceMaterialType,
                                targetMaterialType
                              ]
                            ], engineState);
                }), engineState, match$2);
  } else {
    var disposeMaterialRemoveTextureFunc = sourceMaterialType ? LightMaterialEngineService$WonderEditor.disposeLightMaterialRemoveTexture : BasicMaterialEngineService$WonderEditor.disposeBasicMaterialRemoveTexture;
    return Curry._2(disposeMaterialRemoveTextureFunc, sourceMaterial, engineState);
  }
}

var Dispose = /* module */[
  /* _getDisposeMaterialRemoveTextureFunc */_getDisposeMaterialRemoveTextureFunc,
  /* _getOperateSourceRenderGroupData */_getOperateSourceRenderGroupData$1,
  /* _getOperateTargetRenderGroupData */_getOperateTargetRenderGroupData$1,
  /* replaceMaterial */replaceMaterial,
  /* disposeMaterialOrReplaceGameObjectsMaterialsOfTheMaterial */disposeMaterialOrReplaceGameObjectsMaterialsOfTheMaterial
];

export {
  _getMaterialHandleFuncByType ,
  disposeRenderGroup ,
  hasRenderGroupComponents ,
  Remove ,
  Dispose ,
  
}
/* MainEditorMaterialUtils-WonderEditor Not a pure module */
