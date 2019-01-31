module RenderTransformGizmos = {
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
    |> DeviceManagerEngineService.setDepthTest(true)
    |> DeviceManagerEngineService.setDepthWrite(true)
    |> DeviceManagerEngineService.setSide(Wonderjs.DeviceManagerType.FRONT)
    |> DeviceManagerEngineService.setBlend(false);
  };

  let getRenderDataArr =
      (
        gameObjects,
        ({gameObjectRecord}: Wonderjs.StateDataMainType.state) as engineState,
      ) =>
    Wonderjs.(
      gameObjects
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. renderDataArr, gameObject) => {
             let transform =
               GetComponentGameObjectService.unsafeGetTransformComponent(
                 gameObject,
                 gameObjectRecord,
               );

             switch (
               GetComponentGameObjectService.getGeometryComponent(.
                 gameObject,
                 gameObjectRecord,
               )
               |> Js.Option.andThen((. geometry) =>
                    GameObjectComponentEngineService.getBasicMaterialComponent(
                      gameObject,
                      engineState,
                    )
                    |> Js.Option.andThen((. material) =>
                         GetComponentGameObjectService.getMeshRendererComponent(.
                           gameObject,
                           gameObjectRecord,
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
         )
    );

  let _getShaderIndex = (materialIndex, engineState) =>
    Wonderjs.(RenderJobAPI.getShaderIndex(materialIndex, engineState));

  let draw = (gl, renderDataArr, engineState) =>
    Wonderjs.(
      renderDataArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             engineState,
             (
               transformIndex,
               materialIndex,
               meshRendererIndex,
               geometryIndex,
             ),
           ) => {
             let shaderIndex = _getShaderIndex(materialIndex, engineState);

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
         )
    );
};

let _getTranslationAxisGameObjects = (editorState, engineState) =>
  ArrayService.fastConcatArrays([|
    HierarchyGameObjectEngineService.getAllGameObjects(
      TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      TransformGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
        editorState,
      ),
      engineState,
    ),
  |]);

let _getTranslationPlaneGameObjects = (editorState, engineState) =>
  ArrayService.fastConcatArrays([|
    HierarchyGameObjectEngineService.getAllGameObjects(
      TransformGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      TransformGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      TransformGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
  |]);

let _renderTranslationGameObjects =
    (gameObjects, (prepareGlStateFunc, restoreGlStateFunc), engineState) => {
  let renderDataArr =
    RenderTransformGizmos.getRenderDataArr(gameObjects, engineState);
  let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

  let engineState = engineState |> prepareGlStateFunc;

  let engineState =
    RenderTransformGizmos.draw(gl, renderDataArr, engineState);

  let engineState = engineState |> restoreGlStateFunc;

  engineState;
};

let renderJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTranslationWholeGizmoRender(
    editorState,
  ) ?
    switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
    | None => engineState
    | Some(currentSceneTreeNode) =>
      let translationAxisGameObjects =
        _getTranslationAxisGameObjects(editorState, engineState);

      let translationPlaneGameObjects =
        _getTranslationPlaneGameObjects(editorState, engineState);

      engineState
      |> _renderTranslationGameObjects(
           translationAxisGameObjects,
           (
             RenderTransformGizmos.prepareTranslationAxisGlState,
             RenderTransformGizmos.restoreTranslationAxisGlState,
           ),
         )
      |> _renderTranslationGameObjects(
           translationPlaneGameObjects,
           (
             RenderTransformGizmos.prepareTranslationPlaneGlState,
             RenderTransformGizmos.restoreTranslationPlaneGlState,
           ),
         );
    } :
    engineState;
};