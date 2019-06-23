let getCameraDefaultDistance = () => 1.1;

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
  let cameraArcballControllerComponent =
    GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
      GameObjectInspectorEngineService.unsafeGetCamera(inspectorEngineState),
      inspectorEngineState,
    );

  inspectorEngineState
  |> ArcballCameraEngineService.setArcballCameraControllerTarget(
       cameraArcballControllerComponent,
       (0., 0., 0.),
     )
  |> ArcballCameraEngineService.setArcballCameraControllerDistance(
       getCameraDefaultDistance(),
       cameraArcballControllerComponent,
     );
};

let initArcballCameraControllerAngle =
    (arcballCameraController, inspectorEngineState) =>
  inspectorEngineState
  |> ArcballCameraEngineService.setArcballCameraControllerTheta(
       arcballCameraController,
       1.5,
     )
  |> ArcballCameraEngineService.setArcballCameraControllerPhi(
       arcballCameraController,
       Js.Math._PI /. 2.,
     );

let restoreArcballCameraControllerAngle = inspectorEngineState => {
  let cameraArcballControllerComponent =
    GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
      GameObjectInspectorEngineService.unsafeGetCamera(inspectorEngineState),
      inspectorEngineState,
    );

  inspectorEngineState
  |> initArcballCameraControllerAngle(cameraArcballControllerComponent);
};

let updateSnapshot =
    (
      currentNodeId,
      (clipTargetCanvasSnapshotAndSetToImageDataMapFunc, dispatchFunc),
    ) => {
  StateEditorService.getState()
  |> clipTargetCanvasSnapshotAndSetToImageDataMapFunc(
       DomHelper.getElementById("inspector-canvas"),
       DomHelper.getElementById("img-canvas"),
       currentNodeId,
     )
  |> StateEditorService.setState
  |> ignore;

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
  |> ignore;
};