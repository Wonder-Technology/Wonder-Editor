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
      (gameObject, material),
      color,
      (
        disposeMaterialFunc,
        setColorFunc,
        createMaterialFunc,
        addMaterialFunc,
      ),
      setMapFunc,
      engineState,
    ) => {
  let engineState = engineState |> disposeMaterialFunc(gameObject, material);

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
    )
    |> addMaterialFunc(gameObject, newMaterial)
    |> GameObjectEngineService.initGameObject(gameObject);

  StateLogicService.refreshEngineStateAndReturnEngineState(engineState);
};

let replaceMaterialComponentFromNoMapToHasMap =
    (
      (gameObject, material, mapId),
      color,
      (
        disposeMaterialFunc,
        setColorFunc,
        createMaterialFunc,
        addMaterialFunc,
      ),
      setMapFunc,
      engineState,
    ) =>
  _replaceMaterialAndRefreshEngineState(
    (gameObject, material),
    color,
    (disposeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
    setMapFunc(mapId) |. Some,
    engineState,
  );

let replaceMaterialComponentFromHasMapToNoMap =
    (
      (gameObject, material),
      color,
      (
        disposeMaterialFunc,
        setColorFunc,
        createMaterialFunc,
        addMaterialFunc,
      ),
      engineState,
    ) =>
  _replaceMaterialAndRefreshEngineState(
    (gameObject, material),
    color,
    (disposeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
    None,
    engineState,
  );

let replaceBasicMaterialComponentFromHasMapToNoMap =
    (gameObject, material, engineState) =>
  replaceMaterialComponentFromHasMapToNoMap(
    (gameObject, material),
    BasicMaterialEngineService.getColor(material, engineState),
    (
      OperateBasicMaterialLogicService.disposeBasicMaterial,
      OperateBasicMaterialLogicService.setBasicMaterialColor,
      OperateBasicMaterialLogicService.createBasicMaterial,
      OperateBasicMaterialLogicService.addBasicMaterial,
    ),
    engineState,
  );

let replaceLightMaterialComponentFromHasMapToNoMap =
    (gameObject, material, engineState) =>
  replaceMaterialComponentFromHasMapToNoMap(
    (gameObject, material),
    LightMaterialEngineService.getLightMaterialDiffuseColor(
      material,
      engineState,
    ),
    (
      OperateLightMaterialLogicService.disposeLightMaterial,
      OperateLightMaterialLogicService.setLightMaterialColor,
      OperateLightMaterialLogicService.createLightMaterial,
      OperateLightMaterialLogicService.addLightMaterial,
    ),
    engineState,
  );