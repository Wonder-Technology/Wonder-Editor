let _isBasicMaterialNameEqual = (name1, material2, engineState) =>
  RelateGameObjectAndAssetUtils.isNameEqual(
    name1,
    material2,
    (
      BasicMaterialEngineService.getBasicMaterialName,
      ConverterEngineService.isDefaultBasicMaterialName,
    ),
    engineState,
  );

let _isLightMaterialNameEqual = (name1, material2, engineState) =>
  RelateGameObjectAndAssetUtils.isNameEqual(
    name1,
    material2,
    (
      LightMaterialEngineService.getLightMaterialName,
      ConverterEngineService.isDefaultLightMaterialName,
    ),
    engineState,
  );

let isBasicMaterialDataEqual =
    ((name, color), material2, _imageUint8ArrayDataMap, engineState) =>
  _isBasicMaterialNameEqual(name, material2, engineState)
  && color == BasicMaterialEngineService.getColor(material2, engineState);

let isLightMaterialDataEqual =
    (
      (name, diffuseColor, shininess, textureData),
      material2,
      (imageUint8ArrayDataMap, isTextureDataEqualFunc, engineState),
    ) =>
  _isLightMaterialNameEqual(name, material2, engineState)
  && diffuseColor
  == LightMaterialEngineService.getLightMaterialDiffuseColor(
       material2,
       engineState,
     )
  && shininess
  == LightMaterialEngineService.getLightMaterialShininess(
       material2,
       engineState,
     )
  && (
    switch (
      textureData,
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        material2,
        engineState,
      ),
    ) {
    | (None, None) => true
    | (Some(textureData), Some(map2)) =>
      isTextureDataEqualFunc(
        textureData,
        map2,
        imageUint8ArrayDataMap,
        engineState,
      )
    | _ => false
    }
  );

let isEqualDefaultBasicMaterial =
    (gameObjectMaterial, (_, (name, _)), engineState) =>
  MaterialAssetLogicService.isDefaultBasicMaterial(
    gameObjectMaterial,
    name,
    engineState,
  );

let isEqualDefaultLightMaterial =
    (gameObjectMaterial, (_, (name, _, _, _)), engineState) =>
  MaterialAssetLogicService.isDefaultLightMaterial(
    gameObjectMaterial,
    name,
    engineState,
  );

let getBasicMaterialData = (material, engineState) => (
  BasicMaterialEngineService.getBasicMaterialName(material, engineState),
  BasicMaterialEngineService.getColor(material, engineState),
);

let _findMaterialAsset =
    (
      (materialAssetDataMap, material, imageUint8ArrayDataMap),
      engineState,
      isMaterialDataEqualFunc,
    ) =>
  switch (
    materialAssetDataMap
    |> WonderCommonlib.ImmutableSparseMapService.find(
         ((_, materialAssetData)) =>
         isMaterialDataEqualFunc(
           materialAssetData,
           material,
           imageUint8ArrayDataMap,
           engineState,
         )
       )
  ) {
  | None => None
  | Some((materialAssetComponent, _)) => Some(materialAssetComponent)
  };

let _getRelatedMaterialData =
    (
      (gameObject, replacedTargetMaterialMap, imageUint8ArrayDataMap),
      (materialType, materialAssetDataMap, defaultMaterialData),
      (
        unsafeGetMaterialComponentFunc,
        isEqualDefaultMaterialComponentFunc,
        isMaterialDataEqualFunc,
      ),
      engineState,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|default material component has not been added to gameObject|j},
                ~actual={j|has|j},
              ),
              () => {
                let (defaultMaterial, _) = defaultMaterialData;
                let material =
                  unsafeGetMaterialComponentFunc(gameObject, engineState);

                material !== defaultMaterial;
              },
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  let material = unsafeGetMaterialComponentFunc(gameObject, engineState);
  let (defaultMaterial, _) = defaultMaterialData;

  let (targetMaterial, replacedTargetMaterialMap) =
    switch (
      replacedTargetMaterialMap
      |> WonderCommonlib.ImmutableSparseMapService.get(material)
    ) {
    | None =>
      let targetMaterial =
        isEqualDefaultMaterialComponentFunc(
          material,
          defaultMaterialData,
          engineState,
        ) ?
          Some(defaultMaterial) :
          _findMaterialAsset(
            (materialAssetDataMap, material, imageUint8ArrayDataMap),
            engineState,
            isMaterialDataEqualFunc,
          );

      (
        targetMaterial,
        replacedTargetMaterialMap
        |> WonderCommonlib.ImmutableSparseMapService.set(
             material,
             targetMaterial,
           ),
      );
    | Some(targetMaterial) => (targetMaterial, replacedTargetMaterialMap)
    };

  (
    Some(material),
    targetMaterial,
    Some(materialType),
    replacedTargetMaterialMap,
  );
};

