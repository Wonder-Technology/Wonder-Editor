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

let changeTextureMapAndRereshEngineState = (material, mapId, setMapFunc) => {
  let engineState =
    StateEngineService.unsafeGetState() |> setMapFunc(mapId, material);

  StateLogicService.refreshEngineState(engineState);
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
    ) => {
  let engineState =
    StateEngineService.unsafeGetState()
    |> disposeMaterialFunc(gameObject, material);

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

  StateLogicService.refreshEngineState(engineState);
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
    ) =>
  _replaceMaterialAndRefreshEngineState(
    (gameObject, material),
    color,
    (disposeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
    setMapFunc(mapId) |. Some,
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
    ) =>
  _replaceMaterialAndRefreshEngineState(
    (gameObject, material),
    color,
    (disposeMaterialFunc, setColorFunc, createMaterialFunc, addMaterialFunc),
    None,
  );