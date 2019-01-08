open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let _getTargetGameObject = () => {
    let editorState = StateEditorService.getState();

    switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
    | None =>
      Result.Result.fail(
        LogUtils.buildErrorMessage(
          ~description=
            {j|current gameObject should exist, but actual is None|j},
          ~reason="",
          ~solution={j|set current gameObject|j},
          ~params={j||j},
        ),
      )
    | Some(gameObject) => Result.Result.success(gameObject)
    };
  };

  let _hasLightComponent = (targetGameObject, engineState) =>
    GameObjectEngineService.getAllGameObjects(targetGameObject, engineState)
    |> SceneEngineService.doesNeedReInitSceneAllLightMaterials(_, engineState);

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (editorState, engineState) =
      _getTargetGameObject()
      |> Result.Result.either(
           targetGameObject => {
             let hasLightComponent =
               _hasLightComponent(targetGameObject, engineState);

             let (clonedGameObject, engineState) =
               engineState
               |> OperateGameObjectLogicService.cloneGameObject(
                    targetGameObject,
                    1,
                    true,
                  )
               |> (
                 ((clonedGameObjects, engineState)) => (
                   clonedGameObjects
                   |> OperateGameObjectLogicService.getFlattenClonedGameObjectArr
                   |> ArrayService.unsafeGetFirst,
                   engineState,
                 )
               );

             let engineState =
               engineState
               |> GameObjectUtils.addChild(
                    engineState
                    |> GameObjectUtils.getParentGameObject(targetGameObject)
                    |> OptionService.unsafeGet,
                    clonedGameObject,
                  );

             let editorState =
               editorState
               |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
                    [|clonedGameObject|],
                    engineState,
                  )
               |> SceneTreeEditorService.setCurrentSceneTreeNode(
                    clonedGameObject,
                  );

             let engineState =
               hasLightComponent ?
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