open SceneGraphType;

Css.importCss("./css/mainEditorSceneTree.css");

type retainedProps = {
  sceneGraph: MainEditorSceneTreeStore.sceneTreeDataType,
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject),
};

module Method = {
  let onSelect = ((store, dispatchFunc), (), uid) => {
    let editorState = StateEditorService.getState();

    switch (SceneEditorService.getCurrentSceneTreeNode(editorState)) {
    | None =>
      MainEditorSceneTreeSelectEventHandler.MakeEventHandler.onSelect(
        (store, dispatchFunc),
        (),
        uid,
      )
    | Some(gameObject) =>
      gameObject === uid ?
        WonderLog.Log.print("gameobject == uid") |> ignore :
        MainEditorSceneTreeSelectEventHandler.MakeEventHandler.onSelect(
          (store, dispatchFunc),
          (),
          uid,
        )
    };
  };

  let onDrop = MainEditorSceneTreeDragEventHandler.MakeEventHandler.onDrop;

  /* let getSceneGraphChildrenArray = sceneGraphArr => */

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

let render = (store, dispatchFunc, self: ReasonReact.self('a, 'b, 'c)) =>
  <article key="sceneTree" className="wonder-sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArray=(
        store
        |> SceneTreeUtils.unsafeGetSceneGraphDataFromStore
        |> ArrayService.getFirst
        |> (scene => scene.children)
        |> Method.buildSceneTreeArray(
             DomHelper.createElement("img"),
             self.retainedProps.currentSceneTreeNode,
             (
               Method.onSelect((store, dispatchFunc), ()),
               Method.onDrop((store, dispatchFunc), ()),
             ),
           )
      )
      rootUid=(
        SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState
      )
      onDrop=(Method.onDrop((store, dispatchFunc), ()))
      isFlag=SceneTreeUtils.isFlag
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