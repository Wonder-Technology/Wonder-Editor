let showInspectorCanvas = () =>
  DomHelper.setDomDisplay(
    DomHelper.getElementById("inspectorCanvasParent"),
    true,
  );

let hideInspectorCanvas = () =>
  DomHelper.setDomDisplay(
    DomHelper.getElementById("inspectorCanvasParent"),
    false,
  );

/* TODO need fix bug */
let disposeContainerGameObjectAllChildrenAndReallocateCPUMemory =
    ((editorState, inspectorEngineState)) =>
  (editorState, inspectorEngineState)
  |> InspectorEngineGameObjectLogicService.disposeInspectorEngineContainerGameObjectAllChildren
  |> JobEngineService.execDisposeJob
  /* TODO can't pass test if use reallocateEveryTime */
  |> ReallocateCPUMemoryJob.reallocate(0.1);

let setCameraDefaultDistance = inspectorEngineState => {
  let camera =
    GameObjectInspectorEngineService.unsafeGetCamera(inspectorEngineState);

  let cameraArcballControllerComponent =
    GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
      camera,
      inspectorEngineState,
    );

  inspectorEngineState
  |> ArcballCameraEngineService.setArcballCameraControllerTarget(
       cameraArcballControllerComponent,
       (0., 0., 0.),
     )
  |> ArcballCameraEngineService.setArcballCameraControllerDistance(
       DefaultSceneInspectorEngineUtils.getCameraDefaultDistance(),
       cameraArcballControllerComponent,
     );
};