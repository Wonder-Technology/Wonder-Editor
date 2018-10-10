open Wonderjs;

open InspectorComponentType;

let addComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | RenderGroup =>
    let defaultLightMaterial =
      DefaultMaterialEditorService.unsafeGetDefaultLightMaterial(editorState);
    let (engineState, meshRenderer) =
      MeshRendererEngineService.create(engineState);
    let renderGroup =
      RenderGroupEngineService.buildRenderGroup(
        meshRenderer,
        defaultLightMaterial,
      );

    (editorState, engineState)
    |> GameObjectLogicService.addRenderGroup(
         currentSceneTreeNode,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectLightMaterialComponent,
         ),
       );
  | Geometry =>
    /* let editorState = StateEditorService.getState(); */

    let defaultCubeGeometry =
      editorState
      |> AssetGeometryDataEditorService.getGeometryData
      |> (({defaultCubeGeometryIndex}) => defaultCubeGeometryIndex);

    (editorState, engineState)
    |> GameObjectLogicService.addGeometry(
         currentSceneTreeNode,
         defaultCubeGeometry,
       );

  | Light =>
    engineState |> DirectionLightEngineService.isMaxCount ?
      {
        Antd.Message.message
        |> Antd.Message.convertToJsObj
        |> (
          messageObj =>
            messageObj##info(
              "the direction light count is exceed max count !",
              4,
            )
        )
        |> ignore;

        (editorState, engineState);
      } :
      {
        let (engineState, directionLightComponent) =
          engineState |> DirectionLightEngineService.create;

        (editorState, engineState)
        |> GameObjectLogicService.addDirectionLight(
             currentSceneTreeNode,
             directionLightComponent,
           )
        |> (
          ((editorState, engineState)) => (
            editorState,
            engineState
            |> SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials,
          )
        );
      }

  | CameraGroup =>
    let (engineState, cameraComponentRecord) =
      CameraEngineService.createCameraGroup(engineState);

    (editorState, engineState)
    |> GameObjectLogicService.addCameraGroup(
         currentSceneTreeNode,
         cameraComponentRecord,
       );

  | ArcballCameraController =>
    let (engineState, cameraController) =
      engineState |> ArcballCameraEngineService.create;

    let engineState =
      SceneEditorService.getIsRun(editorState) ?
        engineState
        |> GameObjectComponentEngineService.hasBasicCameraViewComponent(
             currentSceneTreeNode,
           ) ?
          engineState
          |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
               currentSceneTreeNode,
             )
          |> BasicCameraViewEngineService.isActiveBasicCameraView(
               _,
               engineState,
             ) ?
            ArcballCameraEngineService.bindArcballCameraControllerEventForGameView(
              cameraController,
              engineState,
            ) :
            engineState :
          engineState :
        engineState;

    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraController(
         currentSceneTreeNode,
         cameraController,
       );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addComponentByType",
        ~description=
          {j|the type:$type_ in inspectorComponentType is can't add |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };