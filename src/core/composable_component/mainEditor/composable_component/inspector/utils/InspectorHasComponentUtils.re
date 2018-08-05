open InspectorComponentType;

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

  | CameraGroup =>
    engineState |> CameraEngineService.hasCameraComponent(gameObject)

  | ArcballCameraController =>
    engineState
    |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
         gameObject,
       )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="isHasSpecificComponentByType",
        ~description=
          {j|the type:$type_ in inspectorComponentType is can't add |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };