open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectPrimitiveType.gameObject;
  type dataTuple = componentType;
  type return = unit;

  let handleSelfLogic =
      ((uiState, dispatchFunc), currentSceneTreeNode, type_) => {
    let (editorState, engineState) =
      (StateEditorService.getState(), StateEngineService.unsafeGetState())
      |> InspectorAddComponentUtils.addComponentByType(
           type_,
           currentSceneTreeNode,
         );

    engineState |> StateEngineService.setState |> ignore;
    editorState |> StateEditorService.setState |> ignore;

    GameObjectEngineService.initGameObject(currentSceneTreeNode)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

    AddableComponentUtils.isNeedUpdateSceneTree(type_) ?
      dispatchFunc(
        AppStore.UpdateAction(
          Update([|UpdateStore.Inspector, UpdateStore.SceneTree|]),
        ),
      )
      |> ignore :
      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
      |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);