open AssetNodeType;
let handleSpeficFuncByAssetNodeType =
    (type_, (handleFodlerFunc, handleJsonFunc, handleTextureFunc)) =>
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
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="handleSpeficFuncByAssetNodeType",
        ~description={j|the type:$type_ not exist|j},
      ),
    )
  };