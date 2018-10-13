open InspectorComponentType;

let isHasSpecificComponentByType = (type_, gameObject, engineState) =>
  switch (type_) {
  | RenderGroup =>
    engineState
    |> InspectorRenderGroupUtils.hasRenderGroupComponents(gameObject)

  | Geometry =>
    engineState
    |> GameObjectComponentEngineService.hasGeometryComponent(gameObject)

  | Light => engineState |> LightEngineService.hasLightComponent(gameObject)

  /* | "SourceInstance" =>
     engineState
     |> GameObjectLogicService.hasSourceInstanceComponent(gameObject) */

  | CameraGroup =>
    engineState |> CameraEngineService.hasCameraGroup(gameObject)

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
          {j|the type:$type_ in inspectorComponentType can't add |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };