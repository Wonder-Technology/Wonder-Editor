

import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as RenderGroupEngineService$WonderEditor from "../../../../../../service/state/engine/RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as OperateRenderGroupLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/OperateRenderGroupLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function _getMaterialHandleFuncByType(materialType) {
  if (materialType) {
    return /* tuple */[
            GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent,
            GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent
          ];
  } else {
    return /* tuple */[
            GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent,
            GameObjectComponentEngineService$WonderEditor.disposeBasicMaterialComponent
          ];
  }
}

function disposeRenderGroup(gameObject, materialType, engineState) {
  var match = _getMaterialHandleFuncByType(materialType);
  return RenderGroupEngineService$WonderEditor.disposeRenderGroupComponents(gameObject, RenderGroupEngineService$WonderEditor.getRenderGroupComponents(gameObject, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent,
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
            /* tuple */[
              /* MeshRenderer */3,
              /* LightMaterial */5
            ],
            RenderGroupEngineService$WonderEditor.getRenderGroupComponents(gameObject, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent,
                  GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent
                ], engineStateToGetData),
            GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent
          ];
  } else {
    return /* tuple */[
            /* tuple */[
              /* MeshRenderer */3,
              /* BasicMaterial */4
            ],
            RenderGroupEngineService$WonderEditor.getRenderGroupComponents(gameObject, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent,
                  GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent
                ], engineStateToGetData),
            GameObjectComponentEngineService$WonderEditor.disposeBasicMaterialComponent
          ];
  }
}

function _getOperateTargetRenderGroupFunc(materialType, editEngineState, runEngineState) {
  if (materialType) {
    return /* tuple */[
            /* tuple */[
              /* MeshRenderer */3,
              /* LightMaterial */5
            ],
            OperateRenderGroupLogicService$WonderEditor.createRenderGroup(/* tuple */[
                  MeshRendererEngineService$WonderEditor.create,
                  LightMaterialEngineService$WonderEditor.create
                ], editEngineState, runEngineState),
            GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent
          ];
  } else {
    return /* tuple */[
            /* tuple */[
              /* MeshRenderer */3,
              /* BasicMaterial */4
            ],
            OperateRenderGroupLogicService$WonderEditor.createRenderGroup(/* tuple */[
                  MeshRendererEngineService$WonderEditor.create,
                  BasicMaterialEngineService$WonderEditor.create
                ], editEngineState, runEngineState),
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
  var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
  var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var match = _getOperateSourceRenderGroupFunc(sourceMateralType, gameObject, runEngineState);
  var sourceRenderGroup = match[1];
  var match$1 = match[0];
  var match$2 = _getOperateTargetRenderGroupFunc(targetMaterialType, editEngineState, runEngineState);
  var match$3 = match$2[1];
  var targetRenderGroup = match$3[0];
  var match$4 = match$2[0];
  var partial_arg_000 = match[2];
  var partial_arg_001 = match$2[2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  var match$5 = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
        /* record */[
          /* arguments : array */[sourceRenderGroup[/* meshRenderer */0]],
          /* type_ */match$1[0]
        ],
        /* record */[
          /* arguments : array */[sourceRenderGroup[/* material */1]],
          /* type_ */match$1[1]
        ],
        /* record */[
          /* arguments : array */[targetRenderGroup[/* meshRenderer */0]],
          /* type_ */match$4[0]
        ],
        /* record */[
          /* arguments : array */[targetRenderGroup[/* material */1]],
          /* type_ */match$4[1]
        ],
        /* record */[
          /* arguments : array */[gameObject],
          /* type_ : GameObject */0
        ]
      ], (function (param, param$1, param$2, param$3, param$4, param$5) {
          return _replaceRenderGroup(partial_arg, param, param$1, param$2, param$3, param$4, param$5);
        }), /* tuple */[
        match$3[1],
        match$3[2]
      ]);
  return StateLogicService$WonderEditor.refreshEditAndRunEngineState(match$5[0], match$5[1]);
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
