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

let setTextureNameToEngineAndNodeMap = (nodeId, texture, newName) => {
  let editorState = StateEditorService.getState();

  editorState
  |> AssetNodeMapEditorService.unsafeGetNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> AssetTreeNodeUtils.renameNodeResult(newName)
  |> AssetNodeMapEditorService.setResult(nodeId, _, editorState)
  |> StateEditorService.setState
  |> ignore;

  BasicSourceTextureEngineService.setBasicSourceTextureName(newName)
  |> StateLogicService.getAndSetEngineStateWithDiff([|
       {arguments: [|texture|], type_: Texture},
     |]);

  ()
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             test(
               Log.buildAssertMessage(
                 ~expect=
                   {j|the texture in nodeMap name should == engine name|j},
                 ~actual={j|not|j},
               ),
               () => {
                 let nodeMapName =
                   StateEditorService.getState()
                   |> AssetNodeMapEditorService.unsafeGetNodeMap
                   |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
                   |> (({name}) => name);

                 let engineName =
                   BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                     texture,
                   )
                   |> StateLogicService.getEngineStateToGetData;

                 nodeMapName == engineName |> assertTrue;
               },
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );
};