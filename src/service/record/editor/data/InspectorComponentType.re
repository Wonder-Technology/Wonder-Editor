open Wonderjs;

type componentType =
  | Transform
  | RenderGroup
  | Geometry
  | ArcballCameraController
  | FlyCameraController
  | CameraGroup
  | Light
  | SourceInstance
  | Script
  | Unknown;

type gameObjectComponent = {
  componentType,
  hasComponentFunc: (int, StateDataMainType.state) => bool,
};

external convertComponentTypeToInt: componentType => int = "%identity";

external convertIntToComponentType: int => componentType = "%identity";