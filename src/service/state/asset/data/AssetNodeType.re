type uploadFileType =
  | LoadImage
  | LoadJson;

type assetNodeType =
  | Folder
  | Json
  | Texture;

type nodeResultType = {
  name: string,
  type_: uploadFileType,
  result: string,
};

type folderResultType = {name: string};

type jsonResultType = {
  name: string,
  jsonResult: string,
};

type textureResultType = {textureId: int};