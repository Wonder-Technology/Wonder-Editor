/* TODO refactor: remove Wonderjs???
   extract RenderEngineService(wonder.js should extract RenderAPI?)


   TODO refactor: not use engineRenderState here!!!(only use engineState)

   */

module RenderTransformGameObjects = {
  let prepareGlState = engineState =>
    engineState |> DeviceManagerEngineService.setDepthTest(false);

  let restoreGlState = engineState =>
    engineState |> DeviceManagerEngineService.setDepthTest(true);

  let _getMaterialComponent = (gameObject, engineState) =>
    GameObjectComponentEngineService.getBasicMaterialComponent(
      gameObject,
      engineState,
    );

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
                    _getMaterialComponent(gameObject, engineState)
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

  let _getShaderIndex = (materialIndex, engineRenderState) =>
    Wonderjs.(
      ShaderIndexRenderService.getShaderIndex(
        materialIndex,
        ShaderIndexBasicMaterialRenderService.getShaderIndex,
        engineRenderState,
      )
    );

  let draw = (gl, renderDataArr, engineRenderState) =>
    Wonderjs.(
      renderDataArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             engineRenderState,
             (
               transformIndex,
               materialIndex,
               meshRendererIndex,
               geometryIndex,
             ),
           ) => {
             let shaderIndex =
               _getShaderIndex(materialIndex, engineRenderState);

             let engineRenderState =
               engineRenderState
               |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);

             let sendRenderDataSubState =
               CreateSendRenederDataSubStateRenderService.createState(
                 engineRenderState,
               );

             /* TODO private??? change to public???*/
             RenderJobUtils._sendAttributeData(
               gl,
               (shaderIndex, geometryIndex),
               sendRenderDataSubState,
               engineRenderState,
             );

             let getRenderDataSubState =
               CreateGetRenederDataSubStateRenderService.createState(
                 engineRenderState,
               );

             let engineRenderState =
               RenderJobUtils._sendUniformRenderObjectModelData(
                 gl,
                 shaderIndex,
                 transformIndex,
                 getRenderDataSubState,
                 engineRenderState,
               )
               |> RenderJobUtils._sendUniformRenderObjectMaterialData(
                    gl,
                    shaderIndex,
                    materialIndex,
                    getRenderDataSubState,
                  );

             engineRenderState
             |> RenderJobUtils.draw(gl, meshRendererIndex, geometryIndex);

             engineRenderState;
           },
           engineRenderState,
         )
    );
};

let _moveAndRotateTranslationWholeGameObjectToCurrentSceneTreeNode =
    (currentGameObject, translationWholeGameObject, editorState, engineState) => {
  let currentGameObjectTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      currentGameObject,
      engineState,
    );
  let translationWholeGameObjectTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      translationWholeGameObject,
      engineState,
    );

  engineState
  |> TransformEngineService.setPosition(
       translationWholeGameObjectTransform,
       TransformEngineService.getPosition(
         currentGameObjectTransform,
         engineState,
       ),
     )
  |> TransformEngineService.setEulerAngles(
       translationWholeGameObjectTransform,
       TransformEngineService.getEulerAngles(
         currentGameObjectTransform,
         engineState,
       ),
     );
};

let renderJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  IsTransformGameObjectRenderSceneViewEditorService.isTranslationWholeGameObjectRender(
    editorState,
  ) ?
    switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
    | None => engineState
    | Some(currentGameObject) =>
      let translationWholeGameObject =
        TransformGameObjectSceneViewEditorService.unsafeGetTranslationWholeGameObject(
          editorState,
        );

      let engineState =
        engineState
        |> _moveAndRotateTranslationWholeGameObjectToCurrentSceneTreeNode(
             currentGameObject,
             translationWholeGameObject,
             editorState,
           );

      let renderDataArr =
        RenderTransformGameObjects.getRenderDataArr(
          HierarchyGameObjectEngineService.getAllGameObjects(
            translationWholeGameObject,
            engineState,
          ),
          engineState,
        );
      let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

      let engineState =
        engineState |> RenderTransformGameObjects.prepareGlState;

      let engineRenderState =
        Wonderjs.CreateRenderStateMainService.createRenderState(engineState);

      /* TODO refactor: shouldn't operate renderState in editor!!!  */
      let engineRenderState =
        RenderTransformGameObjects.draw(gl, renderDataArr, engineRenderState);

      let engineState =
        engineState |> RenderTransformGameObjects.restoreGlState;

      engineState;
    } :
    engineState;
};