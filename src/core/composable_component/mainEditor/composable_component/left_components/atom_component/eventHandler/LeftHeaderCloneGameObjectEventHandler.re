open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (editorState, engineState) =
      LeftHeaderGameObjectResultUtils.getTargetGameObject()
      |> Result.Result.either(
           targetGameObject => {
             let isNeedReInitSceneAllLightMaterials =
               HierarchyGameObjectEngineService.getAllGameObjects(
                 targetGameObject,
                 engineState,
               )
               |> SceneEngineService.isNeedReInitSceneAllLightMaterials(
                    _,
                    engineState,
                  );

             let (clonedGameObjectArr, engineState) =
               engineState
               |> GameObjectEngineService.cloneGameObject(
                    targetGameObject,
                    1,
                    true,
                  );

             let clonedGameObject =
               CloneGameObjectLogicService.getClonedGameObject(
                 clonedGameObjectArr,
               );

             let engineState =
               engineState
               |> HierarchyGameObjectEngineService.addChild(
                    engineState
                    |> HierarchyGameObjectEngineService.getParentGameObject(targetGameObject)
                    |> OptionService.unsafeGet,
                    clonedGameObject,
                  );

             let editorState =
               editorState
               |> GameObjectComponentLogicService.setGameObjectArrComponentTypeMap(
                    [|clonedGameObject|],
                    GameObjectComponentLogicService.buildAllComponentArray(),
                    engineState,
                  )
               |> SceneTreeEditorService.setCurrentSceneTreeNode(
                    clonedGameObject,
                  );

             let engineState =
               isNeedReInitSceneAllLightMaterials ?
                 engineState
                 |> SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials :
                 engineState;

             let engineState =
               StateLogicService.refreshEngineStateAndReturnEngineState(
                 engineState,
               );

             (editorState, engineState);
           },
           errorMsg => {
             ConsoleUtils.error(errorMsg, editorState);

             (editorState, engineState);
           },
         );

    StateLogicService.setState((editorState, engineState));

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector, SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);