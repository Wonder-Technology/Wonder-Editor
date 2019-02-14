

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_builtin_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as CameraPosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/rotation/CameraPosUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as RenderJobEngineService$WonderEditor from "../../../service/state/engine/job/RenderJobEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as GLSLLocationEngineService$WonderEditor from "../../../service/state/engine/GLSLLocationEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../service/state/engine/BasicMaterialEngineService.js";
import * as ComputeRotationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/rotation/ComputeRotationGizmosUtils.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../service/state/engine/DeviceManagerEngineService.js";
import * as NoMaterialShaderEngineService$WonderEditor from "../../../service/state/engine/NoMaterialShaderEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as DataRotationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/rotation/DataRotationGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as IsTransformGizmoRenderSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/IsTransformGizmoRenderSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

function getRenderData(gameObject, engineState) {
  var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState);
  return Js_option.andThen((function (geometry) {
                return Js_option.andThen((function (material) {
                              return Js_option.andThen((function (meshRenderer) {
                                            return /* tuple */[
                                                    transform,
                                                    material,
                                                    meshRenderer,
                                                    geometry
                                                  ];
                                          }), GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent(gameObject, engineState));
                            }), GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject, engineState));
              }), GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState));
}

var RenderTransformGizmos = /* module */[/* getRenderData */getRenderData];

function prepareTranslationAxisGlState(engineState) {
  return DeviceManagerEngineService$WonderEditor.setDepthTest(false, engineState);
}

function restoreTranslationAxisGlState(engineState) {
  return DeviceManagerEngineService$WonderEditor.setDepthTest(true, engineState);
}

function prepareTranslationPlaneGlState(engineState) {
  var gl = DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState);
  return DeviceManagerEngineService$WonderEditor.setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, DeviceManagerEngineService$WonderEditor.setBlend(true, DeviceManagerEngineService$WonderEditor.setSide(/* BOTH */1, DeviceManagerEngineService$WonderEditor.setDepthTest(false, DeviceManagerEngineService$WonderEditor.setDepthWrite(false, engineState)))));
}

function restoreTranslationPlaneGlState(engineState) {
  DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState);
  return DeviceManagerEngineService$WonderEditor.setBlend(false, DeviceManagerEngineService$WonderEditor.setSide(/* FRONT */2, DeviceManagerEngineService$WonderEditor.setDepthTest(true, DeviceManagerEngineService$WonderEditor.setDepthWrite(true, engineState))));
}

function getRenderDataArr(gameObjects, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (renderDataArr, gameObject) {
                var match = getRenderData(gameObject, engineState);
                if (match !== undefined) {
                  return ArrayService$WonderEditor.push(match, renderDataArr);
                } else {
                  return renderDataArr;
                }
              }), /* array */[], gameObjects);
}

function render(renderDataArr, gl, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, param) {
                var geometryIndex = param[3];
                var materialIndex = param[1];
                var shaderIndex = RenderJobEngineService$WonderEditor.getShaderIndex(materialIndex, engineState);
                return RenderJobEngineService$WonderEditor.draw(gl, param[2], geometryIndex, RenderJobEngineService$WonderEditor.sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex, RenderJobEngineService$WonderEditor.sendUniformRenderObjectModelData(gl, shaderIndex, param[0], RenderJobEngineService$WonderEditor.sendAttributeData(gl, /* tuple */[
                                        shaderIndex,
                                        geometryIndex
                                      ], RenderJobEngineService$WonderEditor.useByShaderIndex(gl, shaderIndex, engineState)))));
              }), engineState, renderDataArr);
}

var RenderTranslationGizmos = /* module */[
  /* prepareTranslationAxisGlState */prepareTranslationAxisGlState,
  /* restoreTranslationAxisGlState */restoreTranslationAxisGlState,
  /* prepareTranslationPlaneGlState */prepareTranslationPlaneGlState,
  /* restoreTranslationPlaneGlState */restoreTranslationPlaneGlState,
  /* getRenderDataArr */getRenderDataArr,
  /* render */render
];

function prepareRotationGlState(engineState) {
  var gl = DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState);
  return DeviceManagerEngineService$WonderEditor.setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, DeviceManagerEngineService$WonderEditor.setBlend(true, DeviceManagerEngineService$WonderEditor.setDepthTest(false, engineState)));
}

