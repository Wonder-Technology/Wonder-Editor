open Js.Promise;

open Js.Typed_array;

let _disposeAssets = () =>
  StateEditorService.getState()
  |> AssetTreeEditorService.deepDisposeAssetTreeRoot
  |> StateEditorService.setState;

let _readWPK = (wpk, dataView) => {
  let (sceneWDBByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. 0, dataView);

  let (asbByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  (
    wpk
    |> ArrayBuffer.slice(
         ~start=byteOffset,
         ~end_=byteOffset + sceneWDBByteLength,
       ),
    wpk
    |> ArrayBuffer.sliceFrom(
         byteOffset + (sceneWDBByteLength |> BufferUtils.alignedLength),
       ),
    dataView,
  );
};

let _isValueEqual = (key1, key2, getFunc, engineState) =>
  getFunc(key1, engineState) == getFunc(key2, engineState);

let _isBasicMaterialDataEqual = (material1, material2, engineState) =>
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

let _isImageNodeDataEqual = (image1, image2) =>
  /* WonderLog.Log.print("is image data equal") |> ignore; */
  _isImageValueEqual(image1, image2, ImageUtils.getImageName)
  && _isImageValueEqual(image1, image2, ImageUtils.getImageWidth)
  && _isImageValueEqual(image1, image2, ImageUtils.getImageHeight);

let _isTextureDataEqual = (texture1, texture2, engineState) =>
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
       BasicSourceTextureEngineService.unsafeGetSource(texture1, engineState),
       BasicSourceTextureEngineService.unsafeGetSource(texture2, engineState),
     );

let _isLightMaterialDataEqual = (material1, material2, engineState) =>
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
      _isTextureDataEqual(map1, map2, engineState)
    | _ => false
    }
  );

let _replaceToMaterialAssetMaterialComponent =
    (
      gameObject,
      materialMap,
      defaultMaterial,
      (
        unsafeGetMaterialComponentFunc,
        isDefaultMaterialComponentFunc,
        isMaterialDataEqualFunc,
        disposeMaterialComponentFunc,
        addMaterialComponentFunc,
      ),
      engineState,
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
                 engineState,
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
      (defaultBasicMaterial, defaultLightMaterial),
      (basicMaterialMap, lightMaterialMap),
      engineState,
    ) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    _replaceToMaterialAssetMaterialComponent(
      gameObject,
      basicMaterialMap,
      defaultBasicMaterial,
      (
        GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
        _isDefaultBasicMaterial,
        _isBasicMaterialDataEqual,
        GameObjectComponentEngineService.disposeBasicMaterialComponent,
        GameObjectComponentEngineService.addBasicMaterialComponent,
      ),
      engineState,
    ) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      _replaceToMaterialAssetMaterialComponent(
        gameObject,
        lightMaterialMap,
        defaultLightMaterial,
        (
          GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
          _isDefaultLightMaterial,
          _isLightMaterialDataEqual,
          GameObjectComponentEngineService.disposeLightMaterialComponent,
          GameObjectComponentEngineService.addLightMaterialComponent,
        ),
        engineState,
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

let _relateSceneWDBGameObjectsAndAssets =
    (
      allWDBGameObjectsArr,
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
         (. engineState, gameObject) =>
           _replaceGameObjectMaterialComponentToMaterialAsset(
             gameObject,
             (defaultBasicMaterial, defaultLightMaterial),
             (basicMaterialMap, lightMaterialMap),
             engineState,
           )
           |> _replaceGameObjectGeometryComponentToWDBAssetGeometryComponent(
                gameObject,
                (defaultCubeGeometryData, defaultSphereGeometryData),
                wdbAssetGameObjectGeometryArr,
              )
           |> GameObjectEngineService.initGameObject(gameObject),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
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

let _relateWDBAssetGameObjectsAndAssets =
    (allWDBGameObjectsArr, (basicMaterialMap, lightMaterialMap)) => {
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
         (. engineState, gameObject) =>
           _replaceGameObjectMaterialComponentToMaterialAsset(
             gameObject,
             (defaultBasicMaterial, defaultLightMaterial),
             (basicMaterialMap, lightMaterialMap),
             engineState,
           )
           |> _replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                gameObject,
                (defaultCubeGeometryData, defaultSphereGeometryData),
              )
           |> GameObjectEngineService.initGameObject(gameObject),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
};

let _initAssetTreeRoot = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (assetTree, editorState) =
    editorState |> AssetTreeNodeUtils.initRootAssetTree(_, engineState);

  editorState
  |> AssetTreeRootEditorService.setAssetTreeRoot(assetTree)
  |> StateEditorService.setState
  |> ignore;

  engineState |> StateEngineService.setState |> ignore;

  ();
};

