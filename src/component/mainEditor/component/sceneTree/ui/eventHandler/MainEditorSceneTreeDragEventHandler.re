module DragEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (Wonderjs.GameObjectType.gameObject, Wonderjs.GameObjectType.gameObject);
  let _setParentKeepOrder = (targetUid, dragedUid) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.setParentKeepOrder(targetUid, dragedUid)
    |> MainEditorStateView.finishState;
  let _getSceneGraphDataFromStore = (store: AppStore.appState) =>
    store.sceneTreeState.sceneGraphData |> Js.Option.getExn;
  let onDrop = ((store, dispatch), (), (targetUid, dragedUid)) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.isGameObjectRelationError(targetUid, dragedUid) ?
      dispatch(AppStore.ReLoad) |> ignore :
      {
        _setParentKeepOrder(targetUid, dragedUid);
        dispatch(
          AppStore.SceneTreeAction(
            SetSceneGraph(
              Some(
                MainEditorSceneTreeView.getDragedSceneGraphData(
                  targetUid,
                  dragedUid,
                  _getSceneGraphDataFromStore(store)
                )
              )
            )
          )
        )
      }
      |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);