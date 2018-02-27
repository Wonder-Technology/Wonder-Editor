open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

type retainedProps = {
  sceneGraph: MainEditorSceneTreeStore.sceneTreeDataType,
  currentGameObject: option(Wonderjs.GameObjectType.gameObject)
};

module Method = {
  let onSelect = MainEditorSceneTreeSelectEventHandler.MakeEventHandler.onSelect;
  let onDrop = MainEditorSceneTreeDragEventHandler.MakeEventHandler.onDrop;
  let getSceneChildrenSceneGraphData = (sceneGraphData) =>
    sceneGraphData |> OperateArrayUtils.getFirst |> ((scene) => scene.children);
  let _isCurrentGameObject = (uid) =>
    switch (MainEditorSceneView.getCurrentGameObject |> OperateStateUtils.getState) {
    | None => false
    | Some(gameObject) => gameObject === uid ? true : false
    };
  let rec buildTreeArrayData = (onSelect, onDrop, sceneGraphData) =>
    sceneGraphData
    |> Array.map(
         ({uid, name, children}) =>
           OperateArrayUtils.hasItem(children) ?
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(uid, name, _isCurrentGameObject(uid))
               eventHandleTuple=(onSelect, onDrop)
               treeChildren=(buildTreeArrayData(onSelect, onDrop, children))
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(uid, name, _isCurrentGameObject(uid))
               eventHandleTuple=(onSelect, onDrop)
             />
       );
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

let render = (store, dispatch, _self) =>
  <article key="sceneTree" className="sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArrayData=(
        store
        |> SceneGraphDataUtils.unsafeGetSceneGraphDataFromStore
        |> Method.getSceneChildrenSceneGraphData
        |> Method.buildTreeArrayData(
             Method.onSelect((store, dispatch), ()),
             Method.onDrop((store, dispatch), ())
           )
      )
      rootUid=(MainEditorSceneView.unsafeGetScene |> OperateStateUtils.getState)
      onDrop=(Method.onDrop((store, dispatch), ()))
    />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  retainedProps: {
    sceneGraph: store.sceneTreeState.sceneGraphData,
    currentGameObject: MainEditorSceneView.getCurrentGameObject |> OperateStateUtils.getState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, self)
};