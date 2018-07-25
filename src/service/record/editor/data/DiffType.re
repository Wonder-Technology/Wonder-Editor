type diffType =
  | GameObject
  | Transform
  | MeshRenderer
  | BasicMaterial
  | LightMaterial
  | DirectionLight
  | Texture;

type diffArgument = {
  arguments: array(int),
  type_: diffType,
};