open SelectType;

open MainEditorMaterialType;

let getMaterialOptions = () => [|
  {
    key: BasicMaterial |> MainEditorMaterialType.convertMaterialTypeToInt,
    value: "basic_material",
  },
  {
    key: LightMaterial |> MainEditorMaterialType.convertMaterialTypeToInt,
    value: "light_material",
  },
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

let getOperateNormalMaterialFunc = materialType =>
  switch (materialType) {
  | BasicMaterial => (
      GameObjectComponentEngineService.getBasicMaterialComponent,
      OperateBasicMaterialLogicService.disposeBasicMaterial,
    )
  | LightMaterial => (
      GameObjectComponentEngineService.getLightMaterialComponent,
      OperateLightMaterialLogicService.disposeLightMaterial,
    )
  };

let _handleMaterilByType =
    (
      (getNormalMaterialFunc, disposeNormalMaterialFunc),
      gameObject,
      (createMaterialFunc, addMaterialFunc),
    ) => {
  let normalMaterial =
    getNormalMaterialFunc(gameObject)
    |> StateLogicService.getEngineStateToGetData;

  let (editEngineState, runEngineState) =
    (
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    )
    |> disposeNormalMaterialFunc(gameObject, normalMaterial);

  let (newMaterial, editEngineState, runEngineState) =
    createMaterialFunc(editEngineState, runEngineState);

  let (editEngineState, runEngineState) =
    (editEngineState, runEngineState)
    |> addMaterialFunc(gameObject, newMaterial)
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

let _replaceBasicMaterial =
    ((getNormalMaterialFunc, disposeNormalMaterialFunc), gameObject) =>
  _handleMaterilByType(
    (getNormalMaterialFunc, disposeNormalMaterialFunc),
    gameObject,
    (
      OperateBasicMaterialLogicService.createBasicMaterial,
      OperateBasicMaterialLogicService.addBasicMaterial,
    ),
  );

let _replaceLightMaterial =
    ((getNormalMaterialFunc, disposeNormalMaterialFunc), gameObject) =>
  _handleMaterilByType(
    (getNormalMaterialFunc, disposeNormalMaterialFunc),
    gameObject,
    (
      OperateLightMaterialLogicService.createLightMaterial,
      OperateLightMaterialLogicService.addLightMaterial,
    ),
  );
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

let replaceMaterialByType = (normalMateralType, materialType) => {
  let gameObject =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  /* let (getNormalMaterialFunc, disposeNormalMaterialFunc) =
     getOperateNormalMaterialFunc(normalMateralType); */

  WonderLog.Log.print("0") |> ignore;

  /*
   TODO fix bug:

     var message = JSON.stringify(message);

     console.log(message);
     console.trace();
   dispose old meshRenderer component
   create new meshRenderer component
   add it to gameObject */

  let normalMaterial =
    GameObjectComponentEngineService.getLightMaterialComponent(gameObject)
    |> StateLogicService.getEngineStateToGetData;

  let (editEngineState, runEngineState) =
    (
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    )
    |> OperateLightMaterialLogicService.disposeLightMaterial(
         gameObject,
         normalMaterial,
       );

  let (newMaterial, editEngineState, runEngineState) =
    OperateBasicMaterialLogicService.createBasicMaterial(
      editEngineState,
      runEngineState,
    );

  let (editEngineState, runEngineState) =
    (editEngineState, runEngineState)
    |> OperateBasicMaterialLogicService.addBasicMaterial(
         gameObject,
         newMaterial,
       )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|gameObject|], type_: GameObject}|],
         GameObjectEngineService.initGameObject,
       );

  StateLogicService.getEditEngineState()
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;

  runEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;
  /* handleSpecificFuncByMaterialType(
       materialType,
       (
         _replaceBasicMaterial((
           getNormalMaterialFunc,
           disposeNormalMaterialFunc,
         )),
         _replaceLightMaterial((
           getNormalMaterialFunc,
           disposeNormalMaterialFunc,
         )),
       ),
     ); */
};