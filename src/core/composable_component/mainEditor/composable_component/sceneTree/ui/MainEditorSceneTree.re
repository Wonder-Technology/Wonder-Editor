open SceneGraphType;

Css.importCss("./css/mainEditorSceneTree.css");

type state = {dragImg: DomHelper.domType};

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
  let rec buildSceneTreeArray = (dragImg, onSelect, onDrop, currentSceneTreeNode, sceneGraphData) =>
    sceneGraphData
    |> Array.map(
         ({uid, name, children}) =>
           ArrayService.hasItem(children) ?
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(
                 uid,
                 name,
                 _isSelected(uid, currentSceneTreeNode),
                 true,
                 dragImg,
                 SceneTreeUIUtils.getSign(),
                 None,
                 None
               )
               eventHandleTuple=(
                 onSelect,
                 onDrop,
                 handleSign,
                 SceneTreeUtils.isGameObjectRelationError
               )
               treeChildren=(
                 buildSceneTreeArray(dragImg, onSelect, onDrop, currentSceneTreeNode, children)
               )
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(
                 uid,
                 name,
                 _isSelected(uid, currentSceneTreeNode),
                 true,
                 dragImg,
                 SceneTreeUIUtils.getSign(),
                 None,
                 None
               )
               eventHandleTuple=(
                 onSelect,
                 onDrop,
                 handleSign,
                 SceneTreeUtils.isGameObjectRelationError
               )
             />
       );
};

let component = ReasonReact.statefulComponentWithRetainedProps("MainEditorSceneTree");

let render = (store, dispatchFunc, self: ReasonReact.self('a, 'b, 'c)) =>
  <article key="sceneTree" className="sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArrayData=(
        store
        |> SceneTreeUIUtils.unsafeGetSceneGraphDataFromStore
        |> Method.getSceneChildrenSceneGraphData
        |> Method.buildSceneTreeArray(
             self.state.dragImg,
             Method.onSelect((store, dispatchFunc), ()),
             Method.onDrop((store, dispatchFunc), ()),
             self.retainedProps.currentSceneTreeNode
           )
      )
      rootUid=(SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState)
      onDrop=(Method.onDrop((store, dispatchFunc), ()))
      handleSign=Method.handleSign
      handleRelationError=SceneTreeUtils.isGameObjectRelationError
    />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {dragImg: DomHelper.createElement("img")},
  retainedProps: {
    sceneGraph: store.sceneTreeState.sceneGraphData,
    currentSceneTreeNode:
      SceneEditorService.getCurrentSceneTreeNode |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatchFunc, self)
};