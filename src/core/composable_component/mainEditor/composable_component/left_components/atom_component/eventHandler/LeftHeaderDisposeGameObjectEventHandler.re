open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let _getRemovedGameObject = editorState =>
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

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (editorState, engineState) =
      _getRemovedGameObject(editorState)
      |> Result.Result.either(
           removedGameObject => {
             let (editorState, engineState) =
               CurrentNodeSceneTreeLogicService.disposeCurrentSceneTreeNode(
                 removedGameObject,
                 (editorState, engineState),
               );

             let doesNeedReInitSceneAllLightMaterials =
               GameObjectEngineService.getAllGameObjects(
                 removedGameObject,
                 engineState,
               )
               |> SceneEngineService.doesNeedReInitSceneAllLightMaterials(
                    _,
                    engineState,
                  );

             let engineState = engineState |> JobEngineService.execDisposeJob;

             let engineState =
               doesNeedReInitSceneAllLightMaterials ?
                 SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials(
                   engineState,
                 ) :
                 engineState;

             let editorState =
               SceneTreeEditorService.removeIsShowChildren(
                 removedGameObject,
                 editorState,
               );

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

    editorState |> StateEditorService.setState |> ignore;
    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector, SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);