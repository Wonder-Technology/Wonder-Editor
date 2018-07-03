open DiffType;

module DragEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.MaterialType.material;

  let onClick = ((store, dispatchFunc), (), materialComponent) => {
    switch (
      BasicMaterialEngineService.getMap(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => ()
    | Some(_mapId) =>
      WonderLog.Log.print("set map is null") |> ignore;

      OperateTextureLogicService.rebuildMaterialAndRefreshEngineState(
        SceneEditorService.unsafeGetCurrentSceneTreeNode
        |> StateLogicService.getEditorState,
        materialComponent,
        None,
      );
    };

    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);