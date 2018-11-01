open Js.Typed_array;

let _replaceGameObjectMaterialComponentToMaterialAsset =
    (
      gameObject,
      (defaultBasicMaterial, defaultLightMaterial),
      (basicMaterialMap, lightMaterialMap),
      engineState,
    ) =>
  RelateGameObjectAndAssetUtils.getRelatedMaterialDataFromGameObject(
    gameObject,
    (defaultBasicMaterial, defaultLightMaterial),
    (basicMaterialMap, lightMaterialMap),
    engineState,
  )
  |> RelateGameObjectAndAssetUtils.replaceToMaterialAssetMaterialComponent(
       gameObject,
       _,
       engineState,
     );

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
  RelateGameObjectAndAssetUtils.isValueEqual(
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

let relateWDBAssetGameObjectsAndAssets =
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