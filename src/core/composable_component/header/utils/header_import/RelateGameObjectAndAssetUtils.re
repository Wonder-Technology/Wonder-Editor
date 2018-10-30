open Js.Typed_array;

let _isValueEqual = (key1, key2, getFunc, engineState) =>
  getFunc(key1, engineState) == getFunc(key2, engineState);

let _isBasicMaterialDataEqual = (material1, material2, _, (_, engineState)) =>
  _isValueEqual(
    material1,
    material2,
    BasicMaterialEngineService.getBasicMaterialName,
    engineState,
  )
  && _isValueEqual(
       material1,
       material2,
       BasicMaterialEngineService.getColor,
       engineState,
     );

let _isImageValueEqual = (image1, image2, getFunc) =>
  getFunc(image1) == getFunc(image2);

let _getImageUint8ArrayByTextureComponent = (textureComponent, editorState) =>
  switch (
    AssetTextureNodeMapEditorService.getResultByTextureComponent(
      textureComponent,
      editorState,
    )
  ) {
  | None => None
  | Some(({image}: AssetNodeType.textureResultType)) =>
    AssetImageNodeMapEditorService.getUint8Array(
      image,
      AssetImageNodeMapEditorService.getImageNodeMap(editorState),
    )
  };

let _isImageNodeDataEqual =
    (
      (textureAsset1, texture2, wdbImageUint8ArrayDataMap),
      image1,
      image2,
      editorState,
    ) => {
  /* WonderLog.Log.print("is image data equal") |> ignore; */

  let (_, imageUint8Array2) =
    wdbImageUint8ArrayDataMap
    |> WonderCommonlib.SparseMapService.unsafeGet(texture2);

  _isImageValueEqual(image1, image2, ImageUtils.getImageName)
  && _isImageValueEqual(image1, image2, ImageUtils.getImageWidth)
  && _isImageValueEqual(image1, image2, ImageUtils.getImageHeight)
  && Uint8ArrayService.isUint8ArrayEqual(
       _getImageUint8ArrayByTextureComponent(textureAsset1, editorState),
       Some(imageUint8Array2),
     );
};

let _isTextureDataEqual =
    (
      texture1,
      texture2,
      wdbImageUint8ArrayDataMap,
      (editorState, engineState),
    ) =>
  _isValueEqual(
    texture1,
    texture2,
    BasicSourceTextureEngineService.getBasicSourceTextureName,
    engineState,
  )
  && _isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getWrapS,
       engineState,
     )
  && _isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getWrapT,
       engineState,
     )
  && _isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getMinFilter,
       engineState,
     )
  && _isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getMagFilter,
       engineState,
     )
  && _isImageNodeDataEqual(
       (texture1, texture2, wdbImageUint8ArrayDataMap),
       BasicSourceTextureEngineService.unsafeGetSource(texture1, engineState),
       BasicSourceTextureEngineService.unsafeGetSource(texture2, engineState),
       editorState,
     );

let _isLightMaterialDataEqual =
    (
      material1,
      material2,
      wdbImageUint8ArrayDataMap,
      (editorState, engineState),
    ) =>
  /* WonderLog.Log.print(("is mat equal: ", material1, material2)) |> ignore; */
  _isValueEqual(
    material1,
    material2,
    LightMaterialEngineService.getLightMaterialName,
    engineState,
  )
  && _isValueEqual(
       material1,
       material2,
       LightMaterialEngineService.getLightMaterialDiffuseColor,
       engineState,
     )
  && _isValueEqual(
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
      _isTextureDataEqual(
        map1,
        map2,
        wdbImageUint8ArrayDataMap,
        (editorState, engineState),
      )
    | _ => false
    }
  );

let _replaceToMaterialAssetMaterialComponent =
    (
      gameObject,
      materialMap,
      wdbImageUint8ArrayDataMap,
      defaultMaterial,
      (
        unsafeGetMaterialComponentFunc,
        isDefaultMaterialComponentFunc,
        isMaterialDataEqualFunc,
        disposeMaterialComponentFunc,
        addMaterialComponentFunc,
      ),
      (editorState, engineState),
    ) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      test(
        Log.buildAssertMessage(
          ~expect=
            {j|asset material component has not been added to gameObject|j},
          ~actual={j|has|j},
        ),
        () => {
          let material =
            unsafeGetMaterialComponentFunc(gameObject, engineState);

          materialMap
          |> SparseMapService.getValidValues
          |> SparseMapService.includes(material)
          |> assertFalse;
        },
      );
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
      );
    },
    StateEditorService.getStateIsDebug(),
  );

  let material = unsafeGetMaterialComponentFunc(gameObject, engineState);

  let targetMaterial =
    isDefaultMaterialComponentFunc(material, defaultMaterial, engineState) ?
      Some(defaultMaterial) :
      (
        switch (
          materialMap
          |> SparseMapService.getValidValues
          |> SparseMapService.find(assetMaterialComponent =>
               isMaterialDataEqualFunc(
                 assetMaterialComponent,
                 material,
                 wdbImageUint8ArrayDataMap,
                 (editorState, engineState),
               )
             )
        ) {
        | None => None
        | Some(assetMaterialComponent) => Some(assetMaterialComponent)
        }
      );

  switch (targetMaterial) {
  | None => engineState
  | Some(targetMaterial) =>
    engineState
    |> disposeMaterialComponentFunc(gameObject, material)
    |> addMaterialComponentFunc(gameObject, targetMaterial)
  };
};

let _isDefaultBasicMaterial =
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

let _isDefaultLightMaterial =
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

