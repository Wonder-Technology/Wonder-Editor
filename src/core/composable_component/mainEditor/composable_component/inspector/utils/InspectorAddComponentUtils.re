open AddableComponentType;

let addComponentByType =
    (type_, currentSceneTreeNode, (editState, engineState)) =>
  switch (type_) {
  | MeshRenderer =>
    let (engineState, meshRenderer) =
      engineState |> MeshRendererEngineService.create;
    (editState, engineState)
    |> GameObjectLogicService.addMeshRendererComponent(
         currentSceneTreeNode,
         meshRenderer,
       );
  | Light =>
    let (engineState, directionLightComponent) =
      engineState |> DirectionLightEngineService.create;

    (editState, engineState)
    |> GameObjectLogicService.addDirectionLightComponent(
         currentSceneTreeNode,
         directionLightComponent,
       );

  | Material =>
    let (engineState, lightMaterial) =
      engineState |> LightMaterialEngineService.create;

    (editState, engineState)
    |> GameObjectLogicService.addLightMaterialComponent(
         currentSceneTreeNode,
         lightMaterial,
       );

  | BasicCameraView =>
    let (engineState, cameraView) =
      BasicCameraViewEngineService.create(engineState);

    (editState, engineState)
    |> GameObjectLogicService.addBasicCameraViewComponent(
         currentSceneTreeNode,
         cameraView,
       );

  | PerspectiveCameraProjection =>
    let (engineState, perspectiveCamera) =
      engineState |> CameraEngineService.createPerspectiveCamera;

    (editState, engineState)
    |> GameObjectLogicService.addPerspectiveCameraProjectionComponent(
         currentSceneTreeNode,
         perspectiveCamera,
       );

  | ArcballCameraController =>
    let (engineState, arcballCameraController) =
      engineState |> ArcballCameraEngineService.create;

    (editState, engineState)
    |> GameObjectLogicService.addArcballCameraControllerComponent(
         currentSceneTreeNode,
         arcballCameraController,
       );
  };