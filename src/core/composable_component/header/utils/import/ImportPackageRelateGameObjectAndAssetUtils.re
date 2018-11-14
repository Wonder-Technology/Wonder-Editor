open Js.Typed_array;

let _replaceGameObjectMaterialComponentToMaterialAsset =
    (gameObject, defaultMaterialData, materialDataMapData, engineState) => {
  let (sourceMaterial, targetMaterial, materialType, _) =
    RelateGameObjectAndAssetUtils.getRelatedMaterialDataFromGameObject(
      gameObject,
      WonderCommonlib.SparseMapService.createEmpty(),
      defaultMaterialData,
      materialDataMapData,
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
      defaultGeometryData,
      wdbAssetGameObjectGeometryDataArr,
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
    let geometryData =
      RelateGameObjectAndAssetUtils.getGeometryData(geometry, engineState);

    let targetGeometry =
      switch (
        RelateGameObjectAndAssetUtils.getTargetGeometryByJudgeDefaultGeometry(
          geometryData,
          defaultGeometryData,
          engineState,
        )
      ) {
      | Some(targetGeometry) => Some(targetGeometry)
      | None =>
        switch (
          wdbAssetGameObjectGeometryDataArr
          |> Js.Array.find(((_, wdbAssetGameObjectGeometryData)) =>
               RelateGameObjectAndAssetUtils.isGeometryDataEqual(
                 wdbAssetGameObjectGeometryData,
                 geometryData,
                 engineState,
               )
             )
        ) {
        | None => None
        | Some((wdbAssetGameObjectGeometry, _)) =>
          Some(wdbAssetGameObjectGeometry)
        }
      };

    RelateGameObjectAndAssetUtils.replaceGeometryComponent(
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
         RelateGameObjectAndAssetUtils.getGeometryData(geometry, engineState),
       )
     );

let relateSceneWDBGameObjectsAndAssets =
    (
      allWDBGameObjectsArr,
      (basicMaterialMap, lightMaterialMap),
      wdbAssetGameObjectGeometryAssetArr,
    ) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let basicMaterialDataMap =
    RelateGameObjectAndAssetUtils.getBasicMaterialDataMap(
      basicMaterialMap,
      engineState,
    );

  let lightMaterialDataMap =
    RelateGameObjectAndAssetUtils.getLightMaterialDataMap(
      lightMaterialMap,
      engineState,
    );

  let defaultMaterialData =
    RelateGameObjectAndAssetUtils.getDefaultMaterialData(
      editorState,
      engineState,
    );

  let defaultGeometryData =
    RelateGameObjectAndAssetUtils.getDefaultGeometryData(
      editorState,
      engineState,
    );

  let wdbAssetGameObjectGeometryDataArr =
    _getGeometryDataArr(wdbAssetGameObjectGeometryAssetArr, engineState);

  let engineState =
    allWDBGameObjectsArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           _replaceGameObjectMaterialComponentToMaterialAsset(
             gameObject,
             defaultMaterialData,
             (basicMaterialDataMap, lightMaterialDataMap),
             engineState,
           )
           |> _replaceGameObjectGeometryComponentToWDBAssetGeometryComponent(
                gameObject,
                defaultGeometryData,
                wdbAssetGameObjectGeometryDataArr,
              )
           |> GameObjectEngineService.initGameObject(gameObject),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;

  ()
  |> WonderLog.Contract.ensureCheck(
       r => {
         open WonderLog;
         open Contract;
         open Operators;

         /* TODO add material asset check? */

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
    (allWDBGameObjectsArr, (basicMaterialMap, lightMaterialMap)) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let basicMaterialDataMap =
    RelateGameObjectAndAssetUtils.getBasicMaterialDataMap(
      basicMaterialMap,
      engineState,
    );

  let lightMaterialDataMap =
    RelateGameObjectAndAssetUtils.getLightMaterialDataMap(
      lightMaterialMap,
      engineState,
    );

  let defaultMaterialData =
    RelateGameObjectAndAssetUtils.getDefaultMaterialData(
      editorState,
      engineState,
    );

  let defaultGeometryData =
    RelateGameObjectAndAssetUtils.getDefaultGeometryData(
      editorState,
      engineState,
    );

  let engineState =
    allWDBGameObjectsArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           _replaceGameObjectMaterialComponentToMaterialAsset(
             gameObject,
             defaultMaterialData,
             (basicMaterialDataMap, lightMaterialDataMap),
             engineState,
           )
           |> RelateGameObjectAndAssetUtils.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                gameObject,
                defaultGeometryData,
              )
           |> GameObjectEngineService.initGameObject(gameObject),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
};