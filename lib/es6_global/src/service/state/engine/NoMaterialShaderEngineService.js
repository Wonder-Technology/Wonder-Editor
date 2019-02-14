

import * as CreateRenderStateMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/render/CreateRenderStateMainService.js";
import * as NoMaterialShaderIndexShaderService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/all/shader/NoMaterialShaderIndexShaderService.js";
import * as HandleNoMaterialShaderUniformConfigDataService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/all/sender/uniform/no_material_shader/HandleNoMaterialShaderUniformConfigDataService.js";

function unsafeGetNoMaterialShader(name, param) {
  return NoMaterialShaderIndexShaderService$Wonderjs.unsafeGetShaderIndex(name, param[/* shaderRecord */25]);
}

function unsafeGetUniformSendData(shaderIndex, engineState) {
  var match = CreateRenderStateMainService$Wonderjs.createRenderState(engineState);
  return HandleNoMaterialShaderUniformConfigDataService$Wonderjs.unsafeGetUniformSendData(shaderIndex, match[/* glslSenderRecord */3]);
}

export {
  unsafeGetNoMaterialShader ,
  unsafeGetUniformSendData ,
  
}
/* CreateRenderStateMainService-Wonderjs Not a pure module */