function restoreRotationGlState(engineState) {
  DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState);
  return DeviceManagerEngineService$WonderEditor.setBlend(false, DeviceManagerEngineService$WonderEditor.setDepthTest(true, engineState));
}

function getRenderDataArr$1(gameObjectData, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (renderDataArr, param) {
                var gizmoType = param[1];
                var match = Js_option.andThen((function (param) {
                        return /* tuple */[
                                gizmoType,
                                param[0],
                                param[1],
                                param[2],
                                param[3]
                              ];
                      }), getRenderData(param[0], engineState));
                if (match !== undefined) {
                  return ArrayService$WonderEditor.push(match, renderDataArr);
                } else {
                  return renderDataArr;
                }
              }), /* array */[], gameObjectData);
}

function _sendUniformNoMaterialShaderData(gl, param, editorState, engineState) {
  var cameraPos = param[4];
  var materialIndex = param[2];
  var transformIndex = param[1];
  var gizmoType = param[0];
  ArrayService$WonderCommonlib.forEach((function (param) {
          var pos = param[/* pos */2];
          var name = param[/* name */1];
          var match = GLSLLocationEngineService$WonderEditor.isUniformLocationExist(pos);
          if (match) {
            var data;
            switch (name) {
              case "u_alpha" : 
                  var match$1 = ComputeRotationGizmosUtils$WonderEditor.isGizmoUnUsed(gizmoType, editorState, engineState);
                  data = match$1 ? DataRotationGizmoSceneViewEditorService$WonderEditor.getAlphaForUnUsedGizmo(/* () */0) : 1.0;
                  break;
              case "u_cameraPosInLocalCoordSystem" : 
                  data = CameraPosUtils$WonderEditor.getCameraPosInLocalCoordSystem(cameraPos, TransformEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(transformIndex, engineState), engineState);
                  break;
              case "u_color" : 
                  data = BasicMaterialEngineService$WonderEditor.getColor(materialIndex, engineState);
                  break;
              default:
                throw [
                      Caml_builtin_exceptions.match_failure,
                      /* tuple */[
                        "RenderTransformGizmosJob.re",
                        188,
                        15
                      ]
                    ];
            }
            return param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                        name,
                        pos
                      ], data);
          } else {
            return /* () */0;
          }
        }), NoMaterialShaderEngineService$WonderEditor.unsafeGetUniformSendData(param[3], engineState));
  return engineState;
}

function render$1(editorState, renderDataArr, gl, engineState) {
  var rotationGizmoNoMaterialShaderIndex = NoMaterialShaderEngineService$WonderEditor.unsafeGetNoMaterialShader("rotation_gizmo_for_editor", engineState);
  var cameraPos = CameraPosUtils$WonderEditor.getCameraPos(editorState, engineState);
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, param) {
                var geometryIndex = param[4];
                var transformIndex = param[1];
                return RenderJobEngineService$WonderEditor.draw(gl, param[3], geometryIndex, _sendUniformNoMaterialShaderData(gl, /* tuple */[
                                param[0],
                                transformIndex,
                                param[2],
                                rotationGizmoNoMaterialShaderIndex,
                                cameraPos
                              ], editorState, RenderJobEngineService$WonderEditor.sendUniformRenderObjectModelData(gl, rotationGizmoNoMaterialShaderIndex, transformIndex, RenderJobEngineService$WonderEditor.sendAttributeData(gl, /* tuple */[
                                        rotationGizmoNoMaterialShaderIndex,
                                        geometryIndex
                                      ], RenderJobEngineService$WonderEditor.useByShaderIndex(gl, rotationGizmoNoMaterialShaderIndex, engineState)))));
              }), engineState, renderDataArr);
}

var RenderRotationGizmos = /* module */[
  /* prepareRotationGlState */prepareRotationGlState,
  /* restoreRotationGlState */restoreRotationGlState,
  /* getRenderDataArr */getRenderDataArr$1,
  /* _sendUniformNoMaterialShaderData */_sendUniformNoMaterialShaderData,
  /* render */render$1
];

function prepareScaleGlState(engineState) {
  return DeviceManagerEngineService$WonderEditor.setDepthTest(false, engineState);
}

function restoreScaleGlState(engineState) {
  return DeviceManagerEngineService$WonderEditor.setDepthTest(true, engineState);
}

