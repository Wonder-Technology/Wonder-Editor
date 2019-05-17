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
  format: int,
  type_: int,
  flipY: bool,
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
  snapshot: imageIndex,
  color: array(float),
};

type lightMaterial = {
  name: string,
  path: string,
  snapshot: imageIndex,
  diffuseColor: array(float),
  diffuseMap: option(textureIndex),
  shininess: float,
};

type scriptEventFunction = {
  name: string,
  path: string,
  eventFunctionDataStr: string,
};

type scriptAttribute = {
  name: string,
  path: string,
  attributeStr: string,
};

type assetBundle = {
  name: string,
  path: string,
  type_: int,
  assetBundleBufferView: bufferViewIndex,
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
  scriptEventFunctions: array(scriptEventFunction),
  scriptAttributes: array(scriptAttribute),
  assetBundles: array(assetBundle),
  bufferViews: array(bufferView),
};