let _isTextureNameEqual = (name1, texture2, engineState) =>
  RelateGameObjectAndAssetUtils.isNameEqual(
    name1,
    texture2,
    (
      BasicSourceTextureEngineService.getBasicSourceTextureName,
      ConverterEngineService.isDefaultTextureName,
    ),
    engineState,
  );

let isImageNameEqual = (name1, image2) => {
  let name2 = ImageUtils.getImageName(image2);

  ConverterEngineService.isDefaultImageName(name1)
  && ConverterEngineService.isDefaultImageName(name2) ?
    true : name1 == name2;
};

let _isImageValueEqual = (image1, image2, getFunc) =>
  getFunc(image1) == getFunc(image2);

let isImageDataEqual =
    (
      (name, width, height, uint8Array),
      image2,
      texture2,
      imageUint8ArrayDataMap,
    ) =>
  isImageNameEqual(name, image2)
  && width == ImageUtils.getImageWidth(image2)
  && height == ImageUtils.getImageHeight(image2)
  && (
    switch (
      imageUint8ArrayDataMap |> WonderCommonlib.SparseMapService.get(texture2)
    ) {
    | None => true
    | Some((_, uint8Array2)) =>
      Uint8ArrayService.isUint8ArrayEqual(uint8Array, uint8Array2 |. Some)
    }
  );

let isTextureDataEqual =
    (
      isImageDataEqualFunc,
      (name, wrapS, wrapT, minFilter, magFilter, imageData),
      texture2,
      imageUint8ArrayDataMap,
      engineState,
    ) =>
  _isTextureNameEqual(name, texture2, engineState)
  && wrapS == BasicSourceTextureEngineService.getWrapS(texture2, engineState)
  && wrapT == BasicSourceTextureEngineService.getWrapT(texture2, engineState)
  &&
  minFilter == BasicSourceTextureEngineService.getMinFilter(
                 texture2,
                 engineState,
               )
  &&
  magFilter == BasicSourceTextureEngineService.getMagFilter(
                 texture2,
                 engineState,
               )
  && isImageDataEqualFunc(
       imageData,
       BasicSourceTextureEngineService.unsafeGetSource(texture2, engineState),
       texture2,
       imageUint8ArrayDataMap,
     );

let _findTextureAsset =
    (textureAssetDataMap, sourceTexture, imageUint8ArrayDataMap, engineState) =>
  switch (
    textureAssetDataMap
    |> SparseMapService.find(((textureComponent, textureAssetData)) =>
         isTextureDataEqual(
           isImageDataEqual,
           textureAssetData,
           sourceTexture,
           imageUint8ArrayDataMap,
           engineState,
         )
       )
  ) {
  | None => None
  | Some((targetTexture, _)) => Some(targetTexture)
  };

let getRelatedTextureData =
    (
      gameObject,
      replacedTargetTextureMap,
      textureAssetDataMap,
      imageUint8ArrayDataMap,
      (unsafeGetMaterialComponentFunc, getMapFunc, setMapFunc),
      (editorState, engineState),
    ) => {
  let material = unsafeGetMaterialComponentFunc(gameObject, engineState);

  switch (getMapFunc(material, engineState)) {
  | None => (None, None, None, replacedTargetTextureMap)
  | Some(sourceTexture) =>
    let (targetTexture, replacedTargetTextureMap) =
      switch (
        replacedTargetTextureMap
        |> WonderCommonlib.SparseMapService.get(sourceTexture)
      ) {
      | None =>
        let targetTexture =
          _findTextureAsset(
            textureAssetDataMap,
            sourceTexture,
            imageUint8ArrayDataMap,
            engineState,
          );

        (
          targetTexture,
          replacedTargetTextureMap
          |> WonderCommonlib.SparseMapService.set(
               sourceTexture,
               targetTexture,
             ),
        );
      | Some(targetTexture) => (targetTexture, replacedTargetTextureMap)
      };

    (
      Some(sourceTexture),
      targetTexture,
      Some(setMapFunc),
      replacedTargetTextureMap,
    );
  };
};

let doesNeedReplaceTexture = ((targetTexture, setMapFunc)) =>
  switch (targetTexture, setMapFunc) {
  | (Some(_), Some(_)) => true
  | _ => false
  };

let getRelatedTextureDataFromGameObject =
    (
      gameObject,
      replacedTargetTextureMap,
      textureAssetDataMap,
      imageUint8ArrayDataMap,
      (editorState, engineState),
    ) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    (None, None, None, replacedTargetTextureMap) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      getRelatedTextureData(
        gameObject,
        replacedTargetTextureMap,
        textureAssetDataMap,
        imageUint8ArrayDataMap,
        (
          GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
          LightMaterialEngineService.getLightMaterialDiffuseMap,
          LightMaterialEngineService.setLightMaterialDiffuseMap,
        ),
        (editorState, engineState),
      ) :
      (None, None, None, replacedTargetTextureMap);

let replaceToTextureAssetTextureComponent =
    (gameObject, (targetTexture, setMapFunc), (editorState, engineState)) =>
  switch (targetTexture, setMapFunc) {
  | (Some(targetTexture), Some(setMapFunc)) =>
    switch (
      AllMaterialEngineService.getMaterialComponent(
        gameObject,
        (editorState, engineState),
      )
    ) {
    | None => engineState
    | Some(materialComponent) =>
      setMapFunc(targetTexture, materialComponent, engineState)
    }

  | _ => engineState
  };

let _getImageUint8ArrayByTextureComponent = (textureComponent, editorState) =>
  switch (
    TextureNodeMapAssetEditorService.getResultByTextureComponent(
      textureComponent,
      editorState,
    )
  ) {
  | None => None
  | Some(({image}: AssetNodeType.textureResultType)) =>
    ImageNodeMapAssetEditorService.getUint8Array(
      image,
      ImageNodeMapAssetEditorService.getImageNodeMap(editorState),
    )
  };

let _getImageData = (image, texture, editorState) => (
  ImageUtils.getImageName(image),
  ImageUtils.getImageWidth(image),
  ImageUtils.getImageHeight(image),
  _getImageUint8ArrayByTextureComponent(texture, editorState),
);

let getTextureData = (texture, (editorState, engineState)) => (
  BasicSourceTextureEngineService.getBasicSourceTextureName(
    texture,
    engineState,
  ),
  BasicSourceTextureEngineService.getWrapS(texture, engineState),
  BasicSourceTextureEngineService.getWrapT(texture, engineState),
  BasicSourceTextureEngineService.getMinFilter(texture, engineState),
  BasicSourceTextureEngineService.getMagFilter(texture, engineState),
  BasicSourceTextureEngineService.unsafeGetSource(texture, engineState)
  |> _getImageData(_, texture, editorState),
);