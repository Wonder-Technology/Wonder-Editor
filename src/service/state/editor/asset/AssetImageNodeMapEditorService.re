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

let setResult = (nodeId, imageResult, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ImageNodeMapAssetService.setResult(nodeId, imageResult),
};

let buildImageNodeResult = (base64, uint8Array, name, mimeType) => {
  base64,
  uint8Array,
  name,
  mimeType,
};

let getValidValues = editorState =>
  getImageNodeMap(editorState) |> SparseMapService.getValidValues;