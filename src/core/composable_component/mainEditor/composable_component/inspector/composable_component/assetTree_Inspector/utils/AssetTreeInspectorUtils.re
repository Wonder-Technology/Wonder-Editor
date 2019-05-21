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

let _reallocateEveryTime = engineState => {
  WonderLog.Log.log({j|trigger reallocateEveryTime|j});

  /* let engineState =
     engineState
     /* TODO fix? */
     |> ReallocateCPUMemoryJobEngineService.resetDisposeCount
     |> ReallocateCPUMemoryJobEngineService.reallocateGameObjectByDisposeCount; */

  let engineState =
    engineState
    |> ReallocateCPUMemoryJobEngineService.reallocateGameObject;

  /* TODO optimize: judge and reallocate */
  ReallocateCPUMemoryJobEngineService.reAllocateToBuffer(
    ReallocateCPUMemoryJobEngineService.initGeometryBufferData(engineState),
    engineState,
  );
};

/* TODO need fix bug */
let disposeContainerGameObjectAllChildrenAndReallocateCPUMemory =
    ((editorState, inspectorEngineState)) =>
  (editorState, inspectorEngineState)
  |> InspectorEngineGameObjectLogicService.disposeInspectorEngineContainerGameObjectAllChildren
  |> JobEngineService.execDisposeJob
  |> _reallocateEveryTime;

let setCameraDistance = inspectorEngineState => {
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