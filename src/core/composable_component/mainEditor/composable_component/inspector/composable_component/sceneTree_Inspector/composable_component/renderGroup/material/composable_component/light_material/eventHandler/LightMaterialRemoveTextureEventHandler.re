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
      LightMaterialEngineService.getLightMaterialDiffuseColor(
        materialComponent,
      )
      |> StateLogicService.getEngineStateToGetData,
      (
        OperateLightMaterialLogicService.disposeLightMaterial,
        OperateLightMaterialLogicService.setLightMaterialColor,
        OperateLightMaterialLogicService.createLightMaterial,
        OperateLightMaterialLogicService.addLightMaterial,
      ),
    );

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);