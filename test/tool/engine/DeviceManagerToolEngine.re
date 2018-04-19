open Wonderjs;

open MainStateDataType;

let getGl = (state) => [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);