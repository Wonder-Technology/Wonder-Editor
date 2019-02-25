open SceneGraphType;

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

module Method = {
  let onSelect = ((uiState, dispatchFunc), uid) => {
    let editorState = StateEditorService.getState();

    switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
    | None =>
      SceneTreeSelectCurrentNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (uiState, dispatchFunc),
        (),
        Some(uid),
      )
    | Some(gameObject) =>
      gameObject === uid ?
        () :
        SceneTreeSelectCurrentNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
          (uiState, dispatchFunc),
          (),
          Some(uid),
        )
    };
  };

  let handleToggleShowTreeChildren = (dispatchFunc, targetId, isShowChildren) => {
    SceneTreeEditorService.setIsShowChildren(targetId, isShowChildren)
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };

  let dragGameObjectToBeTargetSib = SceneTreeDragGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let dragWDBToBeTargetSib = SceneTreeDragWDBEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildSceneNode = (children, engineState) => {
    let scene = SceneEngineService.getSceneGameObject(engineState);

    {
      uid: scene,
      name:
        GameObjectEngineService.unsafeGetGameObjectName(scene, engineState),
      children,
    };
  };

  let _isSelected = (uid, currentSceneTreeNode) =>
    switch (currentSceneTreeNode) {
    | None => false
    | Some(gameObject) => gameObject === uid
    };

  let rec buildSceneTreeArray =
          (
            (uiState, dispatchFunc, dragImg),
            currentSceneTreeNode,
            (onSelectFunc, dragGameObjectFunc, dragWDBFunc),
            (sceneGameObject, editorState),
            sceneGraphArr,
          ) =>
    sceneGraphArr
    |> Js.Array.map(({uid, name, children}) =>
         <SceneTreeNode
           key=(StringService.intToString(uid))
           gameObject=uid
           name
           isSelected=(_isSelected(uid, currentSceneTreeNode))
           isActive=true
           dragImg
           widget=(SceneTreeWidgetService.getWidget())
           onSelect=onSelectFunc
           dragGameObject=dragGameObjectFunc
           dragWDB=dragWDBFunc
           isWidget=SceneTreeWidgetService.isWidget
           isShowChildren=(
             SceneTreeEditorService.getIsShowChildern(
               uid,
               sceneGameObject,
               editorState,
             )
           )
           isAssetWDBFile=WDBNodeAssetEditorService.isWDBAssetFile
           isHasChildren=(children |> Js.Array.length >= 1)
           handleToggleShowTreeChildren=(
             handleToggleShowTreeChildren(dispatchFunc)
           )
           checkNodeRelation=CheckSceneTreeLogicService.checkGameObjectRelation
           treeChildren=(
             buildSceneTreeArray(
               (uiState, dispatchFunc, dragImg),
               currentSceneTreeNode,
               (onSelectFunc, dragGameObjectFunc, dragWDBFunc),
               (sceneGameObject, editorState),
               children,
             )
           )
         />
       );

};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

let render = (uiState, dispatchFunc, _self) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  <article
    key="sceneTree"
    className="wonder-sceneTree-component"
    id="wonder-sceneTree-component">
    <article className="wonder-tree">
      (
        ReasonReact.array(
          SceneGraphUtils.getSceneGraphDataFromEngine((
            editorState,
            engineState,
          ))
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
                   (uiState, dispatchFunc, DomHelper.createElement("img")),
                   editorState
                   |> SceneTreeEditorService.getCurrentSceneTreeNode,
                   (
                     Method.onSelect((uiState, dispatchFunc)),
                     Method.dragGameObjectToBeTargetSib(
                       (uiState, dispatchFunc),
                       (),
                     ),
                     Method.dragWDBToBeTargetSib(
                       (uiState, dispatchFunc),
                       (),
                     ),
                   ),
                   (
                     SceneEngineService.getSceneGameObject(engineState),
                     editorState,
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

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(uiState),
  },
  shouldUpdate,
  render: self => render(uiState, dispatchFunc, self),
};