type diffType =
  | GameObject
  | Transform
  | MeshRenderer 
  | BasicMaterial
  | LightMaterial
  | Texture;

type diffArgument = {
  arguments: array(int),
  type_: diffType,
};