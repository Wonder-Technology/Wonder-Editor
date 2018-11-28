open Wonderjs;

let getCurrentCameraGameObject = engineState =>
  switch (BasicCameraViewEngineService.getActiveBasicCameraView(engineState)) {
  | None => None
  | Some(basicCameraView) =>
    engineState
    |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
         basicCameraView,
       )
    |. Some
  };

let getCurrentCameraProjection = engineState =>
  engineState
  |> GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
       getCurrentCameraGameObject(engineState) |> OptionService.unsafeGet,
     );

let getEditCameraArcballCameraController = (editorState, engineState) =>
  SceneViewEditorService.unsafeGetEditCamera(editorState)
  |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
       _,
       engineState,
     );

let getEditCameraBasicCameraView = (editorState, engineState) =>
  SceneViewEditorService.unsafeGetEditCamera(editorState)
  |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
       _,
       engineState,
     );