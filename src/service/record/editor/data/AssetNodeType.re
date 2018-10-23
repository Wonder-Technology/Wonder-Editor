exception LoadException;

type nodeId = int;

type imageIndex = int;

type uploadFileType =
  | LoadWDB
  | LoadImage
  | LoadWPK
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
  base64: option(string),
  uint8Array: option(Js.Typed_array.Uint8Array.t),
  name: string,
  mimeType: string,
};

type textureResultType = {
  textureComponent: int,
  image: imageIndex,
  parentFolderNodeId: option(nodeId),
};

type wdbResultType = {
  name: string,
  parentFolderNodeId: option(nodeId),
  wdbArrayBuffer: Js.Typed_array.ArrayBuffer.t,
  wdbGameObject: int,
};

type materialResultType = {
  parentFolderNodeId: option(nodeId),
  type_: AssetMaterialDataType.materialType,
  materialComponent: int,
};