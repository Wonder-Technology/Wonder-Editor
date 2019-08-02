open AssetType;

open ImageDataType;

let buildData =
    (~base64, ~uint8Array, ~name, ~mimeType, ~blobObjectURL=None, ()) => {
  base64,
  uint8Array,
  blobObjectURL,
  name,
  mimeType,
};

let getData = (index, record) =>
  record.basicSourceTextureImageDataMap |> WonderCommonlib.ImmutableSparseMapService.get(index);

let unsafeGetData = (index, record) =>
  record.basicSourceTextureImageDataMap
  |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(index);

let setData = (index, data, record) => {
  ...record,
  basicSourceTextureImageDataMap:
    record.basicSourceTextureImageDataMap
    |> WonderCommonlib.ImmutableSparseMapService.set(index, data),
};

let removeData = (index, record) => {
  ...record,
  basicSourceTextureImageDataMap:
    record.basicSourceTextureImageDataMap
    |> WonderCommonlib.ImmutableSparseMapService.deleteVal(index),
};