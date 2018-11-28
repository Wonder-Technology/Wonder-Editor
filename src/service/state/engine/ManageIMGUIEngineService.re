open Wonderjs;

let getIMGUIFunc = ManageIMGUIMainService.getIMGUIFunc;

let setIMGUIFunc = ManageIMGUIAPI.setIMGUIFunc;

let getSetting = ManageIMGUIAPI.getSetting;

let setSetting = ManageIMGUIAPI.setSetting;

let sendUniformProjectionMatData = (canvasSize, state) =>
  ManageIMGUIAPI.sendUniformProjectionMatData(
    DeviceManagerEngineService.unsafeGetGl(state),
    canvasSize,
    state,
  );

let getCustomData = ManageIMGUIMainService.getCustomData;