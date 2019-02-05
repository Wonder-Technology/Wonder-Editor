module RenderTranslationGizmos = {
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
         (. renderDataArr, gameObject) => {
           let transform =
             GameObjectComponentEngineService.unsafeGetTransformComponent(
               gameObject,
               engineState,
             );

           switch (
             GameObjectComponentEngineService.getGeometryComponent(
               gameObject,
               engineState,
             )
             |> Js.Option.andThen((. geometry) =>
                  GameObjectComponentEngineService.getBasicMaterialComponent(
                    gameObject,
                    engineState,
                  )
                  |> Js.Option.andThen((. material) =>
                       GameObjectComponentEngineService.getMeshRendererComponent(
                         gameObject,
                         engineState,
                       )
                       |> Js.Option.andThen((. meshRenderer) =>
                            Some((
                              transform,
                              material,
                              meshRenderer,
                              geometry,
                            ))
                          )
                     )
                )
           ) {
           | None => renderDataArr
           | Some(renderData) =>
             renderDataArr |> ArrayService.push(renderData)
           };
         },
         [||],
       );

  let render = (gl, renderDataArr, engineState) =>
    renderDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           engineState,
           (transformIndex, materialIndex, meshRendererIndex, geometryIndex),
         ) => {
           let shaderIndex =
             RenderJobEngineService.getShaderIndex(
               materialIndex,
               engineState,
             );

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
                meshRendererIndex,
                geometryIndex,
              );
         },
         engineState,
       );
};

module RenderRotationGizmos = {
  external vec3ToArray : ((float, float, float)) => array(float) =
    "%identity";

  let prepareRotationGlState = engineState =>
    engineState |> DeviceManagerEngineService.setDepthTest(false);

  let restoreRotationGlState = engineState =>
    engineState |> DeviceManagerEngineService.setDepthTest(true);

  /* TODO refactor: duplicate */
  let getRenderDataArr = (gameObjects, engineState) =>
    gameObjects
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. renderDataArr, gameObject) => {
           let transform =
             GameObjectComponentEngineService.unsafeGetTransformComponent(
               gameObject,
               engineState,
             );

           switch (
             GameObjectComponentEngineService.getGeometryComponent(
               gameObject,
               engineState,
             )
             |> Js.Option.andThen((. geometry) =>
                  GameObjectComponentEngineService.getBasicMaterialComponent(
                    gameObject,
                    engineState,
                  )
                  |> Js.Option.andThen((. material) =>
                       GameObjectComponentEngineService.getMeshRendererComponent(
                         gameObject,
                         engineState,
                       )
                       |> Js.Option.andThen((. meshRenderer) =>
                            Some((
                              transform,
                              material,
                              meshRenderer,
                              geometry,
                            ))
                          )
                     )
                )
           ) {
           | None => renderDataArr
           | Some(renderData) =>
             renderDataArr |> ArrayService.push(renderData)
           };
         },
         [||],
       );

  let _sendUniformNoMaterialShaderData =
      (
        gl,
        transformIndex,
        materialIndex,
        noMaterialShaderIndex,
        cameraPos,
        engineState,
      ) => {
    NoMaterialShaderEngineService.unsafeGetUniformSendData(
      noMaterialShaderIndex,
      engineState,
    )
    |> WonderCommonlib.ArrayService.forEach(
         (.
           {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: Wonderjs.GLSLSenderType.uniformNoMaterialShaderSendCachableData,
         ) =>
         GLSLLocationEngineService.isUniformLocationExist(pos) ?
           {
             /* TODO refactor(extend): need refactor with engine! */
             let data =
               switch (name) {
               | "u_color" =>
                 BasicMaterialEngineService.getColor(
                   materialIndex,
                   engineState,
                 )
               | "u_cameraPosInLocalCoordSystem" =>
                 Wonderjs.Vector3Service.transformMat4Tuple(
                   cameraPos,
                   TransformEngineService.getLocalToWorldMatrixTypeArray(
                     transformIndex,
                     engineState,
                   )
                   |> Wonderjs.Matrix4Service.invert(
                        _,
                        Wonderjs.Matrix4Service.createIdentityMatrix4(),
                      ),
                 )
                 |> vec3ToArray
               };

             sendDataFunc(. gl, shaderCacheMap, (name, pos), data);
           } :
           /* sendDataFunc(.
                gl,
                shaderCacheMap,
                (name, pos),
                getDataFunc(. getRenderDataSubState),
              ) : */
           ()
       );

    engineState;
  };

  let render = (editorState, gl, renderDataArr, engineState) => {
    let rotationGizmoNoMaterialShaderIndex =
      NoMaterialShaderEngineService.unsafeGetNoMaterialShader(
        "rotation_gizmo_for_editor",
        engineState,
      );

    /* TODO finish */
    /* let cameraPosInLocalCoordSystem =
       CameraPosUtils.getCameraPosInLocalCoordSystem(

       ); */

    let cameraPos = CameraPosUtils.getCameraPos(editorState, engineState);

    renderDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           engineState,
           (transformIndex, materialIndex, meshRendererIndex, geometryIndex),
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
                transformIndex,
                materialIndex,
                rotationGizmoNoMaterialShaderIndex,
                cameraPos,
              )
           |> RenderJobEngineService.draw(
                gl,
                meshRendererIndex,
                geometryIndex,
              ),
         engineState,
       );
  };
};

