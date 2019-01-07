open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let _getRemovedGameObject = () => {
    let editorState = StateEditorService.getState();

    switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
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

  let _hasLightComponent = (removedGameObject, engineState) =>
    GameObjectEngineService.getAllGameObjects(removedGameObject, engineState)
    |> SceneEngineService.doesNeedReInitSceneAllLightMaterials(_, engineState);

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    switch (_getRemovedGameObject()) {
    | None => ()
    | Some(removedGameObject) =>
      let engineState = StateEngineService.unsafeGetState();

      let hasLightComponent =
        _hasLightComponent(removedGameObject, engineState);

      engineState |> StateEngineService.setState |> ignore;

      removedGameObject
      |> CurrentNodeSceneTreeLogicService.disposeCurrentSceneTreeNode;

      StateLogicService.getAndRefreshEngineState();

      hasLightComponent ?
        SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials
        |> StateLogicService.getAndSetEngineState :
        ();

      StateLogicService.getAndRefreshEngineState();
    };

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector, SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);