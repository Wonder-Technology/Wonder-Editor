type imageData = {
  base64: option(string),
  uint8Array: option(Js.Typed_array.Uint8Array.t),
  blobObjectURL: option(string),
  name: string,
  mimeType: string,
};

type basicSourceTextureImageDataIndex = int;

type basicSourceTextureImageDataMap =
  WonderCommonlib.ImmutableSparseMapService.t(imageData);

type cubemapTextureImageData = {
  pxImageData: option(imageData),
  nxImageData: option(imageData),
  pyImageData: option(imageData),
  nyImageData: option(imageData),
  pzImageData: option(imageData),
  nzImageData: option(imageData),
};

type cubemapTextureImageDataIndex = int;

type cubemapTextureImageDataMap =
  WonderCommonlib.ImmutableSparseMapService.t(cubemapTextureImageData);

type cubemapTextureImageUint8ArrayData = Wonderjs.TextureimageUint8ArrayType.cubemapTextureImageUint8ArrayData;