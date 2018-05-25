type assetNodeType =
  | Folder
  | Image
  | Json;

type nodeResultType = {
  name: string,
  type_: assetNodeType,
  result: option(string)
};