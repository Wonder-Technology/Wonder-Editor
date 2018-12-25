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

  let handleToggleShowTreeChildren =
      (store, dispatchFunc, targetId, isShowChildren) => {
    let newSceneGraphData =
      store
      |> StoreUtils.unsafeGetSceneGraphDataFromStore
      |> SceneGraphUtils.setSpecificSceneTreeNodeIsShowChildren(
           targetId,
           isShowChildren,
         );

    dispatchFunc(
      AppStore.SceneTreeAction(SetSceneGraph(Some(newSceneGraphData))),
    )
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };

  let dragGameObjectIntoGameObject = SceneTreeDragGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let dragWDBIntoScene = SceneTreeDragWDBEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildSceneNode = (children, engineState) => {
    uid: SceneEngineService.getSceneGameObject(engineState),
    name: "Scene",
    isShowChildren: SceneGraphUtils.getSceneTreeNodeIsShowChildren(),
    children,
  };

  let _isSelected = (uid, currentSceneTreeNode) =>
    switch (currentSceneTreeNode) {
    | None => false
    | Some(gameObject) => gameObject === uid
    };

  let rec buildSceneTreeArray =
          (
            (store, dispatchFunc, dragImg),
            currentSceneTreeNode,
            (onSelectFunc, dragGameObjectFunc, dragWDBFunc),
            sceneGraphArr,
          ) =>
    sceneGraphArr
    |> Js.Array.map(({uid, name, isShowChildren, children}) =>
         <SceneTreeNode
           key=(StringService.intToString(uid))
           id=uid
           name
           isSelected=(_isSelected(uid, currentSceneTreeNode))
           isActive=true
           dragImg
           widget=(SceneTreeUtils.getWidget())
           onSelect=onSelectFunc
           dragGameObject=dragGameObjectFunc
           dragWDB=dragWDBFunc
           isWidget=SceneTreeUtils.isWidget
           isShowChildren
           isAssetWDBFile=AssetUtils.isWDBAssetFile
           isHasChildren=(children |> Js.Array.length >= 1)
           handleToggleShowTreeChildren=(
             handleToggleShowTreeChildren(store, dispatchFunc)
           )
           checkNodeRelation=SceneTreeUtils.isGameObjectRelationError
           treeChildren=(
             buildSceneTreeArray(
               (store, dispatchFunc, dragImg),
               currentSceneTreeNode,
               (onSelectFunc, dragGameObjectFunc, dragWDBFunc),
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
    <article className="wonder-tree">
      (
        ReasonReact.array(
          store
          |> StoreUtils.unsafeGetSceneGraphDataFromStore
          |> ArrayService.unsafeGetFirst
          |> (scene => scene.children)
          |> (
            sceneGraphArr =>
              [|
                Method.buildSceneNode(
                  sceneGraphArr,
                  StateEngineService.unsafeGetState(),
                ),
              |]
              |> Method.buildSceneTreeArray(
                   (store, dispatchFunc, DomHelper.createElement("img")),
                   editorState |> SceneEditorService.getCurrentSceneTreeNode,
                   (
                     Method.onSelect((store, dispatchFunc)),
                     Method.dragGameObjectIntoGameObject(
                       (store, dispatchFunc),
                       (),
                     ),
                     Method.dragWDBIntoScene((store, dispatchFunc), ()),
                   ),
                 )
          ),
        )
      )
    </article>
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