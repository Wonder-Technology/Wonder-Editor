open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

module Method = {
  let onSelect = (uid) => Js.log(uid);
  let getSceneGraphData = (store: AppStore.appState) =>
    Js.Option.getExn(store.sceneTreeState.sceneGraphData);
  let getSceneGraphFromEngine = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneTreeView.getSceneGraphData;
};

let component = ReasonReact.statelessComponent("MainEditorSceneTree");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  let onDropFinish = (targetId, dragedId) => {
    Js.log("drop finish");
    Js.log({j|$targetId targetid|j});
    Js.log({j|$dragedId dragedId|j});
    /* todo should test dragedId and targetId associate */
    let newSceneGraphData =
      MainEditorSceneTreeView.getDragedSceneGraphData(
        targetId,
        dragedId,
        Method.getSceneGraphData(store)
      );
    dispatch(AppStore.SceneTreeAction(SetSceneGraph(Some(newSceneGraphData))))
  };
  {
    ...component,
    initialState: () =>
      dispatch(AppStore.SceneTreeAction(SetSceneGraph(Some(Method.getSceneGraphFromEngine())))),
    render: ({state, reduce}) =>
      switch store.sceneTreeState.sceneGraphData {
      | None => <article key="sceneTree" className="sceneTree-component" />
      | Some(sceneGraphData) =>
        <article key="sceneTree" className="sceneTree-component">
          <DragTree
            key=(DomHelper.getRandomKey())
            onSelect=Method.onSelect
            onDropFinish
            sceneGraphData=sceneGraphData[0].children
          />
        </article>
      }
  }
};