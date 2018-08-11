open AssetNodeType;
open DiffType;

let getTextureBaseNameAndExtName = (currentNodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({textureIndex}) => textureIndex)
  |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName
  |> StateLogicService.getEngineStateToGetData
  |> FileNameService.getBaseNameAndExtName;

let renameTextureToEngine = (texture, newName) =>
  BasicSourceTextureEngineService.setBasicSourceTextureName(newName)
  |> StateLogicService.getAndSetEngineStateWithDiff([|
       {arguments: [|texture|], type_: Texture},
     |]);

let changeTextureMapAndRereshEngineState = (material, mapId, setMapFunc) => {
  let (editEngineState, runEngineState) =
    (
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    )
    |> setMapFunc(mapId, material);

    /* TODO duplicate */

  editEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;
  runEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;
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
  let (editEngineState, runEngineState) =
    (
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    )
    |> disposeMaterialFunc(gameObject, material);

  let (newMaterial, editEngineState, runEngineState) =
    createMaterialFunc(editEngineState, runEngineState);

  let (editEngineState, runEngineState) =
    (editEngineState, runEngineState)
    |> setColorFunc(color, newMaterial)
    |> (
      engineStateTuple =>
        switch (setMapFunc) {
        | None => engineStateTuple
        | Some(setMapFunc) => engineStateTuple |> setMapFunc(newMaterial)
        }
    )
    |> addMaterialFunc(gameObject, newMaterial)
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|gameObject|], type_: GameObject}|],
         GameObjectEngineService.initGameObject,
       );

       /* TODO duplicate */

  editEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;

  runEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;
};

/* TODO rename to replaceMaterialComponentFromNoMapToHasMap */
let replaceMaterialComponentToHasMapOne =
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

/* TODO rename to replaceMaterialComponentFromHasMapToNoMap */
let replaceMaterialComponentToNoMapOne =
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