open EditorType;

open AssetNodeType;

let getImageNodeMap = editorState =>
  editorState.assetRecord |> ImageNodeMapAssetService.getImageNodeMap;

let setImageNodeMap = (imageNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ImageNodeMapAssetService.setImageNodeMap(imageNodeMap),
};

let unsafeGetResult = (nodeId, editorState) =>
  editorState.assetRecord |> ImageNodeMapAssetService.unsafeGetResult(nodeId);

let unsafeGetResult = (nodeId, editorState) =>
  editorState.assetRecord |> ImageNodeMapAssetService.unsafeGetResult(nodeId);

let setResult = (nodeId, imageResult, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ImageNodeMapAssetService.setResult(nodeId, imageResult),
};

let buildImageNodeResult =
    (~base64, ~uint8Array, ~name, ~mimeType, ~blobObjectURL=None, ()) => {
  base64,
  uint8Array,
  blobObjectURL,
  name,
  mimeType,
};

let getUint8Array = (nodeId, imageNodeMap) =>
  imageNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({uint8Array}: imageResultType) => uint8Array);

let getValidValues = editorState =>
  getImageNodeMap(editorState) |> SparseMapService.getValidValues;