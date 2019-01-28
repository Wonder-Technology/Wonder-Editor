/* TODO refactor: remove Wonderjs???
   extract RenderEngineService(wonder.js should extract RenderAPI?)


   TODO refactor: not use engineState here!!!(only use engineState)

   */

module RenderTransformGizmos = {
  let prepareGlState = engineState =>
    engineState |> DeviceManagerEngineService.setDepthTest(false);

  let restoreGlState = engineState =>
    engineState |> DeviceManagerEngineService.setDepthTest(true);

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

let renderJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTranslationWholeGizmoRender(
    editorState,
  ) ?
    switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
    | None => engineState
    | Some(currentSceneTreeNode) =>
      let translationWholeGizmo =
        TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
          editorState,
        );

      let renderDataArr =
        RenderTransformGizmos.getRenderDataArr(
          HierarchyGameObjectEngineService.getAllGameObjects(
            translationWholeGizmo,
            engineState,
          ),
          engineState,
        );
      let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

      let engineState = engineState |> RenderTransformGizmos.prepareGlState;

      let engineState =
        RenderTransformGizmos.draw(gl, renderDataArr, engineState);

      let engineState = engineState |> RenderTransformGizmos.restoreGlState;

      engineState;
    } :
    engineState;
};