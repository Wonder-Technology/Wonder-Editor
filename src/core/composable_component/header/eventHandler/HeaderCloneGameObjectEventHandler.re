open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let _getTargetGameObject = () => {
    let editorState = StateEditorService.getState();

    switch (SceneEditorService.getCurrentSceneTreeNode(editorState)) {
    | None =>
      ConsoleUtils.error(
        LogUtils.buildErrorMessage(
          ~description=
            {j|current gameObject should exist, but actual is None|j},
          ~reason="",
          ~solution={j|set current gameObject|j},
          ~params={j||j},
        ),
        editorState,
      );
      None;
    | Some(gameObject) => Some(gameObject)
    };
  };

  let _hasLightComponent = (targetGameObject, engineState) =>
    GameObjectEngineService.getAllGameObjects(targetGameObject, engineState)
    |> SceneEngineService.doesNeedReInitSceneAllLightMaterials(_, engineState);

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    switch (_getTargetGameObject()) {
    | None => ()
    | Some(targetGameObject) =>
      let engineState = StateEngineService.unsafeGetState();

      let hasLightComponent =
        _hasLightComponent(targetGameObject, engineState);

      let (clonedGameObject, engineState) =
        engineState
        |> OperateGameObjectLogicService.cloneGameObject(
             targetGameObject,
             1,
             true,
           )
        |> (((clonedGameObjects, engineState)) => {
          (
          clonedGameObjects |> ArrayService.unsafeGetFirst,
          engineState 
          )
        });

      let engineState =
       GameObjectUtils.addChild(
          engineState |> GameObjectUtils.getParentGameObject(targetGameObject) 
          |> OptionService.unsafeGet,
          clonedGameObject,
          engineState,
        );
        
        GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
          [|clonedGameObject|],
          engineState,
          )
          |> StateLogicService.getAndSetEditorState;
        
        StateLogicService.refreshEngineState(engineState);


        hasLightComponent ?
        SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials
        |> StateLogicService.getAndSetEngineState :
        ();

      StateLogicService.getAndRefreshEngineState();
    };

    dispatchFunc(AppStore.UpdateAction(Update([|SceneTree|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);