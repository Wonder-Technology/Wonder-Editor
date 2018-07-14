open DiffType;

module DragEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.MaterialType.material;

  let onClick = ((store, dispatchFunc), (), materialComponent) => {
    OperateTextureLogicService.replaceMaterialComponentToNoMapOne(
      SceneEditorService.unsafeGetCurrentSceneTreeNode
      |> StateLogicService.getEditorState,
      materialComponent,
    );

    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);