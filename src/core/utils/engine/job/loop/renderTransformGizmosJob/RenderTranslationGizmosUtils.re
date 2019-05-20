let prepareTranslationAxisGlState = engineState =>
  engineState |> DeviceManagerEngineService.setDepthTest(false);

let restoreTranslationAxisGlState = engineState =>
  engineState |> DeviceManagerEngineService.setDepthTest(true);

let prepareTranslationPlaneGlState = engineState => {
  let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

  engineState
  |> DeviceManagerEngineService.setDepthWrite(false)
  |> DeviceManagerEngineService.setDepthTest(false)
  |> DeviceManagerEngineService.setSide(Wonderjs.DeviceManagerType.BOTH)
  |> DeviceManagerEngineService.setBlend(true)
  |> DeviceManagerEngineService.setBlendFunc(
       Gl.getSrcAlpha(gl),
       Gl.getOneMinusSrcAlpha(gl),
     );
};

let restoreTranslationPlaneGlState = engineState => {
  let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

  engineState
  |> DeviceManagerEngineService.setDepthWrite(true)
  |> DeviceManagerEngineService.setDepthTest(true)
  |> DeviceManagerEngineService.setSide(Wonderjs.DeviceManagerType.FRONT)
  |> DeviceManagerEngineService.setBlend(false);
};

let getRenderDataArr = (gameObjects, engineState) =>
  gameObjects
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. renderDataArr, gameObject) =>
         switch (
           RenderTransformGizmosUtils.getRenderData(gameObject, engineState)
         ) {
         | None => renderDataArr
         | Some(renderData) => renderDataArr |> ArrayService.push(renderData)
         },
       [||],
     );

let render = (renderDataArr, gl, engineState) =>
  renderDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         engineState,
         (transformIndex, materialIndex, meshRendererIndex, geometryIndex),
       ) => {
         let shaderIndex =
           RenderJobEngineService.getShaderIndex(materialIndex, engineState);

         engineState
         |> RenderJobEngineService.useByShaderIndex(gl, shaderIndex)
         |> RenderJobEngineService.sendAttributeData(
              gl,
              (shaderIndex, geometryIndex),
            )
         |> RenderJobEngineService.sendUniformRenderObjectModelData(
              gl,
              shaderIndex,
              transformIndex,
            )
         |> RenderJobEngineService.sendUniformRenderObjectMaterialData(
              gl,
              shaderIndex,
              materialIndex,
            )
         |> RenderJobEngineService.draw(
              gl,
              MeshRendererEngineService.getGlDrawMode(
                gl,
                meshRendererIndex,
                engineState,
              ),
              geometryIndex,
            );
       },
       engineState,
     );