open Wonderjs;

open StateDataMainType;

let setViewport = (viewportData, state ) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setViewportOfGl(
         DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         viewportData,
       )
    |> DeviceManagerService.setViewportData(viewportData),
};