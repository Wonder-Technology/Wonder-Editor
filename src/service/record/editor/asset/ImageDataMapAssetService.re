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

let unsafeGetData = (index, record) =>
  record.imageDataMap |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(index);

let setData = (index, data, record) => {
  ...record,
  imageDataMap:
    record.imageDataMap |> WonderCommonlib.ImmutableSparseMapService.set(index, data),
};

let removeData = (index, record) => {
  ...record,
  imageDataMap:
    record.imageDataMap
    |> Obj.magic
    |> WonderCommonlib.ImmutableSparseMapService.deleteVal(index)
    |> Obj.magic,
};