open InspectorComponentType;

open Wonderjs;

open CameraGroupType;

let removeComponentByTypeForEditEngineState =
    (type_, currentSceneTreeNode, engineState) =>
  switch (type_) {
  | RenderGroup =>
    engineState
    |> GameObjectLogicService.disposeRenderGroupForEditEngineState(
         currentSceneTreeNode,
         engineState
         |> MainEditorMaterialUtils.getMaterialTypeByGameObject(
              currentSceneTreeNode,
            ),
       )

  | Light =>
    let lightType =
      MainEditorLightUtils.getLightTypeByGameObject(
        currentSceneTreeNode,
        engineState,
      );

    engineState
    |> MainEditorLightUtils.disposeLightByLightTypeForEditEngineState(
         lightType,
         currentSceneTreeNode,
       );

  | CameraGroup =>
    engineState
    |> GameObjectLogicService.disposeCameraGroupForEditEngineState(
         currentSceneTreeNode,
         CameraGroupEngineService.getCameraGroupComponents(
           currentSceneTreeNode,
           (
             GameObjectComponentEngineService.getBasicCameraViewComponent,
             GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent,
           ),
           engineState,
         ),
       )

  | ArcballCameraController =>
    let arcballCameraController =
      engineState
      |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
           currentSceneTreeNode,
         );

    engineState
    |> GameObjectLogicService.disposeArcballCameraControllerForEditEngineState(
         currentSceneTreeNode,
         arcballCameraController,
       );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="removeComponentByTypeForEditEngineState",
        ~description=
          {j|the type_:$type_ in InspectorComponentType is can't remove|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let removeComponentByTypeForRunEngineState =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | RenderGroup =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeRenderGroupForRunEngineState(
         currentSceneTreeNode,
         engineState
         |> MainEditorMaterialUtils.getMaterialTypeByGameObject(
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
    |> MainEditorLightUtils.disposeLightByLightTypeForRunEngineState(
         lightType,
         currentSceneTreeNode,
       );

  | CameraGroup =>
    let engineState =
      engineState
      |> CameraEngineService.prepareForRemoveCameraGroup(currentSceneTreeNode);

    (editorState, engineState)
    |> GameObjectLogicService.disposeCameraGroupForRunEngineState(
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
    |> GameObjectLogicService.disposeArcballCameraControllerForRunEngineState(
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