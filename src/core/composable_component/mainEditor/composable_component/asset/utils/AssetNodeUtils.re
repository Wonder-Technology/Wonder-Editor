open AssetNodeType;
let handleSpeficFuncByAssetNodeType =
    (type_, (handleFodlerFunc, handleJsonFunc, handleTextureFunc)) =>
  switch (type_) {
  | Folder =>
    StateAssetService.getState()
    |> FolderNodeMapAssetService.unsafeGetFolderNodeMap
    |> handleFodlerFunc
  | Texture =>
    StateAssetService.getState()
    |> TextureNodeMapAssetService.unsafeGetTextureNodeMap
    |> handleTextureFunc
  | Json =>
    StateAssetService.getState()
    |> JsonNodeMapAssetService.unsafeGetJsonNodeMap
    |> handleJsonFunc
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="handleSpeficFuncByAssetNodeType",
        ~description={j|the type:$type_ not exist|j},
      ),
    )
  };