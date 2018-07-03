open DiffType;

module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = string;
  let onMarkRedoUndoByStackLast =
      ((store, dispatchFunc), gameObject, newName) => {
    GameObjectEngineService.setGameObjectName(newName)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|gameObject|], type_: GameObject},
       |]);

    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            store
            |> SceneTreeUtils.unsafeGetSceneGraphDataFromStore
            |> SceneTreeUtils.renameSceneGraphData(gameObject, newName),
          ),
        ),
      ),
    )
    |> ignore;
  };
};

module MakeEventHandler =
  EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);