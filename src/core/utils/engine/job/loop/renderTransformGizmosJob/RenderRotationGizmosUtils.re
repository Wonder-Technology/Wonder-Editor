external vec3ToArray: ((float, float, float)) => array(float) = "%identity";

let prepareRotationGlState = engineState => {
  let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

  engineState
  |> DeviceManagerEngineService.setDepthTest(false)
  |> DeviceManagerEngineService.setBlend(true)
  |> DeviceManagerEngineService.setBlendFunc(
       Gl.getSrcAlpha(gl),
       Gl.getOneMinusSrcAlpha(gl),
     );
};

let restoreRotationGlState = engineState => {
  let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

  engineState
  |> DeviceManagerEngineService.setDepthTest(true)
  |> DeviceManagerEngineService.setBlend(false);
};

let getRenderDataArr = (gameObjectData, engineState) =>
  gameObjectData
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. renderDataArr, (gameObject, gizmoType)) =>
         switch (
           RenderTransformGizmosUtils.getRenderData(gameObject, engineState)
           |> Js.Option.andThen(
                (. (transform, material, meshRenderer, geometry)) =>
                Some((gizmoType, transform, material, meshRenderer, geometry))
              )
         ) {
         | None => renderDataArr
         | Some(renderData) => renderDataArr |> ArrayService.push(renderData)
         },
       [||],
     );

let _getNoMaterialShaderData =
    (
      name,
      (gizmoType, transformIndex, materialIndex, cameraPos),
      (editorState, engineState),
    ) =>
  switch (name) {
  | "u_alpha" =>
    ComputeRotationGizmosUtils.isGizmoUnUsed(
      gizmoType,
      editorState,
      engineState,
    ) ?
      DataRotationGizmoSceneViewEditorService.getAlphaForUnUsedGizmo() :
      1.0 |> Obj.magic
  | "u_color" =>
    BasicMaterialEngineService.getColor(materialIndex, engineState)
    |> Obj.magic
  | "u_cameraPosInLocalCoordSystem" =>
    CameraPosUtils.getCameraPosInLocalCoordSystem(
      cameraPos,
      TransformEngineService.getLocalToWorldMatrixTypeArray(
        transformIndex,
        engineState,
      ),
      engineState,
    )
    |> vec3ToArray
    |> Obj.magic
  };

let _sendUniformNoMaterialShaderData =
    (
      gl,
      (
        gizmoType,
        transformIndex,
        materialIndex,
        noMaterialShaderIndex,
        cameraPos,
      ),
      editorState,
      engineState,
    ) => {
  NoMaterialShaderEngineService.unsafeGetUniformSendData(
    noMaterialShaderIndex,
    engineState,
  )
  |> WonderCommonlib.ArrayService.forEach(
       (.
         {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: Wonderjs.AllGLSLSenderType.uniformNoMaterialShaderSendData,
       ) =>
       GLSLLocationEngineService.isUniformLocationExist(pos) ?
         /* TODO refactor(extend): need refactor with engine! */
         (Obj.magic(sendDataFunc))(.
           gl,
           shaderCacheMap,
           (name, pos),
           _getNoMaterialShaderData(
             name,
             (gizmoType, transformIndex, materialIndex, cameraPos),
             (editorState, engineState),
           )
           |> Obj.magic,
         ) :
         ()
     );

  engineState;
};

let render = (editorState, renderDataArr, gl, engineState) => {
  let rotationGizmoNoMaterialShaderIndex =
    NoMaterialShaderEngineService.unsafeGetNoMaterialShader(
      "rotation_gizmo_for_editor",
      engineState,
    );

  let cameraPos = CameraPosUtils.getCameraPos(editorState, engineState);

  renderDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         engineState,
         (
           name,
           transformIndex,
           materialIndex,
           meshRendererIndex,
           geometryIndex,
         ),
       ) =>
         engineState
         |> RenderJobEngineService.useByShaderIndex(
              gl,
              rotationGizmoNoMaterialShaderIndex,
            )
         |> RenderJobEngineService.sendAttributeData(
              gl,
              (rotationGizmoNoMaterialShaderIndex, geometryIndex),
            )
         |> RenderJobEngineService.sendUniformRenderObjectModelData(
              gl,
              rotationGizmoNoMaterialShaderIndex,
              transformIndex,
            )
         |> _sendUniformNoMaterialShaderData(
              gl,
              (
                name,
                transformIndex,
                materialIndex,
                rotationGizmoNoMaterialShaderIndex,
                cameraPos,
              ),
              editorState,
            )
         |> RenderJobEngineService.draw(
              gl,
              MeshRendererEngineService.getGlDrawMode(
                gl,
                meshRendererIndex,
                engineState,
              ),
              geometryIndex,
            ),
       engineState,
     );
};