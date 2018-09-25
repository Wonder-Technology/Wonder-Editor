open AssetNodeType;

let getTextureBaseName = (currentNodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({textureIndex}) => textureIndex)
  |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName
  |> StateLogicService.getEngineStateToGetData;

let renameTextureToEngine = (texture, newName) =>
  BasicSourceTextureEngineService.setBasicSourceTextureName(newName, texture)
  |> StateLogicService.getAndSetEngineState;

let changeTextureMapAndRereshEngineState =
    (material, mapId, setMapFunc, engineState) => {
  let engineState = engineState |> setMapFunc(mapId, material);

  StateLogicService.refreshEngineStateAndReturnEngineState(engineState);
};

let _replaceMaterialAndRefreshEngineState =
    (
      (gameObjects, material),
      color,
      (removeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
      setMapFunc,
      engineState,
    ) => {
  let engineState =
    gameObjects
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           removeMaterialFunc(gameObject, material, engineState),
         engineState,
       );

  let (newMaterial, engineState) = createMaterialFunc(engineState);

  let engineState =
    engineState
    |> setColorFunc(color, newMaterial)
    |> (
      engineStateTuple =>
        switch (setMapFunc) {
        | None => engineStateTuple
        | Some(setMapFunc) => engineStateTuple |> setMapFunc(newMaterial)
        }
    );

  let engineState =
    gameObjects
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           engineState
           |> addMaterialFunc(gameObject, newMaterial)
           |> GameObjectEngineService.initGameObject(gameObject),
         engineState,
       );

  StateLogicService.refreshEngineStateAndReturnEngineState(engineState);
};

let replaceMaterialComponentFromNoMapToHasMap =
    (
      (gameObjects, material, mapId),
      color,
      (removeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
      setMapFunc,
      engineState,
    ) =>
  _replaceMaterialAndRefreshEngineState(
    (gameObjects, material),
    color,
    (removeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
    setMapFunc(mapId) |. Some,
    engineState,
  );

let replaceMaterialComponentFromHasMapToNoMap =
    (
      (gameObject, material),
      color,
      (removeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
      engineState,
    ) =>
  _replaceMaterialAndRefreshEngineState(
    (gameObject, material),
    color,
    (removeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
    None,
    engineState,
  );

let replaceBasicMaterialComponentFromHasMapToNoMap =
    (gameObjects, material, engineState) =>
  replaceMaterialComponentFromHasMapToNoMap(
    (gameObjects, material),
    BasicMaterialEngineService.getColor(material, engineState),
    (
      GameObjectComponentEngineService.removeBasicMaterialComponent,
      OperateBasicMaterialLogicService.setBasicMaterialColor,
      OperateBasicMaterialLogicService.createBasicMaterial,
      OperateBasicMaterialLogicService.addBasicMaterial,
    ),
    engineState,
  );

let replaceLightMaterialComponentFromHasMapToNoMap =
    (gameObjects, material, engineState) =>
  replaceMaterialComponentFromHasMapToNoMap(
    (gameObjects, material),
    LightMaterialEngineService.getLightMaterialDiffuseColor(
      material,
      engineState,
    ),
    (
      GameObjectComponentEngineService.removeLightMaterialComponent,
      OperateLightMaterialLogicService.setLightMaterialColor,
      OperateLightMaterialLogicService.createLightMaterial,
      OperateLightMaterialLogicService.addLightMaterial,
    ),
    engineState,
  );