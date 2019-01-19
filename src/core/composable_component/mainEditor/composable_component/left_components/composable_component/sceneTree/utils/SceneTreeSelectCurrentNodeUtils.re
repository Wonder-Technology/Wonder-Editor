let rec _setAllParentsShowChildren = (gameObject, engineState, editorState) =>
  switch (GameObjectUtils.getParentGameObject(gameObject, engineState)) {
  | None => editorState
  | Some(parentGameObject) =>
    _setAllParentsShowChildren(
      parentGameObject,
      engineState,
      editorState
      |> SceneTreeEditorService.setIsShowChildren(parentGameObject, true),
    )
  };

let select = (dispatchFunc, uid) => {
  StateEditorService.getState()
  |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
  |> StateEditorService.setState
  |> ignore;

  StateEditorService.getState()
  |> SceneTreeEditorService.setCurrentSceneTreeNode(uid)
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(
       SceneTreeWidgetService.getWidget(),
     )
  |> _setAllParentsShowChildren(uid, StateEngineService.unsafeGetState())
  |> StateEditorService.setState
  |> ignore;

  StateLogicService.getAndRefreshEngineStateWhenStop();

  dispatchFunc(
    AppStore.UpdateAction(Update([|SceneTree, Inspector, Project|])),
  )
  |> ignore;
};