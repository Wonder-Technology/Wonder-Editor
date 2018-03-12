module AddComponentEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let onClick = ((store, dispatch), type_, currentGameObject) => {
    InspectorComponentUtils.addComponentByType(type_, currentGameObject)
    |> StateLogicService.getAndSetEngineState;
    dispatch(AppStore.ReLoad) |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(AddComponentEventHandler);