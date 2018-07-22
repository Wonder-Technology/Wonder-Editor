open SceneGraphType;

Css.importCss("./css/mainEditorSceneTree.css");

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

module Method = {
  let onSelect = ((store, dispatchFunc), uid) => {
    let editorState = StateEditorService.getState();

    switch (SceneEditorService.getCurrentSceneTreeNode(editorState)) {
    | None =>
      SceneTreeSelectCurrentNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (store, dispatchFunc),
        (),
        uid,
      )
    | Some(gameObject) =>
      gameObject === uid ?
        () :
        SceneTreeSelectCurrentNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
          (store, dispatchFunc),
          (),
          uid,
        )
    };
  };

  let onDrop = SceneTreeDragEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _isSelected = (uid, currentSceneTreeNode) =>
    switch (currentSceneTreeNode) {
    | None => false
    | Some(gameObject) => gameObject === uid
    };

  let rec buildSceneTreeArray =
          (
            dragImg,
            currentSceneTreeNode,
            (onSelectFunc, onDropFunc),
            sceneGraphArr,
          ) =>
    sceneGraphArr
    |> Js.Array.map(({uid, name, children}) =>
         <TreeNode
           key=(DomHelper.getRandomKey())
           uid
           name
           isSelected=(_isSelected(uid, currentSceneTreeNode))
           isActive=true
           dragImg
           flag=(SceneTreeUtils.getFlag())
           onSelect=onSelectFunc
           onDrop=onDropFunc
           isFlag=SceneTreeUtils.isFlag
           handleRelationError=SceneTreeUtils.isGameObjectRelationError
           treeChildren=(
             buildSceneTreeArray(
               dragImg,
               currentSceneTreeNode,
               (onSelectFunc, onDropFunc),
               children,
             )
           )
         />
       );
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

let render = (store, dispatchFunc, _self) => {
  let editorState = StateEditorService.getState();

  <article key="sceneTree" className="wonder-sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArray=(
        store
        |> StoreUtils.unsafeGetSceneGraphDataFromStore
        |> ArrayService.getFirst
        |> (scene => scene.children)
        |> Method.buildSceneTreeArray(
             DomHelper.createElement("img"),
             editorState |> SceneEditorService.getCurrentSceneTreeNode,
             (
               Method.onSelect((store, dispatchFunc)),
               Method.onDrop((store, dispatchFunc), ()),
             ),
           )
      )
      rootUid=(editorState |> SceneEditorService.unsafeGetScene)
      onDrop=(Method.onDrop((store, dispatchFunc), ()))
      isFlag=SceneTreeUtils.isFlag
      handleRelationError=SceneTreeUtils.isGameObjectRelationError
    />
  </article>;
};

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.SceneTree);

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(store),
  },
  shouldUpdate,
  render: self => render(store, dispatchFunc, self),
};