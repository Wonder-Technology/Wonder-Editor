open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

module Method = {
  let onSelect = (uid) => Js.log(uid);
  let getSceneGraphData = (store: AppStore.appState) =>
    Js.Option.getExn(store.sceneTreeState.sceneGraphData);
  let _setObjectParent = (targetId, dragedId) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.setParent(targetId, dragedId)
    |> MainEditorStateView.finishState;
  let onDropFinish = (store, dispatch, targetId, dragedId) => {
    Js.log("drop finish");
    Js.log(targetId);
    Js.log(dragedId);
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.isObjectAssociateError(targetId, dragedId) ?
      dispatch(AppStore.ReLoad) :
      {
        _setObjectParent(targetId, dragedId);
        let newSceneGraphData =
          MainEditorSceneTreeView.getDragedSceneGraphData(
            targetId,
            dragedId,
            getSceneGraphData(store)
          );
        dispatch(AppStore.SceneTreeAction(SetSceneGraph(Some(newSceneGraphData))))
      }
  };
};

let component = ReasonReact.statelessComponent("MainEditorSceneTree");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: ({state, reduce}) =>
    <article key="sceneTree" className="sceneTree-component">
      <DragTree
        key=(DomHelper.getRandomKey())
        onSelect=Method.onSelect
        onDropFinish=(Method.onDropFinish(store, dispatch))
        sceneGraphData=Method.getSceneGraphData(store)[0].children
      />
    </article>
};