let _getTranslationAxisGameObjects = (editorState, engineState) =>
  ArrayService.fastConcatArrays([|
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
        editorState,
      ),
      engineState,
    ),
  |]);

let _getTranslationPlaneGameObjects = (editorState, engineState) =>
  ArrayService.fastConcatArrays([|
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
  |]);

let _renderTransformGameObjects =
    (
      gameObjects,
      (
        getRenderDataArrFunc,
        prepareGlStateFunc,
        renderFunc,
        restoreGlStateFunc,
      ),
      engineState,
    ) => {
  let renderDataArr = getRenderDataArrFunc(gameObjects, engineState);
  let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

  let engineState = engineState |> prepareGlStateFunc;

  let engineState = renderFunc(gl, renderDataArr, engineState);

  let engineState = engineState |> restoreGlStateFunc;

  engineState;
};

/* let _renderTranslationGameObjects =
       (gameObjects, (prepareGlStateFunc, restoreGlStateFunc), engineState) => {
     let renderDataArr =
       RenderTranslationGizmos.getRenderDataArr(gameObjects, engineState);
     let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

     let engineState = engineState |> prepareGlStateFunc;

     let engineState =
       RenderTranslationGizmos.render(gl, renderDataArr, engineState);

     let engineState = engineState |> restoreGlStateFunc;

     engineState;
   }; */

let _renderTranslationGizmos = (editorState, engineState) => {
  let translationAxisGameObjects =
    _getTranslationAxisGameObjects(editorState, engineState);

  let translationPlaneGameObjects =
    _getTranslationPlaneGameObjects(editorState, engineState);

  engineState
  |> _renderTransformGameObjects(
       translationAxisGameObjects,
       (
         RenderTranslationGizmos.getRenderDataArr,
         RenderTranslationGizmos.prepareTranslationAxisGlState,
         RenderTranslationGizmos.render,
         RenderTranslationGizmos.restoreTranslationAxisGlState,
       ),
     )
  |> _renderTransformGameObjects(
       translationPlaneGameObjects,
       (
         RenderTranslationGizmos.getRenderDataArr,
         RenderTranslationGizmos.prepareTranslationPlaneGlState,
         RenderTranslationGizmos.render,
         RenderTranslationGizmos.restoreTranslationPlaneGlState,
       ),
     );
};

let _getRotationGameObjects = (editorState, engineState) =>
  ArrayService.fastConcatArrays([|
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
        editorState,
      ),
      engineState,
    ),
  |]);

let _renderRotationGizmos = (editorState, engineState) =>
  engineState
  |> _renderTransformGameObjects(
       _getRotationGameObjects(editorState, engineState),
       (
         RenderRotationGizmos.getRenderDataArr,
         RenderRotationGizmos.prepareRotationGlState,
         RenderRotationGizmos.render(editorState),
         RenderRotationGizmos.restoreRotationGlState,
       ),
     );

let renderJob = (_, engineState) => {
  open SceneViewType;

  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTransformGizmoRender(
    editorState,
  ) ?
    {
      let currentSceneTreeNode =
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

      switch (
        CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType(
          editorState,
        )
      ) {
      | Translation => _renderTranslationGizmos(editorState, engineState)
      | Rotation => _renderRotationGizmos(editorState, engineState)
      };
    } :
    engineState;
};