open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

module Method = {
  let getScene = () => MainEditorStateView.prepareState() |> MainEditorSceneView.getScene;
  let setCurrentGameObject = (gameObject) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneView.setCurrentGameObject(gameObject)
    |> MainEditorStateView.finishState;
  let onSelect = (dispatch, uid) => {
    setCurrentGameObject(uid);
    dispatch(AppStore.ReLoad)
  };
  let getSceneGraphDataFromStore = (store: AppStore.appState) =>
    store.sceneTreeState.sceneGraphData |> Js.Option.getExn;
  let getSceneChildrenSceneGraphData = (sceneGraphData) =>
    sceneGraphData |> OperateArrayUtils.getFirst |> ((scene) => scene.children);
  let _setObjectParent = (targetId, dragedId) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.setParent(targetId, dragedId)
    |> MainEditorStateView.finishState;
  let onDropFinish = (store, dispatch, targetId, dragedId) =>
  /* TODO rename to Relation */
  /* TODO rename Object to GameObject */
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
  let _hasSceneGraphChildren = (children) => children |> Js.Array.length > 0;
  let rec buildTreeArrayData = (onSelect, onDropFinish, sceneGraphData) =>
    sceneGraphData
    |> Array.map(
         ({uid, name, children}) =>
           _hasSceneGraphChildren(children) ?
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(uid, name)
               eventHandleTuple=(onSelect, onDropFinish)
               treeChildren=(buildTreeArrayData(onSelect, onDropFinish, children))
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(uid, name)
               eventHandleTuple=(onSelect, onDropFinish)
             />
       );
};

let component = ReasonReact.statelessComponent("MainEditorSceneTree");

let render = (store, dispatch, _self) =>
  <article key="sceneTree" className="sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArrayData=(
        Method.getSceneGraphDataFromStore(store)
        |> Method.getSceneChildrenSceneGraphData
        |> Method.buildTreeArrayData(
             Method.onSelect(dispatch),
             Method.onDropFinish(store, dispatch)
           )
      )
      rootUid=(Method.getScene())
      onDropFinish=(Method.onDropFinish(store, dispatch))
    />
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: render(store, dispatch)
};