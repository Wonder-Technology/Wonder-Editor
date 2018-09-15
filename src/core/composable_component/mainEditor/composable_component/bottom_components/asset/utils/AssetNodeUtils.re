open AssetNodeType;
let handleSpeficFuncByAssetNodeType =
    (
      type_,
      (
        handleFolderFunc,
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
    |> handleFolderFunc
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