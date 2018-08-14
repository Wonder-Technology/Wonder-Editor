type cameraProjectionType =
  | PerspectiveCamera;

external convertCameraProjectionTypeToInt : cameraProjectionType => int =
  "%identity";

external convertIntToCameraProjectionType : int => cameraProjectionType =
  "%identity";