open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

module Method = {
  let setCurrentGameObject = (gameObject) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneView.setCurrentGameObject(gameObject)
    |> MainEditorStateView.finishState;
  let onSelect = (dispatch, uid) => {
    Js.log(uid);
    setCurrentGameObject(uid);
    dispatch(AppStore.ReLoad)
  };
  let getSceneGraphDataFromStore = (store: AppStore.appState) =>
    Js.Option.getExn(store.sceneTreeState.sceneGraphData);
  let _setObjectParent = (targetId, dragedId) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.setParent(targetId, dragedId)
    |> MainEditorStateView.finishState;
  let onDropFinish = (store, dispatch, targetId, dragedId) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.isObjectAssociateError(targetId, dragedId) ?
      dispatch(AppStore.ReLoad) :
      {
        _setObjectParent(targetId, dragedId);
        dispatch(
          AppStore.SceneTreeAction(
            SetSceneGraph(
              Some(
                MainEditorSceneTreeView.getDragedSceneGraphData(
                  targetId,
                  dragedId,
                  getSceneGraphDataFromStore(store)
                )
              )
            )
          )
        )
      };
};

let component = ReasonReact.statelessComponent("MainEditorSceneTree");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) =>
    <article key="sceneTree" className="sceneTree-component">
      <DragTree
        key=(DomHelper.getRandomKey())
        onSelect=(Method.onSelect(dispatch))
        onDropFinish=(Method.onDropFinish(store, dispatch))
        sceneGraphData=Method.getSceneGraphDataFromStore(store)[0].children
      />
    </article>
};