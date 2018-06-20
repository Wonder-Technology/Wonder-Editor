open DiffType;

module AddComponentEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onClick = ((store, dispatchFunc), type_, currentSceneTreeNode) => {
    InspectorComponentUtils.addComponentByType(type_)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|currentSceneTreeNode|], type_: GameObject},
       |]);
    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

module MakeEventHandler =
  EventHandler.MakeEventHandler(AddComponentEventHandler);