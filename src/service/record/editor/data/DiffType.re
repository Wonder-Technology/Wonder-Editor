type diffType =
  | GameObject
  | Transform
  | MeshRenderer
  | BasicMaterial
  | LightMaterial
  | DirectionLight
  | PointLight
  | ArcballCameraController
  | Texture;

type diffArgument = {
  arguments: array(int),
  type_: diffType,
};