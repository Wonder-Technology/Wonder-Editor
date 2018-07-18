type diffType =
  | GameObject
  | Transform
  | Material
  | Texture;

type diffArgument= {
  arguments: array(int),
  type_: diffType,
};