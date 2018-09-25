module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.MaterialType.material;

  let handleSelfLogic = ((store, dispatchFunc), (), materialComponent) => {
    let engineState = StateEngineService.unsafeGetState();

    OperateTextureLogicService.replaceLightMaterialComponentFromHasMapToNoMap(
      [|
        SceneEditorService.unsafeGetCurrentSceneTreeNode(
          StateEditorService.getState(),
        ),
      |],
      materialComponent,
      engineState,
    )
    |> StateEngineService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);