open Wonderjs;

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
