open AssetType;

open ImageDataType;

let buildImageData =
    (~base64, ~uint8Array, ~name, ~mimeType, ~blobObjectURL=None, ()) => {
  base64,
  uint8Array,
  blobObjectURL,
  name,
  mimeType,
};

let getData = (index, record) =>
  record.cubemapTextureImageDataMap
  |> WonderCommonlib.ImmutableSparseMapService.get(index);

let unsafeGetData = (index, record) =>
  getData(index, record) |> OptionService.unsafeGet;

let getPXImageData = (index, record) =>
  unsafeGetData(index, record).pxImageData;

let getNXImageData = (index, record) =>
  unsafeGetData(index, record).nxImageData;

let getPYImageData = (index, record) =>
  unsafeGetData(index, record).pyImageData;

let getNYImageData = (index, record) =>
  unsafeGetData(index, record).nyImageData;

let getPZImageData = (index, record) =>
  unsafeGetData(index, record).pzImageData;

let getNZImageData = (index, record) =>
  unsafeGetData(index, record).nzImageData;

let setData = (index, data, record) => {
  ...record,
  cubemapTextureImageDataMap:
    record.cubemapTextureImageDataMap
    |> WonderCommonlib.ImmutableSparseMapService.set(index, data),
};

let setPXImageData = (index, data, record) =>
  setData(
    index,
    {...unsafeGetData(index, record), pxImageData: Some(data)},
    record,
  );

let setNXImageData = (index, data, record) =>
  setData(
    index,
    {...unsafeGetData(index, record), nxImageData: Some(data)},
    record,
  );

let setPYImageData = (index, data, record) =>
  setData(
    index,
    {...unsafeGetData(index, record), pyImageData: Some(data)},
    record,
  );

let setNYImageData = (index, data, record) =>
  setData(
    index,
    {...unsafeGetData(index, record), nyImageData: Some(data)},
    record,
  );

let setPZImageData = (index, data, record) =>
  setData(
    index,
    {...unsafeGetData(index, record), pzImageData: Some(data)},
    record,
  );

let setNZImageData = (index, data, record) =>
  setData(
    index,
    {...unsafeGetData(index, record), nzImageData: Some(data)},
    record,
  );

let removeData = (index, record) => {
  ...record,
  cubemapTextureImageDataMap:
    record.cubemapTextureImageDataMap
    |> WonderCommonlib.ImmutableSparseMapService.deleteVal(index),
};