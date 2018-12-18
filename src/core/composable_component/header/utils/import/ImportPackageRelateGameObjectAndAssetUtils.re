open Js.Typed_array;

let _isImageUint8ArrayWhichHasLengthData = uint8Array =>
  GenerateSceneGraphEngineService.isUint8ArrayHasOneUint32Data(uint8Array);

let _isImageUint8ArrayWhichHasLengthDataEqual =
    (imageUint8ArrayWhichHasLengthData, uint8Array) =>
  switch (uint8Array) {
  | None => true
  | Some(uint8Array) =>
    uint8Array
    |>
    Uint8Array.length === GenerateSceneGraphEngineService.readUint32DataFromUint8Array(
                            imageUint8ArrayWhichHasLengthData,
                          )
  };

let _isImageDataEqual =
    (
      (name, width, height, uint8Array),
      image2,
      texture2,
      imageUint8ArrayDataMap,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|gameObject->image to be nullable|j},
                ~actual={j|not|j},
              ),
              () =>
              image2 |> Obj.magic |> Js.Nullable.isNullable |> assertTrue
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  switch (
    imageUint8ArrayDataMap |> WonderCommonlib.SparseMapService.get(texture2)
  ) {
  | None => true
  | Some((_, uint8Array2)) =>
    _isImageUint8ArrayWhichHasLengthData(uint8Array2) ?
      _isImageUint8ArrayWhichHasLengthDataEqual(uint8Array2, uint8Array) :
      WonderLog.Log.fatal(
        LogUtils.buildFatalMessage(
          ~description={j|should be image uint8Array which has length data|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
  };
};

let _isLightMaterialDataEqualForSceneGameObject =
    (
      (name, diffuseColor, shininess, textureData),
      material2,
      imageUint8ArrayDataMap,
      engineState,
    ) =>
  RelateGameObjectAndMaterialAssetUtils.isLightMaterialDataEqual(
    (name, diffuseColor, shininess, textureData),
    material2,
    imageUint8ArrayDataMap,
    RelateGameObjectAndTextureAssetUtils.isTextureDataEqual(
      _isImageDataEqual,
    ),
    engineState,
  );

let _replaceGameObjectMaterialComponentToMaterialAsset =
    (
      gameObject,
      (defaultMaterialData, materialDataMapData, imageUint8ArrayDataMap),
      isLightMaterialDataEqualFunc,
      engineState,
    ) => {
  let (sourceMaterial, targetMaterial, materialType, _) =
    RelateGameObjectAndMaterialAssetUtils.getRelatedMaterialDataFromGameObject(
      gameObject,
      WonderCommonlib.SparseMapService.createEmpty(),
      imageUint8ArrayDataMap,
      defaultMaterialData,
      materialDataMapData,
      isLightMaterialDataEqualFunc,
      engineState,
    );

  RelateGameObjectAndMaterialAssetUtils.replaceToMaterialAssetMaterialComponent(
    gameObject,
    (sourceMaterial, targetMaterial, materialType),
    engineState,
  );
};

let _replaceSceneGameObjectMaterialComponentToMaterialAsset =
    (
      gameObject,
      defaultMaterialData,
      materialDataMapData,
      imageUint8ArrayDataMap,
      engineState,
    ) =>
  _replaceGameObjectMaterialComponentToMaterialAsset(
    gameObject,
    (defaultMaterialData, materialDataMapData, imageUint8ArrayDataMap),
    _isLightMaterialDataEqualForSceneGameObject,
    engineState,
  );

let _isLightMaterialDataEqualForWDBAssetGameObject =
    (
      (name, diffuseColor, shininess, textureData),
      material2,
      imageUint8ArrayDataMap,
      engineState,
    ) =>
  /* RelateGameObjectAndMaterialAssetUtils.isLightMaterialDataEqual(
       (name, diffuseColor, shininess, textureData),
       material2,
       imageUint8ArrayDataMap,
       RelateGameObjectAndTextureAssetUtils.isTextureDataEqual(
         RelateGameObjectAndTextureAssetUtils.isImageDataEqual,
       ),
       engineState,
     ); */
  RelateGameObjectAndMaterialAssetUtils.isLightMaterialDataEqual(
    (name, diffuseColor, shininess, textureData),
    material2,
    imageUint8ArrayDataMap,
    RelateGameObjectAndTextureAssetUtils.isTextureDataEqual(
      _isImageDataEqual,
    ),
    engineState,
  );

let _replaceWDBAssetGameObjectMaterialComponentToMaterialAsset =
    (
      gameObject,
      defaultMaterialData,
      materialDataMapData,
      imageUint8ArrayDataMap,
      engineState,
    ) =>
  _replaceGameObjectMaterialComponentToMaterialAsset(
    gameObject,
    (defaultMaterialData, materialDataMapData, imageUint8ArrayDataMap),
    _isLightMaterialDataEqualForWDBAssetGameObject,
    engineState,
  );

let _isWdbAssetGameObjectGeometry =
    (geometry, wdbAssetGameObjectGeometryDataArr) =>
  wdbAssetGameObjectGeometryDataArr
  |> Js.Array.find(((wdbAssetGameObjectGeometry, _)) =>
       geometry === wdbAssetGameObjectGeometry
     )
  |> Js.Option.isSome;

let _checkGameObjectGeometryComponent =
    (geometry, wdbAssetGameObjectGeometryDataArr) =>
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|gameObject not has wdb asset gameObject->geometry|j},
                ~actual={j|has|j},
              ),
              () =>
              _isWdbAssetGameObjectGeometry(
                geometry,
                wdbAssetGameObjectGeometryDataArr,
              )
              |> assertFalse
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

