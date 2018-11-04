open Js.Typed_array;

let _replaceGameObjectMaterialComponentToMaterialAsset =
    (
      gameObject,
      (defaultBasicMaterial, defaultLightMaterial),
      (basicMaterialMap, lightMaterialMap),
      engineState,
    ) => {
  let (sourceMaterial, targetMaterial, materialType, _) =
    RelateGameObjectAndAssetUtils.getRelatedMaterialDataFromGameObject(
      gameObject,
      WonderCommonlib.SparseMapService.createEmpty(),
      (defaultBasicMaterial, defaultLightMaterial),
      (basicMaterialMap, lightMaterialMap),
      engineState,
    );

  RelateGameObjectAndAssetUtils.replaceToMaterialAssetMaterialComponent(
    gameObject,
    (sourceMaterial, targetMaterial, materialType),
    engineState,
  );
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
        RelateGameObjectAndAssetUtils.getTargetGeometryByJudgeDefaultGeometry(
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
             RelateGameObjectAndAssetUtils.isGeometryDataEqual(
               wdbAssetGameObjectGeometry,
               geometry,
               engineState,
             )
           )
      };

    RelateGameObjectAndAssetUtils.replaceGeometryComponent(
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
           |> RelateGameObjectAndAssetUtils.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                gameObject,
                (defaultCubeGeometryData, defaultSphereGeometryData),
              )
           |> GameObjectEngineService.initGameObject(gameObject),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
};