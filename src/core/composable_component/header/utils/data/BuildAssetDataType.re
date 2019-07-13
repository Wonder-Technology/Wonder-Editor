type loadedImageData = (ImageType.htmlImage, string, int, string, string);

type loadedCubemapTextureImageData = {
  imageIndex: int,
  pxImageData: option(loadedImageData),
  nxImageData: option(loadedImageData),
  pyImageData: option(loadedImageData),
  nyImageData: option(loadedImageData),
  pzImageData: option(loadedImageData),
  nzImageData: option(loadedImageData),
};

type cubemapImageMapData = {
  pxImage: option(ImageType.htmlImage),
  nxImage: option(ImageType.htmlImage),
  pyImage: option(ImageType.htmlImage),
  nyImage: option(ImageType.htmlImage),
  pzImage: option(ImageType.htmlImage),
  nzImage: option(ImageType.htmlImage),
};

type cubemapImageMap =
  WonderCommonlib.ImmutableSparseMapService.t(cubemapImageMapData);

type cubemapImageDataIndexMap =
  WonderCommonlib.ImmutableSparseMapService.t(int);