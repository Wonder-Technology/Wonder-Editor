type source = {
  base64: string,
  name: string,
  textureArray: array(int),
};

type texture = {
  path: string,
  textureIndex: int,
  warpT: int,
  warpS: int,
  minFilter: int,
  magFilter: int,
};

type assets = {
  textures: array(texture),
  sources: array(source),
};

external convertImageResultToSource : AssetNodeType.imageResultType => source =
  "%identity";