open Js.Typed_array;

let isValueEqual = (key1, key2, getFunc, engineState) =>
  getFunc(key1, engineState) == getFunc(key2, engineState);

let _isNameEqual =
    (name1, component2, (getNameFunc, isDefaultNameFunc), engineState) =>
  switch (name1, getNameFunc(component2, engineState)) {
  | (Some(name1), Some(name2)) =>
    isDefaultNameFunc(name1) && isDefaultNameFunc(name2) ?
      true : name1 == name2
  | (None, None) => true
  | _ => false
  };

let _isBasicMaterialNameEqual = (name1, material2, engineState) =>
  _isNameEqual(
    name1,
    material2,
    (
      BasicMaterialEngineService.getBasicMaterialName,
      ConverterEngineService.isDefaultBasicMaterialName,
    ),
    engineState,
  );

let _isLightMaterialNameEqual = (name1, material2, engineState) =>
  _isNameEqual(
    name1,
    material2,
    (
      LightMaterialEngineService.getLightMaterialName,
      ConverterEngineService.isDefaultLightMaterialName,
    ),
    engineState,
  );

let _isTextureNameEqual = (name1, texture2, engineState) =>
  _isNameEqual(
    name1,
    texture2,
    (
      BasicSourceTextureEngineService.getBasicSourceTextureName,
      ConverterEngineService.isDefaultTextureName,
    ),
    engineState,
  );

let _isImageNameEqual = (name1, image2) => {
  let name2 = ImageUtils.getImageName(image2);

  ConverterEngineService.isDefaultImageName(name1)
  && ConverterEngineService.isDefaultImageName(name2) ?
    true : name1 == name2;
};

let isBasicMaterialDataEqual =
    ((name, color), material2, _imageUint8ArrayDataMap, engineState) =>
  _isBasicMaterialNameEqual(name, material2, engineState)
  && color == BasicMaterialEngineService.getColor(material2, engineState);

let _isImageValueEqual = (image1, image2, getFunc) =>
  getFunc(image1) == getFunc(image2);

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

let _isImageNodeDataEqual =
    (
      (name, width, height, uint8Array),
      image2,
      texture2,
      imageUint8ArrayDataMap,
    ) =>
  _isImageNameEqual(name, image2)
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
  && _isImageNodeDataEqual(
       imageData,
       BasicSourceTextureEngineService.unsafeGetSource(texture2, engineState),
       texture2,
       imageUint8ArrayDataMap,
     );

