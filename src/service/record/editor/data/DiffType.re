type diffType =
  | GameObject
  | Transform
  | BasicMaterial
  | LightMaterial
  | Texture;

type diffArgument = {
  arguments: array(int),
  type_: diffType,
};