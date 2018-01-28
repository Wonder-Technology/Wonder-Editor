module SelectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  let _setCurrentGameObject = (gameObject) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneView.setCurrentGameObject(gameObject)
    |> MainEditorStateView.finishState;
  let onSelect = ((_store, dispatch), (), uid) => {
    _setCurrentGameObject(uid);
    dispatch(AppStore.ReLoad) |> ignore
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(SelectEventHandler);