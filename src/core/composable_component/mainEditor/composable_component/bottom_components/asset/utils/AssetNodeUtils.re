open AssetNodeType;
let handleSpeficFuncByAssetNodeType =
    (
      type_,
      (
        handleFodlerFunc,
        handleJsonFunc,
        handleTextureFunc,
        handleMaterialFunc,
      ),
    ) =>
  switch (type_) {
  | Folder =>
    StateEditorService.getState()
    |> AssetFolderNodeMapEditorService.getFolderNodeMap
    |> handleFodlerFunc
  | Texture =>
    StateEditorService.getState()
    |> AssetTextureNodeMapEditorService.getTextureNodeMap
    |> handleTextureFunc
  | Json =>
    StateEditorService.getState()
    |> AssetJsonNodeMapEditorService.getJsonNodeMap
    |> handleJsonFunc
  | Material =>
    StateEditorService.getState()
    |> AssetMaterialNodeMapEditorService.getMaterialNodeMap
    |> handleMaterialFunc
  };