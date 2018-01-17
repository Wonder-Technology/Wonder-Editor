open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

module Method = {
  let unsafeGetScene = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.unsafeGetScene;
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
  let _setParentKeepOrder = (targetUid, dragedUid) =>
    /* set parent to set parent order */
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.setParentKeepOrder(targetUid, dragedUid)
    |> MainEditorStateView.finishState;
  let onDropFinish = (store, dispatch, targetUid, dragedUid) =>
    MainEditorStateView.prepareState()
    |> MainEditorSceneTreeView.isGameObjectRelationError(targetUid, dragedUid) ?
      dispatch(AppStore.ReLoad) :
      {
        _setParentKeepOrder(targetUid, dragedUid);
        dispatch(
          AppStore.SceneTreeAction(
            SetSceneGraph(
              Some(
                MainEditorSceneTreeView.getDragedSceneGraphData(
                  targetUid,
                  dragedUid,
                  getSceneGraphDataFromStore(store)
                )
              )
            )
          )
        )
      };
  let rec buildTreeArrayData = (onSelect, onDropFinish, sceneGraphData) =>
    sceneGraphData
    |> Array.map(
         ({uid, name, children}) =>
           OperateArrayUtils.hasItem(children) ?
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
      rootUid=(Method.unsafeGetScene())
      onDropFinish=(Method.onDropFinish(store, dispatch))
    />
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};