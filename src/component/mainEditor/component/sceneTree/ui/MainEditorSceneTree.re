open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

module Method = {
  let onSelect = (uid) => Js.log(uid);
  let getSceneGraphData = (store: AppStore.appState) =>
    Js.Option.getExn(store.sceneTreeState.sceneGraphData);
};

let component = ReasonReact.statelessComponent("MainEditorSceneTree");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  let onDropFinish = (targetId, dragedId) => {
    Js.log("drop finish");
    Js.log({j|$targetId targetid|j});
    Js.log({j|$dragedId dragedId|j});
    /* todo should test dragedId and targetId associate */
    let newSceneGraphData =
      MainEditorComponentView.SceneTreeView.getDragedSceneGraphData(
        targetId,
        dragedId,
        Method.getSceneGraphData(store)
      );
    dispatch(AppStore.SceneTreeAction(SetSceneGraph(Some(newSceneGraphData))))
  };
  {
    ...component,
    render: ({state, reduce}) =>
      <article key="sceneTree" className="sceneTree-component">
        <DragTree
          key=(DomHelper.getRandomKey())
          onSelect=Method.onSelect
          onDropFinish
          sceneGraphData=Method.getSceneGraphData(store)[0].children
        />
      </article>
  }
};