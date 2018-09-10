let restoreJob = (_, engineState) => {
  let (x, y, width, height, _, _) = ScreenEngineService.queryFullScreenData();
  let viewportData = (x, y, width, height);

  engineState
  |> DeviceManagerEngineService.setViewport(viewportData)
  |> DeviceManagerEngineService.setScissorTest(false);
};