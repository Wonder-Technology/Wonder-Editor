

import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RenderJobEngineService$WonderEditor from "../../../../../../service/state/engine/job/RenderJobEngineService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../../../service/state/engine/DeviceManagerEngineService.js";
import * as RenderTransformGizmosUtils$WonderEditor from "./RenderTransformGizmosUtils.js";

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
                var match = RenderTransformGizmosUtils$WonderEditor.getRenderData(gameObject, engineState);
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

export {
  prepareTranslationAxisGlState ,
  restoreTranslationAxisGlState ,
  prepareTranslationPlaneGlState ,
  restoreTranslationPlaneGlState ,
  getRenderDataArr ,
  render ,
  
}
/* ArrayService-WonderEditor Not a pure module */