let _replaceGameObjectMaterialComponentToMaterialAsset =
    (
      gameObject,
      wdbImageUint8ArrayDataMap,
      (defaultBasicMaterial, defaultLightMaterial),
      (basicMaterialMap, lightMaterialMap),
      (editorState, engineState),
    ) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    _replaceToMaterialAssetMaterialComponent(
      gameObject,
      basicMaterialMap,
      wdbImageUint8ArrayDataMap,
      defaultBasicMaterial,
      (
        GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
        _isDefaultBasicMaterial,
        _isBasicMaterialDataEqual,
        GameObjectComponentEngineService.disposeBasicMaterialComponent,
        GameObjectComponentEngineService.addBasicMaterialComponent,
      ),
      (editorState, engineState),
    ) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      _replaceToMaterialAssetMaterialComponent(
        gameObject,
        lightMaterialMap,
        wdbImageUint8ArrayDataMap,
        defaultLightMaterial,
        (
          GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
          _isDefaultLightMaterial,
          _isLightMaterialDataEqual,
          GameObjectComponentEngineService.disposeLightMaterialComponent,
          GameObjectComponentEngineService.addLightMaterialComponent,
        ),
        (editorState, engineState),
      ) :
      engineState;

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

let _isGeometryDataEqual = (geometry1, geometry2, engineState) =>
  _isValueEqual(
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

let _getTargetGeometryByJudgeDefaultGeometry =
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

let _replaceGeometryComponent =
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

let _replaceGameObjectGeometryComponentToWDBAssetGeometryComponent =
    (
      gameObject,
      (
        (defaultCubeGeometry, defaultCubeGeometryName),
        (defaultSphereGeometry, defaultSphereGeometryName),
      ),
      wdbAssetGameObjectGeometryArr,
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
      switch (
        _getTargetGeometryByJudgeDefaultGeometry(
          geometry,
          (
            (defaultCubeGeometry, defaultCubeGeometryName),
            (defaultSphereGeometry, defaultSphereGeometryName),
          ),
          engineState,
        )
      ) {
      | Some(targetGeometry) => Some(targetGeometry)
      | None =>
        wdbAssetGameObjectGeometryArr
        |> Js.Array.find(wdbAssetGameObjectGeometry =>
             _isGeometryDataEqual(
               wdbAssetGameObjectGeometry,
               geometry,
               engineState,
             )
           )
      };

    _replaceGeometryComponent(
      gameObject,
      geometry,
      targetGeometry,
      engineState,
    );
  };

let _replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent =
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
      _getTargetGeometryByJudgeDefaultGeometry(
        geometry,
        (
          (defaultCubeGeometry, defaultCubeGeometryName),
          (defaultSphereGeometry, defaultSphereGeometryName),
        ),
        engineState,
      );

    _replaceGeometryComponent(
      gameObject,
      geometry,
      targetGeometry,
      engineState,
    );
  };

let relateSceneWDBGameObjectsAndAssets =
    (
      allWDBGameObjectsArr,
      wdbImageUint8ArrayDataMap,
      (basicMaterialMap, lightMaterialMap),
      wdbAssetGameObjectGeometryArr,
    ) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let defaultBasicMaterial =
    AssetMaterialDataEditorService.unsafeGetDefaultBasicMaterial(editorState);
  let defaultLightMaterial =
    AssetMaterialDataEditorService.unsafeGetDefaultLightMaterial(editorState);

  let defaultCubeGeometryData = (
    AssetGeometryDataEditorService.unsafeGetDefaultCubeGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentUtils.getDefaultCubeGeometryName(),
  );
  let defaultSphereGeometryData = (
    AssetGeometryDataEditorService.unsafeGetDefaultSphereGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentUtils.getDefaultSphereGeometryName(),
  );

  let engineState =
    allWDBGameObjectsArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) => {
           let engineState =
             _replaceGameObjectMaterialComponentToMaterialAsset(
               gameObject,
               wdbImageUint8ArrayDataMap,
               (defaultBasicMaterial, defaultLightMaterial),
               (basicMaterialMap, lightMaterialMap),
               (editorState, engineState),
             );

           engineState
           |> _replaceGameObjectGeometryComponentToWDBAssetGeometryComponent(
                gameObject,
                (defaultCubeGeometryData, defaultSphereGeometryData),
                wdbAssetGameObjectGeometryArr,
              )
           |> GameObjectEngineService.initGameObject(gameObject);
         },
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
};

let relateWDBAssetGameObjectsAndAssets =
    (
      allWDBGameObjectsArr,
      wdbImageUint8ArrayDataMap,
      (basicMaterialMap, lightMaterialMap),
    ) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let defaultBasicMaterial =
    AssetMaterialDataEditorService.unsafeGetDefaultBasicMaterial(editorState);
  let defaultLightMaterial =
    AssetMaterialDataEditorService.unsafeGetDefaultLightMaterial(editorState);

  let defaultCubeGeometryData = (
    AssetGeometryDataEditorService.unsafeGetDefaultCubeGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentUtils.getDefaultCubeGeometryName(),
  );
  let defaultSphereGeometryData = (
    AssetGeometryDataEditorService.unsafeGetDefaultSphereGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentUtils.getDefaultSphereGeometryName(),
  );

  let engineState =
    allWDBGameObjectsArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) => {
           let engineState =
             _replaceGameObjectMaterialComponentToMaterialAsset(
               gameObject,
               wdbImageUint8ArrayDataMap,
               (defaultBasicMaterial, defaultLightMaterial),
               (basicMaterialMap, lightMaterialMap),
               (editorState, engineState),
             );

           engineState
           |> _replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                gameObject,
                (defaultCubeGeometryData, defaultSphereGeometryData),
              )
           |> GameObjectEngineService.initGameObject(gameObject);
         },
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
};