let isLightMaterialDataEqual =
    (
      (name, diffuseColor, shininess, textureData),
      material2,
      imageUint8ArrayDataMap,
      engineState,
    ) =>
  _isLightMaterialNameEqual(name, material2, engineState)
  &&
  diffuseColor == LightMaterialEngineService.getLightMaterialDiffuseColor(
                    material2,
                    engineState,
                  )
  &&
  shininess == LightMaterialEngineService.getLightMaterialShininess(
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
      isTextureDataEqual(
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
  engineState
  |>
  BasicMaterialEngineService.getBasicMaterialName(gameObjectMaterial) === name;

let isEqualDefaultLightMaterial =
    (gameObjectMaterial, (_, (name, _, _, _)), engineState) =>
  engineState
  |>
  LightMaterialEngineService.getLightMaterialName(gameObjectMaterial) === name;

let getRelatedMaterialData =
    (
      gameObject,
      replacedTargetMaterialMap,
      imageUint8ArrayDataMap,
      (materialType, assetMaterialDataMap, defaultMaterialData),
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
      |> WonderCommonlib.SparseMapService.get(material)
    ) {
    | None =>
      let targetMaterial =
        isEqualDefaultMaterialComponentFunc(
          material,
          defaultMaterialData,
          engineState,
        ) ?
          Some(defaultMaterial) :
          (
            switch (
              assetMaterialDataMap
              |> SparseMapService.find(((_, assetMaterialData)) =>
                   isMaterialDataEqualFunc(
                     assetMaterialData,
                     material,
                     imageUint8ArrayDataMap,
                     engineState,
                   )
                 )
            ) {
            | None => None
            | Some((assetMaterialComponent, _)) =>
              Some(assetMaterialComponent)
            }
          );

      (
        targetMaterial,
        replacedTargetMaterialMap
        |> WonderCommonlib.SparseMapService.set(material, targetMaterial),
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
      engineState,
    ) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    getRelatedMaterialData(
      gameObject,
      replacedTargetMaterialMap,
      imageUint8ArrayDataMap,
      (
        AssetMaterialDataType.BasicMaterial,
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
      getRelatedMaterialData(
        gameObject,
        replacedTargetMaterialMap,
        imageUint8ArrayDataMap,
        (
          AssetMaterialDataType.LightMaterial,
          lightMaterialDataMap,
          defaultLightMaterialData,
        ),
        (
          GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
          isEqualDefaultLightMaterial,
          isLightMaterialDataEqual,
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
    | AssetMaterialDataType.BasicMaterial =>
      engineState
      |> GameObjectComponentEngineService.disposeBasicMaterialComponent(
           gameObject,
           sourceMaterial,
         )
      |> GameObjectComponentEngineService.addBasicMaterialComponent(
           gameObject,
           targetMaterial,
         )
    | AssetMaterialDataType.LightMaterial =>
      engineState
      |> GameObjectComponentEngineService.disposeLightMaterialComponent(
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
          switch (
            textureAssetDataMap
            |> SparseMapService.find(((textureComponent, textureAssetData)) =>
                 isTextureDataEqual(
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

let getGeometryData = (geometry, engineState) => (
  GeometryEngineService.getGeometryName(geometry, engineState),
  GeometryEngineService.getGeometryVertices(geometry, engineState),
  GeometryEngineService.getGeometryNormals(geometry, engineState),
  GeometryEngineService.getGeometryTexCoords(geometry, engineState),
  GeometryEngineService.getGeometryIndices(geometry, engineState),
);

let isGeometryDataEqual =
    (
      (name1, vertices1, normals1, texCoords1, indices1),
      (name2, vertices2, normals2, texCoords2, indices2),
      engineState,
    ) =>
  name1 === name2
  && GeometryAssetLogicService.isGeometryPointDataEqual(
       vertices1,
       vertices2,
       Float32Array.length,
     )
  && GeometryAssetLogicService.isGeometryPointDataEqual(
       normals1,
       normals2,
       Float32Array.length,
     )
  && GeometryAssetLogicService.isGeometryPointDataEqual(
       texCoords1,
       texCoords2,
       Float32Array.length,
     )
  && GeometryAssetLogicService.isGeometryPointDataEqual(
       indices1,
       indices2,
       Uint16Array.length,
     );

let isDefaultGeometry = (geometry, (editorState, engineState)) => {
  let (defaultCubeGeometry, defaultCubeGeometryName) = (
    GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentUtils.getDefaultCubeGeometryName(),
  );
  let (defaultSphereGeometry, defaultSphereGeometryName) = (
    GeometryDataAssetEditorService.unsafeGetDefaultSphereGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentUtils.getDefaultSphereGeometryName(),
  );

  GeometryAssetLogicService.isGeometryEqualDefaultGeometryData(
    geometry,
    defaultCubeGeometry,
    defaultCubeGeometryName,
    engineState,
  )
  || GeometryAssetLogicService.isGeometryEqualDefaultGeometryData(
       geometry,
       defaultSphereGeometry,
       defaultSphereGeometryName,
       engineState,
     );
};

let getTargetGeometryByJudgeDefaultGeometry =
    (
      geometryData,
      (
        (
          defaultCubeGeometry,
          defaultCubeGeometryName,
          defaultCubeGeometryData,
        ),
        (
          defaultSphereGeometry,
          defaultSphereGeometryName,
          defaultSphereGeometryData,
        ),
      ),
      engineState,
    ) =>
  isGeometryDataEqual(geometryData, defaultCubeGeometryData, engineState) ?
    Some(defaultCubeGeometry) :
    isGeometryDataEqual(geometryData, defaultSphereGeometryData, engineState) ?
      Some(defaultSphereGeometry) : None;

let replaceGeometryComponent =
    (gameObject, sourceGeomtry, targetGeometry, engineState) =>
  switch (targetGeometry) {
  | None => engineState
  | Some(targetGeometry) =>
    engineState
    |> GameObjectComponentEngineService.disposeGeometryComponent(
         gameObject,
         sourceGeomtry,
       )
    |> GameObjectComponentEngineService.addGeometryComponent(
         gameObject,
         targetGeometry,
       )
  };

let replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent =
    (
      gameObject,
      (
        (
          defaultCubeGeometry,
          defaultCubeGeometryName,
          defaultCubeGeometryData,
        ),
        (
          defaultSphereGeometry,
          defaultSphereGeometryName,
          defaultSphereGeometryData,
        ),
      ),
      engineState,
    ) =>
  switch (
    GameObjectComponentEngineService.getGeometryComponent(
      gameObject,
      engineState,
    )
  ) {
  | None => engineState
  | Some(geometry) =>
    let targetGeometry =
      getTargetGeometryByJudgeDefaultGeometry(
        getGeometryData(geometry, engineState),
        (
          (
            defaultCubeGeometry,
            defaultCubeGeometryName,
            defaultCubeGeometryData,
          ),
          (
            defaultSphereGeometry,
            defaultSphereGeometryName,
            defaultSphereGeometryData,
          ),
        ),
        engineState,
      );

    replaceGeometryComponent(
      gameObject,
      geometry,
      targetGeometry,
      engineState,
    );
  };

let getDefaultGeometryData = (editorState, engineState) => {
  let defaultGeometry =
    GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
      editorState,
    );
  let defaultCubeGeometryData = (
    defaultGeometry,
    PrepareDefaultComponentUtils.getDefaultCubeGeometryName(),
    getGeometryData(defaultGeometry, engineState),
  );

  let defaultGeometry =
    GeometryDataAssetEditorService.unsafeGetDefaultSphereGeometryComponent(
      editorState,
    );
  let defaultSphereGeometryData = (
    defaultGeometry,
    PrepareDefaultComponentUtils.getDefaultSphereGeometryName(),
    getGeometryData(defaultGeometry, engineState),
  );

  (defaultCubeGeometryData, defaultSphereGeometryData);
};

let getBasicMaterialData = (material, engineState) => (
  BasicMaterialEngineService.getBasicMaterialName(material, engineState),
  BasicMaterialEngineService.getColor(material, engineState),
);

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
  | Some(map) => Some(getTextureData(map, (editorState, engineState)))
  },
);

let getDefaultMaterialData = (editorState, engineState) => {
  let defaultBasicMaterial =
    MaterialDataAssetEditorService.unsafeGetDefaultBasicMaterial(editorState);
  let defaultBasicMaterialData = (
    defaultBasicMaterial,
    getBasicMaterialData(defaultBasicMaterial, engineState),
  );

  let defaultLightMaterial =
    MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(editorState);
  let defaultLightMaterialData = (
    defaultLightMaterial,
    getLightMaterialData(defaultLightMaterial, (editorState, engineState)),
  );

  (defaultBasicMaterialData, defaultLightMaterialData);
};

let getBasicMaterialDataMap = (basicMaterialMap, engineState) =>
  basicMaterialMap
  |> SparseMapService.getValidValues
  |> Js.Array.map(material =>
       (material, getBasicMaterialData(material, engineState))
     );

let getLightMaterialDataMap = (lightMaterialMap, (editorState, engineState)) =>
  lightMaterialMap
  |> SparseMapService.getValidValues
  |> Js.Array.map(material =>
       (
         material,
         getLightMaterialData(material, (editorState, engineState)),
       )
     );