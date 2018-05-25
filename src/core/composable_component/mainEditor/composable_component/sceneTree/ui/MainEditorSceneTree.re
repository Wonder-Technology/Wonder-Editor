open SceneGraphType;

Css.importCss("./css/mainEditorSceneTree.css");

type retainedProps = {
  sceneGraph: MainEditorSceneTreeStore.sceneTreeDataType,
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject)
};

module Method = {
  let onSelect = MainEditorSceneTreeSelectEventHandler.MakeEventHandler.onSelect;
  let handleSign = (startSign) => startSign === SceneTreeUIUtils.getSign();
  let onDrop = MainEditorSceneTreeDragEventHandler.MakeEventHandler.onDrop;
  let getSceneChildrenSceneGraphData = (sceneGraphData) =>
    sceneGraphData |> ArrayService.getFirst |> ((scene) => scene.children);
  let _isSelected = (uid, currentSceneTreeNode) =>
    switch currentSceneTreeNode {
    | None => false
    | Some(gameObject) => gameObject === uid ? true : false
    };
  let rec buildSceneTreeArray = (onSelect, onDrop, currentSceneTreeNode, sceneGraphData) =>
    sceneGraphData
    |> Array.map(
         ({uid, name, children}) =>
           ArrayService.hasItem(children) ?
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(uid, name, _isSelected(uid, currentSceneTreeNode), true)
               eventHandleTuple=(
                 onSelect,
                 onDrop,
                 handleSign,
                 SceneTreeUtils.isGameObjectRelationError
               )
               sign=(SceneTreeUIUtils.getSign())
               treeChildren=(buildSceneTreeArray(onSelect, onDrop, currentSceneTreeNode, children))
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(uid, name, _isSelected(uid, currentSceneTreeNode), true)
               eventHandleTuple=(
                 onSelect,
                 onDrop,
                 handleSign,
                 SceneTreeUtils.isGameObjectRelationError
               )
               sign=(SceneTreeUIUtils.getSign())
             />
       );
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

let render = (store, dispatch, self: ReasonReact.self('a, 'b, 'c)) =>
  <article key="sceneTree" className="sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArrayData=(
        store
        |> SceneTreeUIUtils.unsafeGetSceneGraphDataFromStore
        |> Method.getSceneChildrenSceneGraphData
        |> Method.buildSceneTreeArray(
             Method.onSelect((store, dispatch), ()),
             Method.onDrop((store, dispatch), ()),
             self.retainedProps.currentSceneTreeNode
           )
      )
      rootUid=(SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState)
      onDrop=(Method.onDrop((store, dispatch), ()))
      handleSign=Method.handleSign
      handleRelation=SceneTreeUtils.isGameObjectRelationError
    />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  retainedProps: {
    sceneGraph: store.sceneTreeState.sceneGraphData,
    currentSceneTreeNode:
      SceneEditorService.getCurrentSceneTreeNode |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, self)
};