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

  let render = (renderDataArr, gl, engineState) =>
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

  /* TODO refactor: duplicate */
  let getRenderDataArr = (gameObjectData, engineState) =>
    gameObjectData
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. renderDataArr, (gameObject, gizmoType)) => {
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
                              gizmoType,
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
           {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: Wonderjs.GLSLSenderType.uniformNoMaterialShaderSendCachableData,
         ) =>
         GLSLLocationEngineService.isUniformLocationExist(pos) ?
           {
             /* TODO refactor(extend): need refactor with engine! */
             let data =
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
                 BasicMaterialEngineService.getColor(
                   materialIndex,
                   engineState,
                 )
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

             sendDataFunc(.
               gl,
               shaderCacheMap,
               (name, pos),
               data |> Obj.magic,
             );
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
    ((prepareGlStateFunc, renderFunc, restoreGlStateFunc), engineState) => {
  let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

  let engineState = engineState |> prepareGlStateFunc;

  let engineState = renderFunc(gl, engineState);

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
  |> _renderTransformGameObjects((
       RenderTranslationGizmos.prepareTranslationAxisGlState,
       RenderTranslationGizmos.render(
         RenderTranslationGizmos.getRenderDataArr(
           translationAxisGameObjects,
           engineState,
         ),
       ),
       RenderTranslationGizmos.restoreTranslationAxisGlState,
     ))
  |> _renderTransformGameObjects((
       RenderTranslationGizmos.prepareTranslationPlaneGlState,
       RenderTranslationGizmos.render(
         RenderTranslationGizmos.getRenderDataArr(
           translationPlaneGameObjects,
           engineState,
         ),
       ),
       RenderTranslationGizmos.restoreTranslationPlaneGlState,
     ));
};

let _getRotationGameObjectData = editorState => [|
  (
    OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
      editorState,
    ),
    SceneViewType.XYCircle,
  ),
  (
    OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
      editorState,
    ),
    SceneViewType.XZCircle,
  ),
  (
    OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
      editorState,
    ),
    SceneViewType.YZCircle,
  ),
|];

let _renderRotationGizmos = (editorState, engineState) =>
  engineState
  |> _renderTransformGameObjects((
       RenderRotationGizmos.prepareRotationGlState,
       RenderRotationGizmos.render(
         editorState,
         RenderRotationGizmos.getRenderDataArr(
           _getRotationGameObjectData(editorState),
           engineState,
         ),
       ),
       RenderRotationGizmos.restoreRotationGlState,
     ));

let renderJob = (_, engineState) => {
  open SceneViewType;

  /* WonderLog.Log.print("render gizmo") |> ignore; */

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