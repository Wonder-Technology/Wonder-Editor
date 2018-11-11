open Js.Typed_array;

let isValueEqual = (key1, key2, getFunc, engineState) =>
  getFunc(key1, engineState) == getFunc(key2, engineState);

let isBasicMaterialDataEqual = (material1, material2, engineState) =>
  isValueEqual(
    material1,
    material2,
    BasicMaterialEngineService.getBasicMaterialName,
    engineState,
  )
  && isValueEqual(
       material1,
       material2,
       BasicMaterialEngineService.getColor,
       engineState,
     );

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

let _isImageNodeDataEqual = (image1, image2) =>
  _isImageValueEqual(image1, image2, ImageUtils.getImageName)
  && _isImageValueEqual(image1, image2, ImageUtils.getImageWidth)
  && _isImageValueEqual(image1, image2, ImageUtils.getImageHeight);

let _isTextureDataEqual = (texture1, texture2, engineState) =>
  isValueEqual(
    texture1,
    texture2,
    BasicSourceTextureEngineService.getBasicSourceTextureName,
    engineState,
  )
  && isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getWrapS,
       engineState,
     )
  && isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getWrapT,
       engineState,
     )
  && isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getMinFilter,
       engineState,
     )
  && isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getMagFilter,
       engineState,
     )
  && _isImageNodeDataEqual(
       BasicSourceTextureEngineService.unsafeGetSource(texture1, engineState),
       BasicSourceTextureEngineService.unsafeGetSource(texture2, engineState),
     );

let isLightMaterialDataEqual = (material1, material2, engineState) =>
  isValueEqual(
    material1,
    material2,
    LightMaterialEngineService.getLightMaterialName,
    engineState,
  )
  && isValueEqual(
       material1,
       material2,
       LightMaterialEngineService.getLightMaterialDiffuseColor,
       engineState,
     )
  && isValueEqual(
       material1,
       material2,
       LightMaterialEngineService.getLightMaterialShininess,
       engineState,
     )
  && (
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        material1,
        engineState,
      ),
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        material2,
        engineState,
      ),
    ) {
    | (None, None) => true
    | (Some(map1), Some(map2)) =>
      _isTextureDataEqual(map1, map2, engineState)
    | _ => false
    }
  );

let isEqualDefaultBasicMaterial =
    (gameObjectMaterial, defaultMaterial, engineState) =>
  engineState
  |>
  BasicMaterialEngineService.getBasicMaterialName(gameObjectMaterial) === (
                                                                    engineState
                                                                    |>
                                                                    BasicMaterialEngineService.getBasicMaterialName(
                                                                    defaultMaterial,
                                                                    )
                                                                    );

let isEqualDefaultLightMaterial =
    (gameObjectMaterial, defaultMaterial, engineState) =>
  engineState
  |>
  LightMaterialEngineService.getLightMaterialName(gameObjectMaterial) === (
                                                                    engineState
                                                                    |>
                                                                    LightMaterialEngineService.getLightMaterialName(
                                                                    defaultMaterial,
                                                                    )
                                                                    );

