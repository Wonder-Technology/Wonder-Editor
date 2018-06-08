open SceneGraphType;

Css.importCss("./css/mainEditorSceneTree.css");

type retainedProps = {
  sceneGraph: MainEditorSceneTreeStore.sceneTreeDataType,
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject),
};

module Method = {
  let onSelect = MainEditorSceneTreeSelectEventHandler.MakeEventHandler.onSelect;

  let onDrop = MainEditorSceneTreeDragEventHandler.MakeEventHandler.onDrop;

  let getSceneGraphChildrenArray = sceneGraphData =>
    sceneGraphData |> ArrayService.getFirst |> (scene => scene.children);

  let _isSelected = (uid, currentSceneTreeNode) =>
    switch (currentSceneTreeNode) {
    | None => false
    | Some(gameObject) => gameObject === uid
    };

  let rec buildSceneTreeArray =
          (dragImg, onSelect, onDrop, currentSceneTreeNode, sceneGraphData) =>
    sceneGraphData
    |> Js.Array.map(({uid, name, children}) =>
         <TreeNode
           key=(DomHelper.getRandomKey())
           attributeTuple=(
             uid,
             name,
             _isSelected(uid, currentSceneTreeNode),
             true,
             dragImg,
             SceneTreeUtils.getFlag(),
             None,
             None,
           )
           funcTuple=(
             onSelect,
             onDrop,
             SceneTreeUtils.handleFlag,
             SceneTreeUtils.isGameObjectRelationError,
           )
           treeChildren=(
             buildSceneTreeArray(
               dragImg,
               onSelect,
               onDrop,
               currentSceneTreeNode,
               children,
             )
           )
         />
       );
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

let render = (store, dispatchFunc, self: ReasonReact.self('a, 'b, 'c)) =>
  <article key="sceneTree" className="wonder-sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArray=(
        store
        |> SceneTreeUtils.unsafeGetSceneGraphDataFromStore
        |> Method.getSceneGraphChildrenArray
        |> Method.buildSceneTreeArray(
             DomHelper.createElement("img"),
             Method.onSelect((store, dispatchFunc), ()),
             Method.onDrop((store, dispatchFunc), ()),
             self.retainedProps.currentSceneTreeNode,
           )
      )
      rootUid=(
        SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState
      )
      onDrop=(Method.onDrop((store, dispatchFunc), ()))
      handleFlag=SceneTreeUtils.handleFlag
      handleRelationError=SceneTreeUtils.isGameObjectRelationError
    />
  </article>;

let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    sceneGraph: store.sceneTreeState.sceneGraphData,
    currentSceneTreeNode:
      SceneEditorService.getCurrentSceneTreeNode
      |> StateLogicService.getEditorState,
  },
  shouldUpdate,
  render: self => render(store, dispatchFunc, self),
};