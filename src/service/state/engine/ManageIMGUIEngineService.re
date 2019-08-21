open Wonderjs;

let getExecFunc = ManageIMGUIMainService.getExecFunc;

let addExecFuncData = ManageIMGUIAPI.addExecFuncData;

let removeExecFuncData = ManageIMGUIAPI.removeExecFuncData;

let clearExecFuncDataArr = ManageIMGUIAPI.clearExecFuncDataArr;

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