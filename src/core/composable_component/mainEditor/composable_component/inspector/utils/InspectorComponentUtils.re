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
  /* | "SourceInstance" =>
     let (engineState, sourceInstanceComponent) =
       engineState |> SourceInstanceEngineService.create;
     engineState
     |> GameObjectLogicService.addSourceInstanceComponent(
          currentSceneTreeNode,
          sourceInstanceComponent,
        ); */

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

let isHasSpecificComponentByType = (type_, gameObject, engineState) =>
  switch (type_) {
  | MeshRenderer =>
    engineState
    |> GameObjectComponentEngineService.hasMeshRendererComponent(gameObject)

  /* | "CustomGeometry" =>
     engineState
     |> GameObjectLogicService.hasBoxGeometryComponent(gameObject) */

  | Material =>
    engineState |> MaterialEngineService.hasMaterialComponent(gameObject)

  | Light => engineState |> LightEngineService.hasLightComponent(gameObject)

  /* | "SourceInstance" =>
     engineState
     |> GameObjectLogicService.hasSourceInstanceComponent(gameObject) */

  | BasicCameraView =>
    engineState
    |> GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
       )

  | PerspectiveCameraProjection =>
    engineState
    |> GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent(
         gameObject,
       )

  | ArcballCameraController =>
    engineState
    |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
         gameObject,
       )
  };