let _import = result => {
  _disposeAssets();

  JobEngineService.execDisposeJob |> StateLogicService.getAndSetEngineState;

  _initAssetTreeRoot();

  let wpk = result |> FileReader.convertResultToArrayBuffer;

  let dataView = DataViewUtils.create(wpk);

  let (sceneWDB, asb, dataView) = _readWPK(wpk, dataView);

  let materialMapTupleRef =
    ref((
      WonderCommonlib.SparseMapService.createEmpty(),
      WonderCommonlib.SparseMapService.createEmpty(),
    ));

  let wdbAssetGameObjectGeometryArrRef = ref([||]);

  let engineState = StateEngineService.unsafeGetState();

  HeaderImportASBUtils.importASB(asb)
  |> WonderBsMost.Most.map(((allWDBGameObjectsArr, materialMapTuple)) => {
       _relateWDBAssetGameObjectsAndAssets(
         allWDBGameObjectsArr,
         materialMapTuple,
       );

       materialMapTupleRef := materialMapTuple;
       wdbAssetGameObjectGeometryArrRef :=
         GameObjectEngineService.getAllGeometrys(
           allWDBGameObjectsArr,
           StateEngineService.unsafeGetState(),
         );

       ();
     })
  |> WonderBsMost.Most.concat(
       MostUtils.callStreamFunc(() =>
         SceneWDBUtils.importSceneWDB(sceneWDB)
         |> WonderBsMost.Most.map(sceneGameObject => {
              let engineState = StateEngineService.unsafeGetState();

              _relateSceneWDBGameObjectsAndAssets(
                GameObjectEngineService.getAllGameObjects(
                  sceneGameObject,
                  engineState,
                ),
                materialMapTupleRef^,
                wdbAssetGameObjectGeometryArrRef^,
              );

              ();
            })
       ),
     )
  |> WonderBsMost.Most.concat(
       MostUtils.callFunc(() => StateLogicService.getAndRefreshEngineState()),
     );
};

let importPackage = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (e##target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None => Js.Promise.make((~resolve, ~reject) => resolve(. Obj.magic(-1)))
  | Some(file) =>
    let fileInfo: FileType.fileInfoType =
      file |> AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord;

    WonderBsMost.Most.fromPromise(
      Js.Promise.make((~resolve, ~reject) => {
        let reader = FileReader.createFileReader();

        FileReader.onload(reader, result =>
          resolve(.
            {
              name: fileInfo.name,
              type_: AssetTreeNodeUtils.getUploadFileType(fileInfo.name),
              result,
            }: AssetNodeType.nodeResultType,
          )
        );

        AssetTreeNodeUtils.readFileByTypeSync(reader, fileInfo);
      }),
    )
    |> WonderBsMost.Most.flatMap((fileResult: AssetNodeType.nodeResultType) =>
         _import(fileResult.result)
       )
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         dispatchFunc(
           AppStore.SceneTreeAction(
             SetSceneGraph(
               Some(
                 SceneTreeUtils.getSceneGraphDataFromEngine
                 |> StateLogicService.getStateToGetData,
               ),
             ),
           ),
         );
         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
         |> resolve;
       });
  };
};