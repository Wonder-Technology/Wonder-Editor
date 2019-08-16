open Wonderjs;

let getIMGUIFunc = ManageIMGUIMainService.getIMGUIFunc;

let setIMGUIFunc = ManageIMGUIAPI.setIMGUIFunc;

let sendCustomTextureProgramUniformProjectionMatData = (canvasSize, state) =>
  ManageIMGUIAPI.sendCustomTextureProgramUniformProjectionMatData(
    DeviceManagerEngineService.unsafeGetGl(state),
    canvasSize,
    state,
  );

let sendFontTextureProgramUniformProjectionMatData = (canvasSize, state) =>
  ManageIMGUIAPI.sendFontTextureProgramUniformProjectionMatData(
    DeviceManagerEngineService.unsafeGetGl(state),
    canvasSize,
    state,
  );

let sendNoTextureProgramUniformProjectionMatData = (canvasSize, state) =>
  ManageIMGUIAPI.sendNoTextureProgramUniformProjectionMatData(
    DeviceManagerEngineService.unsafeGetGl(state),
    canvasSize,
    state,
  );

let getCustomData = ManageIMGUIMainService.getCustomData;