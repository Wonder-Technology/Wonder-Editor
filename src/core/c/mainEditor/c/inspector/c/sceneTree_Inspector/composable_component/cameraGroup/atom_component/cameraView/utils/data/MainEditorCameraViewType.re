
type cameraViewType =
  | BasicCameraView;

external convertCameraViewTypeToInt : cameraViewType => int = "%identity";

external convertIntToCameraViewType : int => cameraViewType = "%identity";