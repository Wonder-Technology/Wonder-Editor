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

let rebuildMaterialAndRefreshEngineState = (gameObject, material, setMapFunc) => {
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

  let (newMaterial, editEngineState, runEngineState) =
    GeometryUtils.createGeometry(editEngineState, runEngineState);

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

let setTextureMapToGameObjectMaterial = (gameObject, material, mapId) =>
  rebuildMaterialAndRefreshEngineState(
    gameObject,
    material,
    (
      (newMaterial, engineStateTuple) =>
        engineStateTuple
        |> StateLogicService.handleFuncWithDiff(
             [|
               {arguments: [|mapId|], type_: Texture},
               {arguments: [|newMaterial|], type_: Material},
             |],
             BasicMaterialEngineService.setMap,
           )
    )
    |. Some,
  );

let setTextureNameToEngine = (texture, newName) =>
  BasicSourceTextureEngineService.setBasicSourceTextureName(newName)
  |> StateLogicService.getAndSetEngineStateWithDiff([|
       {arguments: [|texture|], type_: Texture},
     |]);