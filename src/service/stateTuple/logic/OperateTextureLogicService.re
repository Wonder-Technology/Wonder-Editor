open AssetNodeType;

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

let changeTextureMapAndRereshEngineState = (material, mapId) => {
  let (editEngineState, runEngineState) =
    (
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    )
    |> StateLogicService.handleFuncWithDiff(
         [|
           {arguments: [|mapId|], type_: Texture},
           {arguments: [|material|], type_: Material},
         |],
         BasicMaterialEngineService.setMap,
       );

  editEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;
  runEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;
};

let _replaceMaterialAndRefreshEngineState = (gameObject, material, setMapFunc) => {
  let color =
    BasicMaterialEngineService.getColor(material)
    |> StateLogicService.getEngineStateToGetData;

  let (editEngineState, runEngineState) =
    (
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    )
    |> StateLogicService.handleFuncWithDiff(
         [|
           {arguments: [|gameObject|], type_: GameObject},
           {arguments: [|material|], type_: Material},
         |],
         GameObjectEngineService.disposeGameObjectBasicMaterialComponent,
       );

  /* TODO chagnge to stateTuple->OperateBasicMaterialLogicService->createMaterial */
  let (newMaterial, editEngineState, runEngineState) =
    OperateMaterialLogicService.createMaterial(
      editEngineState,
      runEngineState,
    );

  let (editEngineState, runEngineState) =
    (editEngineState, runEngineState)
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|newMaterial|], type_: Material}|],
         BasicMaterialEngineService.setColor(color),
       )
    |> (
      engineStateTuple =>
        switch (setMapFunc) {
        | None => engineStateTuple
        | Some(setMapFunc) => engineStateTuple |> setMapFunc(newMaterial)
        }
    )
    |> StateLogicService.handleFuncWithDiff(
         [|
           {arguments: [|gameObject|], type_: GameObject},
           {arguments: [|newMaterial|], type_: Material},
         |],
         GameObjectComponentEngineService.addBasicMaterialComponent,
       )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|gameObject|], type_: GameObject}|],
         GameObjectEngineService.initGameObject,
       );

  editEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;
  runEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;
};

let _setMapToEditAndRunEngineState = (mapId, newMaterial, engineStateTuple) =>
  engineStateTuple
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|mapId|], type_: Texture},
         {arguments: [|newMaterial|], type_: Material},
       |],
       BasicMaterialEngineService.setMap,
     );

let replaceMaterialComponentToHasMapOne = (gameObject, material, mapId) =>
  _replaceMaterialAndRefreshEngineState(
    gameObject,
    material,
    _setMapToEditAndRunEngineState(mapId) |. Some,
  );

let replaceMaterialComponentToNoMapOne = (gameObject, material) =>
  _replaceMaterialAndRefreshEngineState(gameObject, material, None);