var getRenderDataArr$2 = getRenderDataArr;

var render$2 = render;

var RenderScaleGizmos = /* module */[
  /* prepareScaleGlState */prepareScaleGlState,
  /* restoreScaleGlState */restoreScaleGlState,
  /* getRenderDataArr */getRenderDataArr$2,
  /* render */render$2
];

function _getTranslationAxisGameObjects(editorState, engineState) {
  return ArrayService$WonderEditor.fastConcatArrays(/* array */[
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState), engineState)
            ]);
}

function _getTranslationPlaneGameObjects(editorState, engineState) {
  return ArrayService$WonderEditor.fastConcatArrays(/* array */[
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState), engineState)
            ]);
}

function _renderTransformGameObjects(param, engineState) {
  var gl = DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState);
  var engineState$1 = Curry._1(param[0], engineState);
  return Curry._1(param[2], Curry._2(param[1], gl, engineState$1));
}

function _renderTranslationGizmos(editorState, engineState) {
  var translationAxisGameObjects = _getTranslationAxisGameObjects(editorState, engineState);
  var translationPlaneGameObjects = _getTranslationPlaneGameObjects(editorState, engineState);
  var partial_arg = getRenderDataArr(translationPlaneGameObjects, engineState);
  var partial_arg$1 = getRenderDataArr(translationAxisGameObjects, engineState);
  return _renderTransformGameObjects(/* tuple */[
              prepareTranslationPlaneGlState,
              (function (param, param$1) {
                  return render(partial_arg, param, param$1);
                }),
              restoreTranslationPlaneGlState
            ], _renderTransformGameObjects(/* tuple */[
                  prepareTranslationAxisGlState,
                  (function (param, param$1) {
                      return render(partial_arg$1, param, param$1);
                    }),
                  restoreTranslationAxisGlState
                ], engineState));
}

function _getRotationGameObjectData(editorState) {
  return /* array */[
          /* tuple */[
            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo(editorState),
            /* XYCircle */0
          ],
          /* tuple */[
            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXZCircleGizmo(editorState),
            /* XZCircle */1
          ],
          /* tuple */[
            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationYZCircleGizmo(editorState),
            /* YZCircle */2
          ]
        ];
}

function _renderRotationGizmos(editorState, engineState) {
  var partial_arg = getRenderDataArr$1(_getRotationGameObjectData(editorState), engineState);
  return _renderTransformGameObjects(/* tuple */[
              prepareRotationGlState,
              (function (param, param$1) {
                  return render$1(editorState, partial_arg, param, param$1);
                }),
              restoreRotationGlState
            ], engineState);
}

function _getScaleGameObjects(editorState, engineState) {
  return ArrayService$WonderEditor.fastConcatArrays(/* array */[
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState), engineState),
              /* array */[OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState)]
            ]);
}

function _renderScaleGizmos(editorState, engineState) {
  var scaleGameObjects = _getScaleGameObjects(editorState, engineState);
  var partial_arg = getRenderDataArr(scaleGameObjects, engineState);
  return _renderTransformGameObjects(/* tuple */[
              prepareScaleGlState,
              (function (param, param$1) {
                  return render$2(partial_arg, param, param$1);
                }),
              restoreScaleGlState
            ], engineState);
}

function renderJob(_, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = IsTransformGizmoRenderSceneViewEditorService$WonderEditor.isTransformGizmoRender(editorState);
  if (match) {
    SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
    var match$1 = CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(editorState);
    switch (match$1) {
      case 0 : 
          return _renderTranslationGizmos(editorState, engineState);
      case 1 : 
          return _renderRotationGizmos(editorState, engineState);
      case 2 : 
          return _renderScaleGizmos(editorState, engineState);
      
    }
  } else {
    return engineState;
  }
}

export {
  RenderTransformGizmos ,
  RenderTranslationGizmos ,
  RenderRotationGizmos ,
  RenderScaleGizmos ,
  _getTranslationAxisGameObjects ,
  _getTranslationPlaneGameObjects ,
  _renderTransformGameObjects ,
  _renderTranslationGizmos ,
  _getRotationGameObjectData ,
  _renderRotationGizmos ,
  _getScaleGameObjects ,
  _renderScaleGizmos ,
  renderJob ,
  
}
/* ArrayService-WonderEditor Not a pure module */
