open Wonderjs;

open StateDataMainType;

let getGl = (state) => [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord);