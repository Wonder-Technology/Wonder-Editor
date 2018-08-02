open InspectorComponentType;

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
    |> MainEditorMaterialUtils.disposeMaterialByMaterialType(materialType);

  | BasicCameraView =>
    let cameraView =
      engineState
      |> GameObjectComponentEngineService.getBasicCameraViewComponent(
           currentSceneTreeNode,
         );

    (editorState, engineState)
    |> GameObjectLogicService.disposeBasicCameraViewComponent(
         currentSceneTreeNode,
         cameraView,
       );

  | PerspectiveCameraProjection =>
    let perspectiveCamera =
      engineState
      |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
           currentSceneTreeNode,
         );

    (editorState, engineState)
    |> GameObjectLogicService.disposePerspectiveCameraProjectionComponent(
         currentSceneTreeNode,
         perspectiveCamera,
       );

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
        ~description={j|the type_:$type_ can't remove|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };