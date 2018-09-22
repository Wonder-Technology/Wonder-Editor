module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.MaterialType.material;

  let handleSelfLogic = ((store, dispatchFunc), (), materialComponent) => {
    OperateTextureLogicService.replaceBasicMaterialComponentFromHasMapToNoMap(
      SceneEditorService.unsafeGetCurrentSceneTreeNode(
        StateEditorService.getState(),
      ),
      materialComponent,
      StateEngineService.unsafeGetState(),
    )
    |> StateEngineService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);