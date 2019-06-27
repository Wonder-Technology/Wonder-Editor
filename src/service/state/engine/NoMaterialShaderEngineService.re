open Wonderjs;

open StateDataMainType;

let unsafeGetNoMaterialShader = (name, {shaderRecord}) =>
  NoMaterialShaderIndexAllShaderService.unsafeGetShaderIndex(name, shaderRecord);

let unsafeGetUniformSendData = (shaderIndex, engineState) => {
  let {glslSenderRecord}: StateRenderType.renderState =
    CreateRenderStateMainService.createRenderState(engineState);

  glslSenderRecord
  |> HandleNoMaterialShaderUniformConfigDataService.unsafeGetUniformSendData(
       shaderIndex,
     );
};