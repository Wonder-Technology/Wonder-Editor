open AssetNodeType;
let handleSpeficFuncByAssetNodeType =
    (
      type_,
      (
        handleFodlerFunc,
        handleJsonFunc,
        handleTextureFunc,
        handleMaterialFunc,
        handleWDBFunc,
      ),
      editorState,
    ) =>
  switch (type_) {
  | Folder =>
    editorState
    |> AssetFolderNodeMapEditorService.getFolderNodeMap
    |> handleFodlerFunc
  | Texture =>
    editorState
    |> AssetTextureNodeMapEditorService.getTextureNodeMap
    |> handleTextureFunc
  | Json =>
    editorState
    |> AssetJsonNodeMapEditorService.getJsonNodeMap
    |> handleJsonFunc
  | Material =>
    editorState
    |> AssetMaterialNodeMapEditorService.getMaterialNodeMap
    |> handleMaterialFunc
  | WDB =>
    editorState
    |> AssetWDBNodeMapEditorService.getWDBNodeMap
    |> handleWDBFunc
  };