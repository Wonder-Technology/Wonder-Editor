type imageData = {
  base64: option(string),
  uint8Array: option(Js.Typed_array.Uint8Array.t),
  blobObjectURL: option(string),
  name: string,
  mimeType: string,
};

type imageDataMap = WonderCommonlib.ImmutableSparseMapService.t(imageData);