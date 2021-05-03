

import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as CameraPosUtils$WonderEditor from "../../init/initTransformGizmosJob/rotation/CameraPosUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RenderJobEngineService$WonderEditor from "../../../../../../service/state/engine/job/RenderJobEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../service/state/engine/TransformEngineService.js";
import * as GLSLLocationEngineService$WonderEditor from "../../../../../../service/state/engine/GLSLLocationEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as ComputeRotationGizmosUtils$WonderEditor from "../../init/initTransformGizmosJob/rotation/ComputeRotationGizmosUtils.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../../../service/state/engine/DeviceManagerEngineService.js";
import * as RenderTransformGizmosUtils$WonderEditor from "./RenderTransformGizmosUtils.js";
import * as NoMaterialShaderEngineService$WonderEditor from "../../../../../../service/state/engine/NoMaterialShaderEngineService.js";
import * as DataRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/rotation/DataRotationGizmoSceneViewEditorService.js";

function prepareRotationGlState(engineState) {
  var gl = DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState);
  return DeviceManagerEngineService$WonderEditor.setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, DeviceManagerEngineService$WonderEditor.setBlend(true, DeviceManagerEngineService$WonderEditor.setDepthTest(false, engineState)));
}

function restoreRotationGlState(engineState) {
  DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState);
  return DeviceManagerEngineService$WonderEditor.setBlend(false, DeviceManagerEngineService$WonderEditor.setDepthTest(true, engineState));
}

function getRenderDataArr(gameObjectData, engineState) {
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
                      }), RenderTransformGizmosUtils$WonderEditor.getRenderData(param[0], engineState));
                if (match !== undefined) {
                  return ArrayService$WonderEditor.push(match, renderDataArr);
                } else {
                  return renderDataArr;
                }
              }), /* array */[], gameObjectData);
}

function _getNoMaterialShaderData(name, param, param$1) {
  var engineState = param$1[1];
  switch (name) {
    case "u_alpha" : 
        var match = ComputeRotationGizmosUtils$WonderEditor.isGizmoUnUsed(param[0], param$1[0], engineState);
        if (match) {
          return DataRotationGizmoSceneViewEditorService$WonderEditor.getAlphaForUnUsedGizmo(/* () */0);
        } else {
          return 1.0;
        }
    case "u_cameraPosInLocalCoordSystem" : 
        return CameraPosUtils$WonderEditor.getCameraPosInLocalCoordSystem(param[3], TransformEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(param[1], engineState), engineState);
    case "u_color" : 
        return BasicMaterialEngineService$WonderEditor.getColor(param[2], engineState);
    default:
      throw [
            Caml_builtin_exceptions.match_failure,
            /* tuple */[
              "RenderRotationGizmosUtils.re",
              46,
              2
            ]
          ];
  }
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
            return param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                        name,
                        pos
                      ], _getNoMaterialShaderData(name, /* tuple */[
                            gizmoType,
                            transformIndex,
                            materialIndex,
                            cameraPos
                          ], /* tuple */[
                            editorState,
                            engineState
                          ]));
          } else {
            return /* () */0;
          }
        }), NoMaterialShaderEngineService$WonderEditor.unsafeGetUniformSendData(param[3], engineState));
  return engineState;
}

function render(editorState, renderDataArr, gl, engineState) {
  var rotationGizmoNoMaterialShaderIndex = NoMaterialShaderEngineService$WonderEditor.unsafeGetNoMaterialShader("rotation_gizmo_for_editor", engineState);
  var cameraPos = CameraPosUtils$WonderEditor.getCameraPos(editorState, engineState);
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, param) {
                var geometryIndex = param[4];
                var transformIndex = param[1];
                return RenderJobEngineService$WonderEditor.draw(gl, MeshRendererEngineService$WonderEditor.getGlDrawMode(gl, param[3], engineState), geometryIndex, _sendUniformNoMaterialShaderData(gl, /* tuple */[
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

export {
  prepareRotationGlState ,
  restoreRotationGlState ,
  getRenderDataArr ,
  _getNoMaterialShaderData ,
  _sendUniformNoMaterialShaderData ,
  render ,
  
}
/* ArrayService-WonderEditor Not a pure module */
