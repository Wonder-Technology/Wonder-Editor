open SelectType;

open MainEditorMaterialType;

let getMaterialOptions = () => [|
  {key: BasicMaterial |> convertMaterialTypeToInt, value: "basic_material"},
  {key: LightMaterial |> convertMaterialTypeToInt, value: "light_material"},
|];

let getMaterialTypeByGameObject = (gameObject, engineState) =>
  switch (
    GameObjectComponentEngineService.hasBasicMaterialComponent(
      gameObject,
      engineState,
    ),
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ),
  ) {
  | (true, false) => BasicMaterial
  | (false, true) => LightMaterial
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getMaterialTypeByGameObject",
        ~description=
          {j|gameObject:$gameObject should has material component|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let handleSpecificFuncByMaterialType =
    (materialType, (handleBasicMaterialFunc, handleLightMaterialFunc)) => {
  let currentSceneTreeNode =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  switch (materialType) {
  | BasicMaterial => currentSceneTreeNode |> handleBasicMaterialFunc

  | LightMaterial => currentSceneTreeNode |> handleLightMaterialFunc
  };
};

let _getOperateSourceMaterialFunc =
    (materialType, gameObject, engineStateToGetData) =>
  switch (materialType) {
  | BasicMaterial => (
      DiffType.BasicMaterial,
      engineStateToGetData
      |> GameObjectComponentEngineService.getBasicMaterialComponent(
           gameObject,
         ),
      GameObjectComponentEngineService.disposeBasicMaterialComponent,
    )
  | LightMaterial => (
      DiffType.LightMaterial,
      engineStateToGetData
      |> GameObjectComponentEngineService.getLightMaterialComponent(
           gameObject,
         ),
      GameObjectComponentEngineService.disposeLightMaterialComponent,
    )
  };

let _getOperateTargetMaterialFunc =
    (materialType, editEngineState, runEngineState) =>
  switch (materialType) {
  | BasicMaterial => (
      DiffType.BasicMaterial,
      OperateBasicMaterialLogicService.createBasicMaterial(
        editEngineState,
        runEngineState,
      ),
      GameObjectComponentEngineService.addBasicMaterialComponent,
    )
  | LightMaterial => (
      DiffType.LightMaterial,
      OperateLightMaterialLogicService.createLightMaterial(
        editEngineState,
        runEngineState,
      ),
      GameObjectComponentEngineService.addLightMaterialComponent,
    )
  };


let replaceMaterialByType = (sourceMateralType, targetMaterialType) => {
  let gameObject =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;
  let editEngineState = StateLogicService.getEditEngineState();
  let runEngineState = StateLogicService.getRunEngineState();

  let (sourceDiffType, sourceMaterial, disposeSourceMaterialFunc) =
    _getOperateSourceMaterialFunc(
      sourceMateralType,
      gameObject,
      runEngineState,
    );

  let (
    targetDiffType,
    (targetMaterial, editEngineState, runEngineState),
    addTargetMaterialFunc,
  ) =
    _getOperateTargetMaterialFunc(
      targetMaterialType,
      editEngineState,
      runEngineState,
    );

  let (editEngineState, runEngineState) =
    (editEngineState, runEngineState)
    |> StateLogicService.handleFuncWithDiff(
         [|
           {arguments: [|sourceMaterial|], type_: sourceDiffType},
           {arguments: [|targetMaterial|], type_: targetDiffType},
           {arguments: [|gameObject|], type_: DiffType.GameObject},
         |],
         MaterialEngineService.replaceMaterial((
           disposeSourceMaterialFunc,
           addTargetMaterialFunc,
         )),
       );

  runEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;

  editEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;
};

let disposeMaterialByMaterialType =
    (materialType, currentSceneTreeNode, (editorState, engineState)) =>
  switch (materialType) {
  | BasicMaterial =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeBasicMaterialComponent(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.getBasicMaterialComponent(
              currentSceneTreeNode,
            ),
       )
  | LightMaterial =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeLightMaterialComponent(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.getLightMaterialComponent(
              currentSceneTreeNode,
            ),
       )
  };