let _isGeometryPointDataEqual =
    (sceneGameObjectGeometryPointsLength, points2, getLengthFunc) =>
  sceneGameObjectGeometryPointsLength === getLengthFunc(points2);

let _getSceneGameObjectGeometryPointsLength = points =>
  points |> Float32Array.unsafe_get(_, 0) |> NumberType.convertFloatToInt;

let _isGeometryDataEqualForSceneGameObjectGeometry =
    (
      (name1, vertices1, normals1, texCoords1),
      (name2, vertices2, normals2, texCoords2),
      engineState,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect=
                {j|scene geometry data->points should only has one point data|j},
              ~actual={j|not|j},
            ),
            () =>
            (
              vertices1 |> Float32Array.length,
              normals1 |> Float32Array.length,
              texCoords1 |> Float32Array.length,
            )
            == (3, 3, 2)
            |> assertTrue
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  RelateGameObjectAndGeometryAssetUtils.isGeometryNameEqual(name1, name2)
  && _isGeometryPointDataEqual(
       vertices1 |> _getSceneGameObjectGeometryPointsLength,
       vertices2,
       Float32Array.length,
     )
  && _isGeometryPointDataEqual(
       normals1 |> _getSceneGameObjectGeometryPointsLength,
       normals2,
       Float32Array.length,
     )
  && _isGeometryPointDataEqual(
       texCoords1 |> _getSceneGameObjectGeometryPointsLength,
       texCoords2,
       Float32Array.length,
     );
};

let _findWDBAssetGameObjectGeometry =
    (
      sceneGameObjectGeometryData,
      wdbAssetGameObjectGeometryDataArr,
      engineState,
    ) =>
  switch (
    wdbAssetGameObjectGeometryDataArr
    |> Js.Array.find(((_, wdbAssetGameObjectGeometryData)) =>
         _isGeometryDataEqualForSceneGameObjectGeometry(
           sceneGameObjectGeometryData,
           wdbAssetGameObjectGeometryData,
           engineState,
         )
       )
  ) {
  | None => None
  | Some((wdbAssetGameObjectGeometry, _)) => Some(wdbAssetGameObjectGeometry)
  };

let _replaceSceneGameObjectGeometryComponentToWDBAssetGeometryComponent =
    (
      gameObject,
      defaultGeometryData,
      wdbAssetGameObjectGeometryDataArr,
      editorState,
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
    _checkGameObjectGeometryComponent(
      geometry,
      wdbAssetGameObjectGeometryDataArr,
    );

    let sceneGameObjectGeometryData =
      RelateGameObjectAndGeometryAssetUtils.getGeometryData(
        geometry,
        engineState,
      );

    let targetGeometry =
      switch (
        RelateGameObjectAndGeometryAssetUtils.getTargetGeometryByJudgeDefaultGeometry(
          sceneGameObjectGeometryData,
          defaultGeometryData,
          RelateGameObjectAndGeometryAssetUtils.isGeometryDataEqualForDefaultGeometry,
          engineState,
        )
      ) {
      | Some(targetGeometry) => Some(targetGeometry)
      | Some(targetGeometry) => None
      | None =>
        _findWDBAssetGameObjectGeometry(
          sceneGameObjectGeometryData,
          wdbAssetGameObjectGeometryDataArr,
          engineState,
        )
      };

    RelateGameObjectAndGeometryAssetUtils.replaceGeometryComponent(
      gameObject,
      geometry,
      targetGeometry,
      engineState,
    );
  };

