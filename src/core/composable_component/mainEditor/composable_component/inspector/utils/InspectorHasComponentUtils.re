open InspectorComponentType;

let isHasSpecificComponentByType =
    (type_, gameObject, (editorState, engineState)) =>
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
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description=
          {j|the type:$type_ in inspectorComponentType can't be judge|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
      editorState,
    );

    false;
  };