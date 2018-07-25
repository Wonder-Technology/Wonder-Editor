type diffType =
  | GameObject
  | Transform
  | MeshRenderer
  | BasicMaterial
  | LightMaterial
  | DirectionLight
  | ArcballCamera
  | Texture;

type diffArgument = {
  arguments: array(int),
  type_: diffType,
};