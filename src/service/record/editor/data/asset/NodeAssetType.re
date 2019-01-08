exception LoadException(string);

type uploadFileType =
  | LoadWDB
  | LoadGLB
  | LoadGLTFZip
  | LoadTexture
  | LoadWPK
  | LoadError;

type nodeResultType = {
  name: string,
  type_: uploadFileType,
  result: FileReader.resultType,
};

type nodeId = int;

type wdbNodeData = {
  name: string,
  wdbGameObject: int,
};

type textureNodeData = {
  textureComponent: int,
  imageDataIndex: int,
};

type materialNodeData = {
  type_: MaterialDataAssetType.materialType,
  materialComponent: int,
};

type folderNodeData = {name: string};