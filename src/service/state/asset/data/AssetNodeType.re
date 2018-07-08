/* TODO remove Image type */
/* TODO type uploadFileType */

type assetNodeType =
  | Folder
  | Json
  | Texture
  | Image;

type nodeResultType = {
  name: string,
  type_: assetNodeType,
  result: string,
};

type folderResultType = {name: string};

type jsonResultType = {
  name: string,
  jsonResult: string,
};

type textureResultType = {textureId: int};