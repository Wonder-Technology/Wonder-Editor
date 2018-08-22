type diffType =
  | GameObject
  | Transform
  | Geometry 
  | MeshRenderer
  | BasicMaterial
  | LightMaterial
  | DirectionLight
  | PointLight
  | BasicCameraView
  | PerspectiveCamera
  | ArcballCameraController
  | Texture;

type diffArgument = {
  arguments: array(int),
  type_: diffType,
};