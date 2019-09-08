let removeSettedAssets =
    (
      (type_, textureContentIndexOpt, textureComponent),
      editorState,
      handleWhenHasSettedFunc,
      engineState,
    ) =>
  switch (type_) {
  | NodeAssetType.IMGUICustomImage =>
    let id =
      IMGUICustomImageTextureContentMapAssetEditorService.getId(
        textureContentIndexOpt |> OptionService.unsafeGet,
        editorState,
      );

    AssetIMGUIEngineService.hasSettedAssetCustomImageData(id, engineState) ?
      AssetIMGUIEngineService.removeSettedAssetCustomImageData(
        id,
        engineState,
      )
      |> handleWhenHasSettedFunc :
      engineState;
  | NodeAssetType.BasicSource =>
    AssetIMGUIEngineService.hasSettedAssetBitmapData(
      OperateTextureLogicService.getName(
        ~texture=textureComponent,
        ~engineState,
      ),
      engineState,
    ) ?
      AssetIMGUIEngineService.removeSettedAssetBitmapData(engineState)
      |> handleWhenHasSettedFunc :
      engineState
  };