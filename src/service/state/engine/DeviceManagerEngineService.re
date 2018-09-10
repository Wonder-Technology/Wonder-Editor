open Wonderjs;

open StateDataMainType;

let getViewport = state => state.deviceManagerRecord.viewport;

let setViewport = (data, state) => DeviceManagerAPI.setViewport(data, state);

let unsafeGetGl = DeviceManagerAPI.unsafeGetGl;

let setScissor = (data, state) => DeviceManagerAPI.setScissor(data, state);

let setScissorTest = (test, state) =>
  DeviceManagerAPI.setScissorTest(test, state);