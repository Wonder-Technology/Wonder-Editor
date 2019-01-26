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
    DeviceManagerService.setDepthTest(
      unsafeGetGl(engineState),
      test,
      engineState.deviceManagerRecord,
    ),
};