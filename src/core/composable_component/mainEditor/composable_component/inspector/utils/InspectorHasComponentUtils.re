
open AddableComponentType;

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
