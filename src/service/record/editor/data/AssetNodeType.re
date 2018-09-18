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
  parentId: option(int),
};

type jsonResultType = {
  name: string,
  postfix: string,
  parentId: option(int),
  jsonResult: string,
};

type imageResultType = {
  base64: string,
  name: string,
  textureArray:array(int)
};

type textureResultType = {
  textureIndex: int,
  imageId: int,
  parentId: option(int),
};

type wdbResultType = {
  name: string,
  postfix: string,
  parentId: option(int),
  wdbArrayBuffer: Js.Typed_array.ArrayBuffer.t,
  wdbGameObject: int,
};

type materialResultType = {
  name: string,
  postfix: string,
  parentId: option(int),
  type_: MainEditorMaterialType.materialType,
  materialComponent: int,
};