open AssetNodeType;

let getWDBGameObject = (nodeId, editorState) => {
  let {wdbGameObject} =
    WDBNodeMapAssetEditorService.getWDBNodeMap(editorState)
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  wdbGameObject;
};