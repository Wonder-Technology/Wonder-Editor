let getAssetId = editorState =>
  switch (
    editorState
    |> AssetRemovedAssetIdArrayEditorService.getFirstIdIfHasUsableAssetId
  ) {
  | None =>
    let editorState = editorState |> AssetIndexEditorService.increaseIndex;

    (editorState, editorState |> AssetIndexEditorService.getIndex);
  | Some(assetId) => (editorState, assetId)
  };