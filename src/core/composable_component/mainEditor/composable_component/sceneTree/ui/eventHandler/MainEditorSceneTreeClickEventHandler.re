open DiffType;

module DragEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.MaterialType.material;

  let onClick = ((store, dispatchFunc), (), materialComponent) => {
    OperateTextureLogicService.rebuildMaterialAndRefreshEngineState(
      SceneEditorService.unsafeGetCurrentSceneTreeNode
      |> StateLogicService.getEditorState,
      materialComponent,
      None,
    );

    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);