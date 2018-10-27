type bufferViewIndex = int;

type textureIndex = int;

type imageIndex = int;

type texture = {
  path: string,
  source: imageIndex,
  name: string,
  magFilter: int,
  minFilter: int,
  wrapS: int,
  wrapT: int,
};

type wdb = {
  name: string,
  path: string,
  bufferView: bufferViewIndex,
};

type image = {
  name: string,
  bufferView: bufferViewIndex,
  mimeType: string,
};

/* type magFilter = Wonderjs.SourceTextureType.filter;

   type minFilter = Wonderjs.SourceTextureType.filter;

   type wrap = Wonderjs.SourceTextureType.wrap; */

/* type buffer = {byteLength: int}; */

type bufferView = {
  /* buffer: bufferIndex, */
  byteOffset: int,
  byteLength: int,
  /* byteStride: option(int), */
};

type basicMaterial = {
  name: string,
  path: string,
  color: array(float),
};

type lightMaterial = {
  name: string,
  path: string,
  diffuseColor: array(float),
  diffuseMap: option(textureIndex),
  shininess: float,
};

type copyright = {
  version: string,
  author: string,
};

type assets = {
  copyright,
  textures: array(texture),
  images: array(image),
  basicMaterials: array(basicMaterial),
  lightMaterials: array(lightMaterial),
  wdbs: array(wdb),
  /* buffer, */
  bufferViews: array(bufferView),
};