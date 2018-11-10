open InspectorComponentType;

let getInspectorComponentType = type_ =>
  switch (type_) {
  | "Light" => Light
  | "Geometry" => Geometry
  | "RenderGroup" => RenderGroup
  | "CameraGroup" => CameraGroup
  | "ArcballCameraController" => ArcballCameraController
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        
        ~description=
          {j|the type:$type_ in InspectorComponentType can't add|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

/* let _bindArcballCameraEventIfHasActiveCameraGroup =
    (currentSceneTreeNode, runEngineState) =>
  runEngineState |> CameraEngineService.hasCameraGroup(currentSceneTreeNode) ?
    BasicCameraViewEngineService.isActiveBasicCameraView(
      GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
        currentSceneTreeNode,
        runEngineState,
      ),
      runEngineState,
    ) ?
      ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
        currentSceneTreeNode,
        runEngineState,
      ) :
      runEngineState :
    runEngineState; */

/* let handleAddArcballCameraControllerIfInRunMode =
    (currentSceneTreeNode, runEngineState) =>
  SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
    _bindArcballCameraEventIfHasActiveCameraGroup(
      currentSceneTreeNode,
      runEngineState,
    ) :
    runEngineState; */

/* let handleAddCameraGroupIfInRunMode = (currentSceneTreeNode, runEngineState) =>
  SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
    ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
      currentSceneTreeNode,
      runEngineState,
    ) :
    runEngineState;
 */
