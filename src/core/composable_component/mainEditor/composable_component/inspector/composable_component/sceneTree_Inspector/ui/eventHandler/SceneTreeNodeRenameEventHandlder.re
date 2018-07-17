open AppStore;
open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = string;

  let handleSelfLogic = ((store, dispatchFunc), gameObject, newName) => {
    GameObjectEngineService.setGameObjectName(newName)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|gameObject|], type_: GameObject},
       |]);


    let newSceneGraphData =
      store
      |> SceneTreeUtils.unsafeGetSceneGraphDataFromStore
      |> SceneTreeUtils.renameSceneGraphData(gameObject, newName);


    dispatchFunc(
      AppStore.SceneTreeAction(SetSceneGraph(Some(newSceneGraphData))),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);