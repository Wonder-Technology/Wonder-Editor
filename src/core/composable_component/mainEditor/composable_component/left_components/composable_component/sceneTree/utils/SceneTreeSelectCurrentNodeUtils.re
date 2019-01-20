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

let _clearCurrentData = editorState =>
  editorState
  |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
  |> CurrentSelectSourceEditorService.clearCurrentSelectSource
  |> SceneTreeEditorService.clearCurrentSceneTreeNode;

let select = (dispatchFunc, gameObjectOpt) => {
  switch (gameObjectOpt) {
  | None =>
    StateEditorService.getState()
    |> _clearCurrentData
    |> StateEditorService.setState
    |> ignore
  | Some(gameObject) =>
    StateEditorService.getState()
    |> _clearCurrentData
    |> StateEditorService.setState
    |> ignore;

    StateEditorService.getState()
    |> SceneTreeEditorService.setCurrentSceneTreeNode(gameObject)
    |> CurrentSelectSourceEditorService.setCurrentSelectSource(
         SceneTreeWidgetService.getWidget(),
       )
    |> _setAllParentsShowChildren(
         gameObject,
         StateEngineService.unsafeGetState(),
       )
    |> StateEditorService.setState
    |> ignore;

    StateLogicService.getAndRefreshEngineStateWhenStop();
  };

  dispatchFunc(
    AppStore.UpdateAction(Update([|SceneTree, Inspector, Project|])),
  )
  |> ignore;
};