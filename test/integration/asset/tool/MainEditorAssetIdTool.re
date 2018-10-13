let getFirstIdIfHasUsableAssetId = editorState =>
  editorState |> AssetRemovedAssetIdArrayEditorService.hasUsableAssetId ?
    editorState
    |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
    |> (removedAssetIdArr => Some(Array.unsafe_get(removedAssetIdArr, 0))) :
    None;

let getNewAssetId = (~editorState=StateEditorService.getState(), ()) =>
  switch (editorState |> getFirstIdIfHasUsableAssetId) {
  | None => AssetIndexEditorService.getIndex(editorState) |> succ
  | Some(assetId) => assetId
  };