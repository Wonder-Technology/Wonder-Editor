open EditorType;

let _computeAspect = ((_, _, width, height)) =>
  (width |> NumberType.convertIntToFloat)
  /. (height |> NumberType.convertIntToFloat);

let activeViewCamera =
    (
      viewRect,
      viewActiveBasicCameraView,
      viewActivePerspectiveCameraProjection,
      engineState,
    ) => {
  let engineState =
    switch (
      PerspectiveCameraProjectionEngineService.getPerspectiveCameraAspect(
        viewActivePerspectiveCameraProjection,
        engineState,
      )
    ) {
    | None =>
      PerspectiveCameraProjectionEngineService.setPerspectiveCameraAspect(
        _computeAspect(viewRect),
        viewActivePerspectiveCameraProjection,
        engineState,
      )
      |> PerspectiveCameraProjectionEngineService.updatePerspectiveCameraProjection
      |> PerspectiveCameraProjectionEngineService.removePerspectiveCameraAspect(
           viewActivePerspectiveCameraProjection,
         )
      |> PerspectiveCameraProjectionEngineService.markPerspectiveCameraProjectionNotDirty(
           viewActivePerspectiveCameraProjection,
         )
    | Some(_) => engineState
    };

  BasicCameraViewEngineService.activeBasicCameraView(
    viewActiveBasicCameraView,
    engineState,
  );
};

let unsafeGetSceneViewNeedActiveBasicCameraView = (editorState, engineState) =>
  SceneViewEditorService.unsafeGetNeedActiveCamera(editorState)
  |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
       _,
       engineState,
     );

let prepareRenderViewJob =
    ((_, _, width, height) as viewRect, _activeViewCameraFunc, engineState) =>
  engineState
  |> DeviceManagerEngineService.setViewport(viewRect)
  |> DeviceManagerEngineService.setScissorTest(true)
  |> DeviceManagerEngineService.setScissor(viewRect)
  |> _activeViewCameraFunc
  |> ManageIMGUIEngineService.sendUniformProjectionMatData((width, height));

let markIsRenderSceneViewGameObjects = (isRender, editorState, engineState) => (
  editorState,
  SceneViewEditorService.unsafeGetGridPlane(editorState)
  |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
       _,
       engineState,
     )
  |> MeshRendererEngineService.setMeshRendererIsRender(
       _,
       isRender,
       engineState,
     ),
);