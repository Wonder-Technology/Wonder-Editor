type diffType =
  | GameObject
  | Transform
  | MeshRenderer
  | BasicMaterial
  | LightMaterial
  | DirectionLight
  | ArcballCameraController
  | Texture;

type diffArgument = {
  arguments: array(int),
  type_: diffType,
};