open InspectorComponentType;

open Wonderjs;

open CameraGroupType;

let _removeCameraGroup = (currentSceneTreeNode, (editorState, engineState)) =>
  engineState
  |> CameraLogicService.unbindArcballCameraControllerEventIfHasComponentForGameView(
       currentSceneTreeNode,
       editorState,
     )
  |> GameObjectLogicService.disposeCameraGroup(
       currentSceneTreeNode,
       CameraGroupEngineService.getCameraGroupComponents(
         currentSceneTreeNode,
         (
           GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent,
           GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent,
         ),
         engineState,
       ),
     );

let _removeArcballCameraControllerGroup =
    (currentSceneTreeNode, (editorState, engineState)) => {
  let arcballCameraController =
    engineState
    |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
         currentSceneTreeNode,
       );

  (editorState, engineState)
  |> GameObjectLogicService.disposeArcballCameraController(
       currentSceneTreeNode,
       arcballCameraController,
     );
};

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
    _removeCameraGroup(currentSceneTreeNode, (editorState, engineState))
  | ArcballCameraController =>
    _removeArcballCameraControllerGroup(
      currentSceneTreeNode,
      (editorState, engineState),
    )
  | _ =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description=
          {j|the type:$type_ in inspectorComponentType can't remove |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
      editorState,
    );

    (editorState, engineState);
  };