let getRelatedMaterialDataFromGameObject =
    (
      gameObject,
      replacedTargetMaterialMap,
      imageUint8ArrayDataMap,
      (defaultBasicMaterialData, defaultLightMaterialData),
      (basicMaterialDataMap, lightMaterialDataMap),
      isLightMaterialDataEqualFunc,
      engineState,
    ) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    _getRelatedMaterialData(
      (gameObject, replacedTargetMaterialMap, imageUint8ArrayDataMap),
      (
        MaterialDataAssetType.BasicMaterial,
        basicMaterialDataMap,
        defaultBasicMaterialData,
      ),
      (
        GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
        isEqualDefaultBasicMaterial,
        isBasicMaterialDataEqual,
      ),
      engineState,
    ) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      _getRelatedMaterialData(
        (gameObject, replacedTargetMaterialMap, imageUint8ArrayDataMap),
        (
          MaterialDataAssetType.LightMaterial,
          lightMaterialDataMap,
          defaultLightMaterialData,
        ),
        (
          GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
          isEqualDefaultLightMaterial,
          isLightMaterialDataEqualFunc,
        ),
        engineState,
      ) :
      (None, None, None, replacedTargetMaterialMap);

let doesNeedReplaceMaterial =
    ((sourceMaterial, targetMaterial, materialType)) =>
  switch (sourceMaterial, targetMaterial, materialType) {
  | (Some(_), Some(_), Some(_)) => true
  | _ => false
  };

let replaceToMaterialAssetMaterialComponent =
    (gameObject, (sourceMaterial, targetMaterial, materialType), engineState) =>
  switch (sourceMaterial, targetMaterial, materialType) {
  | (Some(sourceMaterial), Some(targetMaterial), Some(materialType)) =>
    switch (materialType) {
    | MaterialDataAssetType.BasicMaterial =>
      engineState
      |> GameObjectComponentEngineService.disposeBasicMaterialComponentRemoveTexture(
           gameObject,
           sourceMaterial,
         )
      |> GameObjectComponentEngineService.addBasicMaterialComponent(
           gameObject,
           targetMaterial,
         )
    | MaterialDataAssetType.LightMaterial =>
      engineState
      |> GameObjectComponentEngineService.disposeLightMaterialComponentRemoveTexture(
           gameObject,
           sourceMaterial,
         )
      |> GameObjectComponentEngineService.addLightMaterialComponent(
           gameObject,
           targetMaterial,
         )
    }
  | _ => engineState
  };

let getLightMaterialData = (material, (editorState, engineState)) => (
  LightMaterialEngineService.getLightMaterialName(material, engineState),
  LightMaterialEngineService.getLightMaterialDiffuseColor(
    material,
    engineState,
  ),
  LightMaterialEngineService.getLightMaterialShininess(material, engineState),
  switch (
    LightMaterialEngineService.getLightMaterialDiffuseMap(
      material,
      engineState,
    )
  ) {
  | None => None
  | Some(map) =>
    Some(
      RelateGameObjectAndTextureAssetUtils.getTextureData(
        map,
        (editorState, engineState),
      ),
    )
  },
);

let getDefaultMaterialData = (editorState, engineState) => {
  let defaultBasicMaterialData =
    MaterialDataAssetEditorService.unsafeGetDefaultBasicMaterial(editorState);
  let defaultBasicMaterialData = (
    defaultBasicMaterialData,
    getBasicMaterialData(defaultBasicMaterialData, engineState),
  );

  let defaultLightMaterialData =
    MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(editorState);
  let defaultLightMaterialData = (
    defaultLightMaterialData,
    getLightMaterialData(
      defaultLightMaterialData,
      (editorState, engineState),
    ),
  );

  (defaultBasicMaterialData, defaultLightMaterialData);
};

let getBasicMaterialDataMap = (basicMaterialMap, engineState) =>
  basicMaterialMap
  /* |> WonderCommonlib.ImmutableSparseMapService.getValidValues */
  |> WonderCommonlib.ImmutableSparseMapService.mapValid((. material) =>
       (material, getBasicMaterialData(material, engineState))
     );

let getLightMaterialDataMap = (lightMaterialMap, (editorState, engineState)) =>
  lightMaterialMap
  /* |> WonderCommonlib.ImmutableSparseMapService.getValidValues */
  |> WonderCommonlib.ImmutableSparseMapService.mapValid((. material) =>
       (
         material,
         getLightMaterialData(material, (editorState, engineState)),
       )
     );