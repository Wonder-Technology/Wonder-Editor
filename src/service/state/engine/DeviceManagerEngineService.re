open Wonderjs;

open StateDataMainType;

let getViewport = engineState => engineState.deviceManagerRecord.viewport;

let setViewport = (data, engineState) =>
  DeviceManagerAPI.setViewport(data, engineState);

let unsafeGetGl = DeviceManagerAPI.unsafeGetGl;

let getGl = engineState => engineState.deviceManagerRecord.gl;

let setScissor = (data, engineState) =>
  DeviceManagerAPI.setScissor(data, engineState);

let setScissorTest = (test, engineState) =>
  DeviceManagerAPI.setScissorTest(test, engineState);

let setDepthTest = (test, engineState) => {
  ...engineState,
  deviceManagerRecord:
    AllDeviceManagerService.setDepthTest(
      unsafeGetGl(engineState),
      test,
      engineState.deviceManagerRecord,
    ),
};

let setDepthWrite = (writeDepth: bool, engineState) => {
  ...engineState,
  deviceManagerRecord:
    AllDeviceManagerService.setDepthWrite(
      unsafeGetGl(engineState),
      writeDepth,
      engineState.deviceManagerRecord,
    ),
};

let setSide = DeviceManagerAPI.setSide;

let setBlend = (isBlend, engineState) => {
  let gl = unsafeGetGl(engineState);

  isBlend ?
    gl |> WonderWebgl.Gl.enable(Gl.getBlend(gl)) :
    gl |> WonderWebgl.Gl.disable(Gl.getBlend(gl));

  engineState;
};

let setBlendFunc = (srcFactor, dstFactor, engineState) => {
  unsafeGetGl(engineState) |> Gl.blendFunc(srcFactor, dstFactor);

  engineState;
};