let _getGeometryDataArr = (geometryArr, engineState) =>
  geometryArr
  |> Js.Array.map(geometry =>
       (
         geometry,
         RelateGameObjectAndGeometryAssetUtils.getGeometryData(
           geometry,
           engineState,
         ),
       )
     );

let relateSceneWDBGameObjectsAndAssets =
    (
      allWDBGameObjectsArr,
      imageUint8ArrayDataMap,
      (basicMaterialMap, lightMaterialMap),
      wdbAssetGameObjectGeometryAssetArr,
    ) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let basicMaterialDataMap =
    RelateGameObjectAndMaterialAssetUtils.getBasicMaterialDataMap(
      basicMaterialMap,
      engineState,
    );

  let lightMaterialDataMap =
    RelateGameObjectAndMaterialAssetUtils.getLightMaterialDataMap(
      lightMaterialMap,
      (editorState, engineState),
    );

  let defaultMaterialData =
    RelateGameObjectAndMaterialAssetUtils.getDefaultMaterialData(
      editorState,
      engineState,
    );

  let defaultGeometryData =
    RelateGameObjectAndGeometryAssetUtils.getDefaultGeometryData(
      editorState,
      engineState,
    );

  let wdbAssetGameObjectGeometryDataArr =
    _getGeometryDataArr(wdbAssetGameObjectGeometryAssetArr, engineState);

  let engineState =
    allWDBGameObjectsArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           _replaceSceneGameObjectMaterialComponentToMaterialAsset(
             gameObject,
             defaultMaterialData,
             (basicMaterialDataMap, lightMaterialDataMap),
             imageUint8ArrayDataMap,
             engineState,
           )
           |> _replaceSceneGameObjectGeometryComponentToWDBAssetGeometryComponent(
                gameObject,
                defaultGeometryData,
                wdbAssetGameObjectGeometryDataArr,
                editorState,
              ),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;

  ()
  |> WonderLog.Contract.ensureCheck(
       r => {
         open WonderLog;
         open Contract;
         open Operators;

         let sceneGeometryAssets =
           GeometryAssetLogicService.getGeometryAssetsFromWDBGameObjects(
             allWDBGameObjectsArr,
             (editorState, engineState),
           );
         test(
           Log.buildAssertMessage(
             ~expect=
               {j|wdb assets->geometry assets: $wdbAssetGameObjectGeometryAssetArr include scene wdb gameObjects->geometry assets: $sceneGeometryAssets|j},
             ~actual={j|not|j},
           ),
           () => {
             let editorState = StateEditorService.getState();
             let engineState = StateEngineService.unsafeGetState();

             ArrayService.isInclude(
               wdbAssetGameObjectGeometryAssetArr,
               sceneGeometryAssets,
             )
             |> assertTrue;
           },
         );
       },
       StateEditorService.getStateIsDebug(),
     );
};

let relateWDBAssetGameObjectsAndAssets =
    (
      allWDBGameObjectsArr,
      (basicMaterialMap, lightMaterialMap),
      imageUint8ArrayDataMap,
    ) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let basicMaterialDataMap =
    RelateGameObjectAndMaterialAssetUtils.getBasicMaterialDataMap(
      basicMaterialMap,
      engineState,
    );

  let lightMaterialDataMap =
    RelateGameObjectAndMaterialAssetUtils.getLightMaterialDataMap(
      lightMaterialMap,
      (editorState, engineState),
    );

  let defaultMaterialData =
    RelateGameObjectAndMaterialAssetUtils.getDefaultMaterialData(
      editorState,
      engineState,
    );

  let defaultGeometryData =
    RelateGameObjectAndGeometryAssetUtils.getDefaultGeometryData(
      editorState,
      engineState,
    );

  let engineState =
    allWDBGameObjectsArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           _replaceWDBAssetGameObjectMaterialComponentToMaterialAsset(
             gameObject,
             defaultMaterialData,
             (basicMaterialDataMap, lightMaterialDataMap),
             imageUint8ArrayDataMap,
             engineState,
           )
           |> RelateGameObjectAndGeometryAssetUtils.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                gameObject,
                defaultGeometryData,
              ),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
};