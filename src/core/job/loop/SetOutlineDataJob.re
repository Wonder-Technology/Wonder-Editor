let _getOutlineColor = () => [|1., 1., 0.|];

let setOutlineDataJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
  | None =>
    JobDataEngineService.setGameObjectsNeedDrawOutline([||], engineState)
  | Some(currentGameObject) =>
    engineState
    |> JobDataEngineService.setOutlineColor(_getOutlineColor())
    |> JobDataEngineService.setGameObjectsNeedDrawOutline(
         HierarchyGameObjectEngineService.getAllGameObjects(
           currentGameObject,
           engineState,
         ),
       )
  };
};