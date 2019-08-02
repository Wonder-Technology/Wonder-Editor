type bufferViewIndex = int;

type textureIndex = int;

type basicSourceTextureImageIndex = int;

type cubemapTextureImageIndex = int;

type texture = {
  path: string,
  source: basicSourceTextureImageIndex,
  name: string,
  magFilter: int,
  minFilter: int,
  wrapS: int,
  wrapT: int,
  format: int,
  type_: int,
  flipY: bool,
};

type cubemap = {
  path: string,
  /* pxSource: option(cubemapTextureImageIndex),
     nxSource: option(cubemapTextureImageIndex),
     pySource: option(cubemapTextureImageIndex),
     nySource: option(cubemapTextureImageIndex),
     pzSource: option(cubemapTextureImageIndex),
     nzSource: option(cubemapTextureImageIndex), */
  source: cubemapTextureImageIndex,
  name: string,
  magFilter: int,
  minFilter: int,
  wrapS: int,
  wrapT: int,
  flipY: bool,
  pxFormat: int,
  nxFormat: int,
  pyFormat: int,
  nyFormat: int,
  pzFormat: int,
  nzFormat: int,
  pxType: int,
  nxType: int,
  pyType: int,
  nyType: int,
  pzType: int,
  nzType: int,
};

type wdb = {
  name: string,
  path: string,
  bufferView: bufferViewIndex,
  snapshot: basicSourceTextureImageIndex,
};

type image = {
  name: string,
  bufferView: bufferViewIndex,
  mimeType: string,
};

type basicSourceTextureImage = image;

type cubemapTextureImage = {
  pxImage: option(image),
  nxImage: option(image),
  pyImage: option(image),
  nyImage: option(image),
  pzImage: option(image),
  nzImage: option(image),
};

/* type magFilter = Wonderjs.TextureType.filter;

   type minFilter = Wonderjs.TextureType.filter;

   type wrap = Wonderjs.TextureType.wrap; */

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
  snapshot: basicSourceTextureImageIndex,
  color: array(float),
};

type lightMaterial = {
  name: string,
  path: string,
  snapshot: basicSourceTextureImageIndex,
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
  cubemaps: array(cubemap),
  basicSourceTextureImages: array(basicSourceTextureImage),
  cubemapTextureImages: array(cubemapTextureImage),
  basicMaterials: array(basicMaterial),
  lightMaterials: array(lightMaterial),
  wdbs: array(wdb),
  scriptEventFunctions: array(scriptEventFunction),
  scriptAttributes: array(scriptAttribute),
  assetBundles: array(assetBundle),
  bufferViews: array(bufferView),
};