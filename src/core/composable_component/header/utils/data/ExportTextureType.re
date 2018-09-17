type source = {base64: string};

type texture = {
  path: string,
  sourceId: int,
  warpT: int,
  warpS: int,
  minFilter: int,
  magFilter: int,
};

type assets = {
  textures: array(texture),
  sources: array(source),
};