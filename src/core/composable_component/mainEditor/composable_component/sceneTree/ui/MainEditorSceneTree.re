open SceneGraphType;

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

  let dragGameObjectIntoGameObject = SceneTreeDragGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let dragWdbIntoScene = SceneTreeDragWdbEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

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
           widge=(SceneTreeUtils.getWidge())
           onSelect=onSelectFunc
           onDrop=onDropFunc
           isWidge=SceneTreeUtils.isWidge
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
        |> ArrayService.unsafeGetFirst
        |> (scene => scene.children)
        |> Method.buildSceneTreeArray(
             DomHelper.createElement("img"),
             editorState |> SceneEditorService.getCurrentSceneTreeNode,
             (
               Method.onSelect((store, dispatchFunc)),
               Method.dragGameObjectIntoGameObject((store, dispatchFunc), ()),
             ),
           )
      )
      rootUid=(
        SceneEngineService.getSceneGameObject
        |> StateLogicService.getEngineStateToGetData
      )
      dragGameObject=(Method.dragGameObjectIntoGameObject((store, dispatchFunc), ()))
      dragWdb=(Method.dragWdbIntoScene((store, dispatchFunc), ()))
      isWidge=SceneTreeUtils.isWidge
      handleRelationError=SceneTreeUtils.isGameObjectRelationError
      isAssetWdbFile=AssetUtils.isAssetWdbFile
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