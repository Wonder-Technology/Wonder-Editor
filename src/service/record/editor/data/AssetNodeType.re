type assetNodeType =
  | Folder
  | Image
  | Json
  | Texture;

type nodeResultType = {
  name: string,
  type_: assetNodeType,
  result: option(string)
};