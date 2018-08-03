open InspectorComponentType;

open CameraComponentType;

let removeComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | MeshRenderer =>
    let meshRenderer =
      engineState
      |> GameObjectComponentEngineService.getMeshRendererComponent(
           currentSceneTreeNode,
         );
    (editorState, engineState)
    |> GameObjectLogicService.disposeMeshRendererComponent(
         currentSceneTreeNode,
         meshRenderer,
       );
  | Light =>
    let lightType =
      MainEditorLightUtils.getLightTypeByGameObject(
        currentSceneTreeNode,
        engineState,
      );

    (editorState, engineState)
    |> MainEditorLightUtils.disposeLightByLightType(
         lightType,
         currentSceneTreeNode,
       );

  | Material =>
    let materialType =
      MainEditorMaterialUtils.getMaterialTypeByGameObject(
        currentSceneTreeNode,
        engineState,
      );

    (editorState, engineState)
    |> MainEditorMaterialUtils.disposeMaterialByMaterialType(
         materialType,
         currentSceneTreeNode,
       );

  | Camera =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeCameraComponent(
         currentSceneTreeNode,
         {
           basicCameraView:
             engineState
             |> GameObjectComponentEngineService.getBasicCameraViewComponent(
                  currentSceneTreeNode,
                ),
           perspectiveCameraProjection:
             engineState
             |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
                  currentSceneTreeNode,
                ),
         },
       )

  | ArcballCameraController =>
    let arcballCameraController =
      engineState
      |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
           currentSceneTreeNode,
         );

    (editorState, engineState)
    |> GameObjectLogicService.disposeArcballCameraControllerComponent(
         currentSceneTreeNode,
         arcballCameraController,
       );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="removeComponentByType",
        ~description=
          {j|the type_:$type_ in InspectorComponentType is can't remove|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };