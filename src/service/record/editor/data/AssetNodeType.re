type uploadFileType =
  | LoadWDB
  | LoadImage
  | LoadJson
  | LoadError;

type assetNodeType =
  | Folder
  | Json
  | Texture
  | Material;

type nodeResultType = {
  name: string,
  type_: uploadFileType,
  result: FileReader.resultType
};

type folderResultType = {name: string};

type jsonResultType = {
  name: string,
  jsonResult: string,
};

type textureResultType = {textureIndex: int};

type materialResultType = {
  name: string,
  type_: MainEditorMaterialType.materialType,
  materialComponent: int
};