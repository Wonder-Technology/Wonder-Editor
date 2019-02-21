let setViewRect = (~width=10, ~height=20, ()) =>
  ResizeUtils.updateViewRect((width, height))
  |> StateLogicService.getAndSetEditorState;

let prepare = prepareStateFunc => {
  prepareStateFunc();
  StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

  IMGUITool.prepareImgui();

  setViewRect();
};

let getSceneActivedBasicCameraView = engineState =>
  MainEditorSceneTool.getCameraInDefaultScene(engineState)
  |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
       _,
       engineState,
     );