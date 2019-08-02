open InspectorComponentType;

open Wonderjs;

open CameraGroupType;

let _removeCameraGroup = (currentSceneTreeNode, (editorState, engineState)) =>
  (editorState, engineState)
  |> CameraLogicService.unbindCameraControllerEventIfHasComponentGameView(
       currentSceneTreeNode,
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

let _removeFlyCameraController =
    (currentSceneTreeNode, (editorState, engineState)) => {
  let flyCameraController =
    engineState
    |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
         currentSceneTreeNode,
       );

  (editorState, engineState)
  |> GameObjectLogicService.disposeFlyCameraController(
       currentSceneTreeNode,
       flyCameraController,
     );
};

let _removeArcballCameraController =
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

let _removeScript = (currentSceneTreeNode, (editorState, engineState)) => {
  let script =
    engineState
    |> GameObjectComponentEngineService.unsafeGetScriptComponent(
         currentSceneTreeNode,
       );

  (editorState, engineState)
  |> GameObjectLogicService.disposeScript(currentSceneTreeNode, script);
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
    |> GameObjectLogicService.removeGeometry(
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
  | FlyCameraController =>
    _removeFlyCameraController(
      currentSceneTreeNode,
      (editorState, engineState),
    )
  | ArcballCameraController =>
    _removeArcballCameraController(
      currentSceneTreeNode,
      (editorState, engineState),
    )
  | Script => _removeScript(currentSceneTreeNode, (editorState, engineState))
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