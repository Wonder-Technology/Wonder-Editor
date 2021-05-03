open InspectorComponentType;

let getInspectorComponentType = (type_, editorState) =>
  switch (type_) {
  | "Script" => Script
  | "Light" => Light
  | "Geometry" => Geometry
  | "RenderGroup" => RenderGroup
  | "CameraGroup" => CameraGroup
  | "ArcballCameraController" => ArcballCameraController
  | "FlyCameraController" => FlyCameraController
  | _ =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description={j|unknown type:$type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
      editorState,
    );

    Unknown;
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
   StateEditorService.getIsRun() ?
     _bindArcballCameraEventIfHasActiveCameraGroup(
       currentSceneTreeNode,
       runEngineState,
     ) :
     runEngineState; */

/* let handleAddCameraGroupIfInRunMode = (currentSceneTreeNode, runEngineState) =>
    StateEditorService.getIsRun() ?
      ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
        currentSceneTreeNode,
        runEngineState,
      ) :
      runEngineState;
   */