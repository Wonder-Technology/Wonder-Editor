open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let engineState =
      LeftHeaderGameObjectResultUtils.getTargetGameObject()
      |> Result.Result.either(
           removedGameObject => {
             let (editorState, engineState) =
               CurrentNodeSceneTreeLogicService.disposeCurrentSceneTreeNode(
                 removedGameObject,
                 (editorState, engineState),
               );

             let isNeedReInitSceneAllLightMaterials =
               HierarchyGameObjectEngineService.getAllGameObjects(
                 removedGameObject,
                 engineState,
               )
               |> SceneEngineService.isNeedReInitSceneAllLightMaterials(
                    _,
                    engineState,
                  );

             editorState |> StateEditorService.setState |> ignore;

             let engineState = engineState |> JobEngineService.execDisposeJob;

             let engineState =
               isNeedReInitSceneAllLightMaterials ?
                 SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials(
                   engineState,
                 ) :
                 engineState;

             let editorState = StateEditorService.getState();

             let editorState =
               SceneTreeEditorService.removeIsShowChildren(
                 removedGameObject,
                 editorState,
               );

             editorState |> StateEditorService.setState |> ignore;

             let engineState =
               StateLogicService.refreshEngineStateAndReturnEngineState(
                 engineState,
               );

             engineState;
           },
           errorMsg => {
             ConsoleUtils.error(errorMsg, editorState);

             engineState;
           },
         );

    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector, SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);