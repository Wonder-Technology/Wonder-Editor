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
  record.imageDataMap |> WonderCommonlib.SparseMapService.unsafeGet(index);

let setData = (index, data, record) => {
  ...record,
  imageDataMap:
    record.imageDataMap |> SparseMapService.immutableSet(index, data),
};

let removeData = (index, record) => {
  ...record,
  imageDataMap:
    record.imageDataMap
    |> Obj.magic
    |> SparseMapService.immutableDeleteVal(index)
    |> Obj.magic,
};