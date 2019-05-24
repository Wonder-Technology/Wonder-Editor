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

let _reallocateCPUMemory =
    (inspectorEngineState: Wonderjs.StateDataMainType.state) =>
  inspectorEngineState
  |> ReallocateCPUMemoryJobEngineService.reallocateGameObjectByDisposeCount
  |> ReallocateCPUMemoryJobEngineService.reallocateGeometry(0.5);

let disposeContainerGameObjectAllChildrenAndReallocateCPUMemory =
    ((editorState, inspectorEngineState: Wonderjs.StateDataMainType.state)) =>
  (editorState, inspectorEngineState)
  |> InspectorEngineGameObjectLogicService.disposeInspectorEngineContainerGameObjectAllChildren
  |> JobEngineService.execDisposeJob
  |> _reallocateCPUMemory;

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