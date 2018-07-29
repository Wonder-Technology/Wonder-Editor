let addComponentByType = (type_, currentSceneTreeNode, engineState) =>
  /* TODO change type_ to enum type */
  switch (type_) {
  | "MeshRenderer" =>
    let (engineState, meshRenderer) =
      engineState |> MeshRendererEngineService.create;
    engineState
    |> GameObjectComponentEngineService.addMeshRendererComponent(
         currentSceneTreeNode,
         meshRenderer,
       );
  /* | "SourceInstance" =>
     let (engineState, sourceInstanceComponent) =
       engineState |> SourceInstanceEngineService.create;
     engineState
     |> GameObjectComponentEngineService.addSourceInstanceComponent(
          currentSceneTreeNode,
          sourceInstanceComponent,
        ); */

  | "Light" =>
    let (engineState, directionLightComponent) =
      engineState |> DirectionLightEngineService.create;

    engineState
    |> GameObjectComponentEngineService.addDirectionLightComponent(
         currentSceneTreeNode,
         directionLightComponent,
       );

  | "Material" =>
    let (engineState, lightMaterial) =
      engineState |> LightMaterialEngineService.create;

    engineState
    |> GameObjectComponentEngineService.addLightMaterialComponent(
         currentSceneTreeNode,
         lightMaterial,
       );

  | "BasicCameraView" =>
    let (engineState, cameraView) =
      BasicCameraViewEngineService.create(engineState);

    engineState
    |> GameObjectComponentEngineService.addBasicCameraViewComponent(
         currentSceneTreeNode,
         cameraView,
       );

  | "PerspectiveCameraProjection" =>
    let (engineState, perspectiveCamera) =
      engineState |> CameraEngineService.createPerspectiveCamera;

    engineState
    |> GameObjectComponentEngineService.addPerspectiveCameraProjectionComponent(
         currentSceneTreeNode,
         perspectiveCamera,
       );

  | "ArcballCameraController" =>
    let (engineState, arcballCameraController) =
      engineState |> ArcballCameraEngineService.create;

    engineState
    |> GameObjectComponentEngineService.addArcballCameraControllerComponent(
         currentSceneTreeNode,
         arcballCameraController,
       );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addComponentByType",
        ~description={j|the type:$type_ is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|type:$type_ , currentSceneTreeNode:$currentSceneTreeNode|j},
      ),
    )
  };

let isHasSpecificComponentByType = (type_, gameObject, engineState) =>
  switch (type_) {
  | "MeshRenderer" =>
    engineState
    |> GameObjectComponentEngineService.hasMeshRendererComponent(gameObject)

  /* | "CustomGeometry" =>
     engineState
     |> GameObjectComponentEngineService.hasBoxGeometryComponent(gameObject) */

  | "Material" =>
    engineState |> MaterialEngineService.hasMaterialComponent(gameObject)

  | "Light" => engineState |> LightEngineService.hasLightComponent(gameObject)

  /* | "SourceInstance" =>
     engineState
     |> GameObjectComponentEngineService.hasSourceInstanceComponent(gameObject) */

  | "BasicCameraView" =>
    engineState
    |> GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
       )

  | "PerspectiveCameraProjection" =>
    engineState
    |> GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent(
         gameObject,
       )

  | "ArcballCameraController" =>
    engineState
    |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
         gameObject,
       )

  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="isHasSpecificComponentByType",
        ~description={j|the component: $type_ not exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|type:$type_|j},
      ),
    )
  };