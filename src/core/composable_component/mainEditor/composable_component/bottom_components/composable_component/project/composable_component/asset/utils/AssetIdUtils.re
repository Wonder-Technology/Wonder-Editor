let generateAssetId = editorState =>
  switch (
    editorState
    |> RemovedAssetIdArrayAssetEditorService.getFirstIdIfHasUsableAssetId
  ) {
  | (None, editorState) =>
    let editorState = editorState |> IndexAssetEditorService.increaseIndex;

    (editorState, editorState |> IndexAssetEditorService.getIndex);
  | (Some(assetId), editorState) => (editorState, assetId)
  };