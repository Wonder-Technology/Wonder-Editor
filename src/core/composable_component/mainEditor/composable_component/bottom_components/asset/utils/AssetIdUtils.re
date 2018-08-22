let getAssetId = editorState =>
  switch (
    editorState
    |> AssetRemovedAssetIdArrayEditorService.getFirstIdIfHasUsableAssetId
  ) {
  | None =>
    let editorState =
      AssetIndexEditorService.increaseIndex |> StateLogicService.getEditorState;
    (editorState, editorState |> AssetIndexEditorService.getIndex);
  | Some(assetId) => (editorState, assetId)
  };