let getRelatedMaterialData =
    (
      gameObject,
      replacedTargetMaterialMap,
      (materialType, assetMaterialComponentMap, defaultMaterial),
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

  let (targetMaterial, replacedTargetMaterialMap) =
    switch (
      replacedTargetMaterialMap
      |> WonderCommonlib.SparseMapService.get(material)
    ) {
    | None =>
      let targetMaterial =
        isEqualDefaultMaterialComponentFunc(
          material,
          defaultMaterial,
          engineState,
        ) ?
          Some(defaultMaterial) :
          (
            switch (
              assetMaterialComponentMap
              |> SparseMapService.getValidValues
              |> SparseMapService.find(assetMaterialComponent =>
                   isMaterialDataEqualFunc(
                     assetMaterialComponent,
                     material,
                     engineState,
                   )
                 )
            ) {
            | None => None
            | Some(assetMaterialComponent) => Some(assetMaterialComponent)
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
      (defaultBasicMaterial, defaultLightMaterial),
      (basicMaterialMap, lightMaterialMap),
      engineState,
    ) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    getRelatedMaterialData(
      gameObject,
      replacedTargetMaterialMap,
      (
        AssetMaterialDataType.BasicMaterial,
        basicMaterialMap,
        defaultBasicMaterial,
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
        (
          AssetMaterialDataType.LightMaterial,
          lightMaterialMap,
          defaultLightMaterial,
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
          TextureNodeMapAssetEditorService.getValidValues(editorState)
          |> SparseMapService.map(
               ({textureComponent}: AssetNodeType.textureResultType) =>
               textureComponent
             )
          |> SparseMapService.find(textureComponent =>
               _isTextureDataEqual(
                 textureComponent,
                 sourceTexture,
                 engineState,
               )
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
    (gameObject, replacedTargetTextureMap, (editorState, engineState)) =>
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

let _isGeometryPointDataEqual = (points1, points2, getLengthFunc, engineState) =>
  getLengthFunc(points1) === getLengthFunc(points2) && points1 == points2;

let _isGeometryVertexDataEqual = (geometry1, geometry2, engineState) =>
  _isGeometryPointDataEqual(
    GeometryEngineService.getGeometryVertices(geometry1, engineState),
    GeometryEngineService.getGeometryVertices(geometry2, engineState),
    Float32Array.length,
    engineState,
  )
  && _isGeometryPointDataEqual(
       GeometryEngineService.getGeometryNormals(geometry1, engineState),
       GeometryEngineService.getGeometryNormals(geometry2, engineState),
       Float32Array.length,
       engineState,
     )
  && _isGeometryPointDataEqual(
       GeometryEngineService.getGeometryTexCoords(geometry1, engineState),
       GeometryEngineService.getGeometryTexCoords(geometry2, engineState),
       Float32Array.length,
       engineState,
     )
  && _isGeometryPointDataEqual(
       GeometryEngineService.getGeometryIndices(geometry1, engineState),
       GeometryEngineService.getGeometryIndices(geometry2, engineState),
       Uint16Array.length,
       engineState,
     );

let isGeometryDataEqual = (geometry1, geometry2, engineState) =>
  isValueEqual(
    geometry1,
    geometry2,
    GeometryEngineService.getGeometryName,
    engineState,
  )
  && _isGeometryVertexDataEqual(geometry1, geometry2, engineState);

let _isGeometryEqualDefaultGeometryData =
    (geometry, defaultGeometry, defaultGeometryName, engineState) =>
  GeometryEngineService.unsafeGetGeometryName(geometry, engineState)
  == defaultGeometryName
  && _isGeometryVertexDataEqual(geometry, defaultGeometry, engineState);

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

  _isGeometryEqualDefaultGeometryData(
    geometry,
    defaultCubeGeometry,
    defaultCubeGeometryName,
    engineState,
  )
  || _isGeometryEqualDefaultGeometryData(
       geometry,
       defaultSphereGeometry,
       defaultSphereGeometryName,
       engineState,
     );
};

let getTargetGeometryByJudgeDefaultGeometry =
    (
      geometry,
      (
        (defaultCubeGeometry, defaultCubeGeometryName),
        (defaultSphereGeometry, defaultSphereGeometryName),
      ),
      engineState,
    ) =>
  _isGeometryEqualDefaultGeometryData(
    geometry,
    defaultCubeGeometry,
    defaultCubeGeometryName,
    engineState,
  ) ?
    Some(defaultCubeGeometry) :
    _isGeometryEqualDefaultGeometryData(
      geometry,
      defaultSphereGeometry,
      defaultSphereGeometryName,
      engineState,
    ) ?
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
        (defaultCubeGeometry, defaultCubeGeometryName),
        (defaultSphereGeometry, defaultSphereGeometryName),
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
        geometry,
        (
          (defaultCubeGeometry, defaultCubeGeometryName),
          (defaultSphereGeometry, defaultSphereGeometryName),
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