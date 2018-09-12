open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = componentType;

  let _isRemoveLight = type_ => type_ === Light;

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    let (editorState, engineState) =
      (StateEditorService.getState(), StateEngineService.unsafeGetState())
      |> InspectorRemoveComponentUtils.removeComponentByType(
           type_,
           currentSceneTreeNode,
         );

    editorState |> StateEditorService.setState |> ignore;
    engineState |> StateEngineService.setState |> ignore;

    _isRemoveLight(type_) ?
      {
        StateLogicService.getAndRefreshEngineState();

        OperateLightMaterialLogicService.reInitAllMaterials
        |> StateLogicService.getAndSetEngineState;
      } :
      ();

    StateLogicService.getAndRefreshEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);