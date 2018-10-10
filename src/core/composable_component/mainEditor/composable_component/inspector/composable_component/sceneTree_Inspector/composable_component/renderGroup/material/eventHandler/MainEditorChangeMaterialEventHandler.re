open MainEditorMaterialType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (int, int, materialType);

  let handleSelfLogic =
      (
        (store, dispatchFunc),
        currentSceneTreeNode,
        (sourceMaterial, targetMaterial, materialType),
      ) => {
    let engineState = StateEngineService.unsafeGetState();
    let engineState =
      switch (materialType) {
      | BasicMaterial =>
        engineState
        |> GameObjectComponentEngineService.removeBasicMaterialComponent(
             currentSceneTreeNode,
             sourceMaterial,
           )
        |> GameObjectComponentEngineService.addLightMaterialComponent(
             currentSceneTreeNode,
             targetMaterial,
           )
      | LightMaterial =>
        engineState
        |> GameObjectComponentEngineService.removeLightMaterialComponent(
             currentSceneTreeNode,
             sourceMaterial,
           )
        |> GameObjectComponentEngineService.addLightMaterialComponent(
             currentSceneTreeNode,
             targetMaterial,
           )
      };

    let engineState =
      engineState
      |> GameObjectEngineService.initGameObject(currentSceneTreeNode);

    StateLogicService.refreshEngineState(engineState);

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);