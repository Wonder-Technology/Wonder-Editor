let getAssetId = editorState =>
  switch (
    editorState
    |> AssetRemovedAssetIdArrayEditorService.getFirstIdIfHasUsableAssetId
  ) {
  | (None, editorState) =>
    let editorState = editorState |> AssetIndexEditorService.increaseIndex;

    (editorState, editorState |> AssetIndexEditorService.getIndex);
  | (Some(assetId), editorState) => (editorState, assetId)
  };