let getImageSrc = (textureComponent, engineState) => {
  let source =
    BasicSourceTextureEngineService.unsafeGetSource(
      textureComponent,
      engineState,
    );

  ImageType.convertImageElementToSrcImageElements(source)##src;
};