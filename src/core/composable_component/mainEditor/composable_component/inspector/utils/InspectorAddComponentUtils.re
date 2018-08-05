open Wonderjs;

open InspectorComponentType;

let addComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | RenderGroup =>
    let (engineState, renderGroup) =
      PrimitiveEngineService.createRenderGroup(
        (MeshRendererEngineService.create, LightMaterialEngineService.create),
        engineState,
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
        |> GameObjectLogicService.addDirectionLightComponent(
             currentSceneTreeNode,
             directionLightComponent,
           );
      }

  | CameraGroup =>
    let (engineState, cameraComponentRecord) =
      CameraEngineService.createCameraGroup(engineState);

    (editorState, engineState)
    |> GameObjectLogicService.addCameraGroupComponent(
         currentSceneTreeNode,
         cameraComponentRecord,
       );

  | ArcballCameraController =>
    let (engineState, arcballCameraController) =
      engineState |> ArcballCameraEngineService.create;

    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraControllerComponent(
         currentSceneTreeNode,
         arcballCameraController,
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