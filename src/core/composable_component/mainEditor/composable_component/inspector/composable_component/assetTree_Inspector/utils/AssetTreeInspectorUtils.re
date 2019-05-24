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

let _reallocateEveryTime =
    (inspectorEngineState: Wonderjs.StateDataMainType.state) => {
  WonderLog.Log.log({j|trigger reallocateEveryTime|j});

  /* let inspectorEngineState =
     inspectorEngineState
     /* TODO fix? */
     |> ReallocateCPUMemoryJobEngineService.resetDisposeCount
     |> ReallocateCPUMemoryJobEngineService.reallocateGameObjectByDisposeCount; */

  let inspectorEngineState =
    inspectorEngineState
    |> ReallocateCPUMemoryJobEngineService.reallocateGameObject;

  /* TODO optimize: judge and reallocate */
  ReallocateCPUMemoryJobEngineService.reAllocateToBuffer(
    ReallocateCPUMemoryJobEngineService.initGeometryBufferData(
      inspectorEngineState,
    ),
    inspectorEngineState,
  );
};

/* TODO need fix bug */
let disposeContainerGameObjectAllChildrenAndReallocateCPUMemory =
    ((editorState, inspectorEngineState: Wonderjs.StateDataMainType.state)) =>
  (editorState, inspectorEngineState)
  |> InspectorEngineGameObjectLogicService.disposeInspectorEngineContainerGameObjectAllChildren
  |> JobEngineService.execDisposeJob
  |> _reallocateEveryTime;

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