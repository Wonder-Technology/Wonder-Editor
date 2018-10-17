exception LoadException;

type nodeId = int;

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
  parentFolderNodeId: option(int),
};

type jsonResultType = {
  name: string,
  postfix: string,
  parentFolderNodeId: option(int),
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
  parentFolderNodeId: option(int),
};

type wdbResultType = {
  name: string,
  postfix: string,
  parentFolderNodeId: option(int),
  wdbArrayBuffer: Js.Typed_array.ArrayBuffer.t,
  wdbGameObject: int,
};

type materialResultType = {
  parentFolderNodeId: option(int),
  type_: AssetMaterialDataType.materialType,
  materialComponent: int,
};