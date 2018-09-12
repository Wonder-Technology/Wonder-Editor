open InspectorComponentType;

open Wonderjs;

open CameraGroupType;

let removeComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | RenderGroup =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeRenderGroup(
         currentSceneTreeNode,
         engineState
         |> MainEditorMaterialUtils.getMaterialTypeByGameObject(
              currentSceneTreeNode,
            ),
       )

  | Geometry =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeGeometry(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
              currentSceneTreeNode,
            ),
       )

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

  | CameraGroup =>
    let engineState =
      SceneUtils.doesSceneHasRemoveableCamera() ?
        engineState
        |> CameraEngineService.prepareForRemoveCameraGroup(
             currentSceneTreeNode,
           ) :
        engineState;

    (editorState, engineState)
    |> GameObjectLogicService.disposeCameraGroup(
         currentSceneTreeNode,
         CameraGroupEngineService.getCameraGroupComponents(
           currentSceneTreeNode,
           (
             GameObjectComponentEngineService.getBasicCameraViewComponent,
             GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent,
           ),
           engineState,
         ),
       );

  | ArcballCameraController =>
    let arcballCameraController =
      engineState
      |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
           currentSceneTreeNode,
         );

    let engineState =
      engineState
      |> ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponent(
           currentSceneTreeNode,
         );

    (editorState, engineState)
    |> GameObjectLogicService.disposeArcballCameraController(
         currentSceneTreeNode,
         arcballCameraController,
       );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="removeComponentByTypeForRunEngineState",
        ~description=
          {j|the type_:$type_ in InspectorComponentType is can't remove|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };