open Wonderjs;

open StateDataMainType;

let setViewport = (viewportData, state) => {
  /* WonderLog.Log.print(viewportData) |> ignore; */
  {
    ...state,
    deviceManagerRecord:
      state.deviceManagerRecord
      |> DeviceManagerService.setViewportOfGl(
           DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
           viewportData,
         )
      |> DeviceManagerService.setViewportData(viewportData),
  };
};

let getViewport = state => state.deviceManagerRecord.viewport;

let unsafeGetGl = DeviceManagerAPI.unsafeGetGl;