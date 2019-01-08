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
           removedGameObject => {
             let (editorState, engineState) =
               CurrentNodeSceneTreeLogicService.disposeCurrentSceneTreeNode(
                 removedGameObject,
                 (editorState, engineState),
               );

             let isNeedReInitSceneAllLightMaterials =
               GameObjectEngineService.getAllGameObjects(
                 removedGameObject,
                 engineState,
               )
               |> SceneEngineService.isNeedReInitSceneAllLightMaterials(
                    _,
                    engineState,
                  );

             let engineState = engineState |> JobEngineService.execDisposeJob;

             let engineState =
               isNeedReInitSceneAllLightMaterials ?
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