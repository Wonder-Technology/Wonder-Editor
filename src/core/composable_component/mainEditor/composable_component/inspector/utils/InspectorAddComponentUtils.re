open InspectorComponentType;

let addComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | MeshRenderer =>
    let (engineState, meshRenderer) =
      engineState |> MeshRendererEngineService.create;
    (editorState, engineState)
    |> GameObjectLogicService.addMeshRendererComponent(
         currentSceneTreeNode,
         meshRenderer,
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

  | Material =>
    let (engineState, lightMaterial) =
      engineState |> LightMaterialEngineService.create;

    (editorState, engineState)
    |> GameObjectLogicService.addLightMaterialComponent(
         currentSceneTreeNode,
         lightMaterial,
       );

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