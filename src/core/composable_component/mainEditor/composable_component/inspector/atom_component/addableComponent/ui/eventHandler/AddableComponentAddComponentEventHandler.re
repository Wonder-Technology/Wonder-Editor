module AddComponentEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onClick = ((store, dispatch), type_, currentSceneTreeNode) => {
    InspectorComponentUtils.addComponentByType(type_)
    |> StateLogicService.getAndRefreshEngineStateWithDiff(
         [|currentSceneTreeNode|],
         DiffType.GameObject
       );
    dispatch(AppStore.ReLoad) |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(AddComponentEventHandler);