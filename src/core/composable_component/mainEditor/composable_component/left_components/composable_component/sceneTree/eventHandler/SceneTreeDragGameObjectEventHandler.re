module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectType.gameObject,
    Wonderjs.GameObjectType.gameObject,
  );
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), (targetUid, draggedUid)) => {
    SceneTreeEditorService.setIsShowChildren(targetUid, true)
    |> StateLogicService.getAndSetEditorState;

    GameObjectUtils.setParentKeepOrder(targetUid, draggedUid)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);