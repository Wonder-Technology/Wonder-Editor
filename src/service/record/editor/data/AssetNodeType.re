exception LoadException;

type uploadFileType =
  | LoadWDB
  | LoadImage
  | LoadJson
  | LoadError;

type assetNodeType =
  | Folder
  | Json
  | Texture
  | WDB
  | Material;

type nodeResultType = {
  name: string,
  type_: uploadFileType,
  result: FileReader.resultType,
};

type folderResultType = {
  name: string,
  parentNodeId: option(int),
};

type jsonResultType = {
  name: string,
  postfix: string,
  parentNodeId: option(int),
  jsonResult: string,
};

type imageResultType = {
  base64: string,
  name: string,
  textureArray: array(int),
};

type textureResultType = {
  textureComponent: int,
  imageId: int,
  parentNodeId: option(int),
};

type wdbResultType = {
  name: string,
  postfix: string,
  parentNodeId: option(int),
  wdbArrayBuffer: Js.Typed_array.ArrayBuffer.t,
  wdbGameObject: int,
};

type materialResultType = {
  postfix: string,
  parentNodeId: option(int),
  type_: MaterialType.materialType,
  materialComponent: int,
};