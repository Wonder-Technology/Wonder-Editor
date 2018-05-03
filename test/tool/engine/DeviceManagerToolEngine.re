open Wonderjs;

open StateDataMainType;

let getGl = (state) => [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);