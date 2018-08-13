type componentType =
  | Transform
  | RenderGroup
  | Geometry
  | ArcballCameraController
  | CameraGroup
  | Light
  | SourceInstance;


external convertComponentTypeToInt : componentType => int =
  "%identity";

external convertIntToComponentType : int => componentType =
  "%identity";