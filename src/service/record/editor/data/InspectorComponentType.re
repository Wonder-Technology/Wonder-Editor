open Wonderjs;

type componentType =
  | Transform
  | RenderGroup
  | Geometry
  | ArcballCameraController
  | CameraGroup
  | Light
  | SourceInstance;

type gameObjectComponent = {
  componentType,
  hasComponentFunc: (int, StateDataMainType.state) => bool,
};

external convertComponentTypeToInt : componentType => int = "%identity";

external convertIntToComponentType : int => componentType = "%identity";