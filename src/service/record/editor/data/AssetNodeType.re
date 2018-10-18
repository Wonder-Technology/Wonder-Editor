exception LoadException;

type nodeId = int;

type imageIndex = int;

type uploadFileType =
  | LoadWDB
  | LoadImage
  | LoadError;

type assetNodeType =
  | Folder
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
  parentFolderNodeId: option(nodeId),
};

type imageResultType = {
  base64: string,
  name: string,
  textureArray: array(int),
};

type textureResultType = {
  textureComponent: int,
  image: imageIndex,
  parentFolderNodeId: option(nodeId),
};

type wdbResultType = {
  name: string,
  extName: string,
  parentFolderNodeId: option(nodeId),
  wdbArrayBuffer: Js.Typed_array.ArrayBuffer.t,
  wdbGameObject: int,
};

type materialResultType = {
  parentFolderNodeId: option(nodeId),
  type_: AssetMaterialDataType.materialType,
  materialComponent: int,
};