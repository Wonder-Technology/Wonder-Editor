open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = string;

  let _isLightComponent = type_ => type_ === "Light";

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    InspectorComponentUtils.addComponentByType(type_)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|currentSceneTreeNode|], type_: GameObject},
       |]);

    _isLightComponent(type_) ?
      OperateLightMaterialLogicService.reInitAllMaterials() : ();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);