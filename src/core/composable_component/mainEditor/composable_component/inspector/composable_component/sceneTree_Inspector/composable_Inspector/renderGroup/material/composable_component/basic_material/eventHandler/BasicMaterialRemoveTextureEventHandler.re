open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.MaterialType.material;

  let handleSelfLogic = ((store, dispatchFunc), (), materialComponent) => {
    OperateTextureLogicService.replaceMaterialComponentFromHasMapToNoMap(
      (
        SceneEditorService.unsafeGetCurrentSceneTreeNode
        |> StateLogicService.getEditorState,
        materialComponent,
      ),
      BasicMaterialEngineService.getColor(materialComponent)
      |> StateLogicService.getEngineStateToGetData,
      (
        OperateBasicMaterialLogicService.disposeBasicMaterial,
        OperateBasicMaterialLogicService.setBasicMaterialColor,
        OperateBasicMaterialLogicService.createBasicMaterial,
        OperateBasicMaterialLogicService.addBasicMaterial,
      ),
    );

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);