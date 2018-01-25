
open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

type retainedProps = {
  sceneGraph: MainEditorSceneTreeStore.sceneTreeDataType,
  currentGameObject: option(Wonderjs.GameObjectType.gameObject)
};

module Method = {
  let unsafeGetScene = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.unsafeGetScene;
  let onSelect = MainEditorSceneTreeSelectEventHandler.MakeEventHandler.onSelect;
  let getSceneGraphDataFromStore = (store: AppStore.appState) =>
    store.sceneTreeState.sceneGraphData |> Js.Option.getExn;
  let onDrop = MainEditorSceneTreeDragEventHandler.MakeEventHandler.onDrop;
  let getSceneChildrenSceneGraphData = (sceneGraphData) =>
    sceneGraphData |> OperateArrayUtils.getFirst |> ((scene) => scene.children);
  let _isCurrentGameObject = (uid) =>
    switch (MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject) {
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

let render = (store, dispatch, _self) => {
  WonderLog.Log.print("scenetree update") |> ignore;
  <article key="sceneTree" className="sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArrayData=(
        Method.getSceneGraphDataFromStore(store)
        |> Method.getSceneChildrenSceneGraphData
        |> Method.buildTreeArrayData(
             Method.onSelect((store, dispatch), ()),
             Method.onDrop((store, dispatch), ())
           )
      )
      rootUid=(Method.unsafeGetScene())
      onDrop=(Method.onDrop((store, dispatch), ()))
    />
  </article>
};

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  retainedProps: {
    sceneGraph: store.sceneTreeState.sceneGraphData,
    currentGameObject:
      MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject
  },
  shouldUpdate: ({oldSelf, newSelf}) =>
    switch (
      oldSelf.retainedProps.sceneGraph == newSelf.retainedProps.sceneGraph,
      oldSelf.retainedProps.currentGameObject == newSelf.retainedProps.currentGameObject
    ) {
    | (true, true) => false
    | _ => true
    },
  render: (self) => render(store, dispatch, self)
};