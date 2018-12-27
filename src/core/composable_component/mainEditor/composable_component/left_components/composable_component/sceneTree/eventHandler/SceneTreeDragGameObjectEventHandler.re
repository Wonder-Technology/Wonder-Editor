module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectType.gameObject,
    Wonderjs.GameObjectType.gameObject,
  );
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), (targetUid, draggedUid)) => {
    let isShowChildrenMap =
      SceneGraphUtils.buildIsShowChildrenMapFromStore(store)
      |> WonderCommonlib.SparseMapService.set(targetUid, true);

    GameObjectUtils.setParentKeepOrder(targetUid, draggedUid)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            SceneGraphUtils.getSceneGraphDataFromEngine((
              editorState,
              engineState,
            ))
            |> SceneGraphUtils.setIsShowChildrenByMap(isShowChildrenMap),
          ),
        ),
      ),
    )
    |> ignore;

    editorState |> StateEditorService.setState |> ignore;
    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);