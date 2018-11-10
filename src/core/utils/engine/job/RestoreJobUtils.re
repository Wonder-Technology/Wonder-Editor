let restoreJob = (_, engineState) => {
  let editorState = StateEditorService.getState();
  let viewportData = ViewEditorService.getSize(editorState);

  engineState
  |> DeviceManagerEngineService.setViewport(viewportData)
  |> DeviceManagerEngineService.setScissorTest(false);
};