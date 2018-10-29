open AssetNodeType;

let getWDBGameObject = (nodeId, editorState) => {
  let {wdbGameObject} =
    AssetWDBNodeMapEditorService.getWDBNodeMap(editorState)
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  wdbGameObject;
};