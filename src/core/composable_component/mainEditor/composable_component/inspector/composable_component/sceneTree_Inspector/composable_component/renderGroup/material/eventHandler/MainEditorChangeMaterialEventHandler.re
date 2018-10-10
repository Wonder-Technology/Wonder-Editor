open MaterialType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = ((int, int), (materialType, materialType));

  let handleSelfLogic =
      ((store, dispatchFunc), currentSceneTreeNode, materialData) => {
    let engineState = StateEngineService.unsafeGetState();

    let engineState =
      engineState
      |> InspectorRenderGroupUtils.replaceMaterialByMaterialData(
           currentSceneTreeNode,
           materialData,
         )
      |> GameObjectEngineService.initGameObject(currentSceneTreeNode);

    StateLogicService.refreshEngineState(engineState);

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);