open SceneTreeNodeType;

let _handleDragIntoTarget = (targetGameObject, draggedGameObject, engineState) => {
  SceneTreeEditorService.setIsShowChildren(targetGameObject, true)
  |> StateLogicService.getAndSetEditorState;

  engineState
  |> HierarchyGameObjectEngineService.setParentKeepOrder(
       targetGameObject,
       draggedGameObject,
     );
};

let handleDragToBeSceneGameObjectChild =
    (dragPosition, sceneGameObject, draggedGameObject, engineState) =>
  switch (dragPosition) {
  | DragIntoTarget =>
    _handleDragIntoTarget(sceneGameObject, draggedGameObject, engineState)

  | DragBeforeTarget
  | DragAfterTarget =>
    let targetGameObject =
      engineState
      |> HierarchyGameObjectEngineService.getChildren(sceneGameObject)
      |> ArrayService.unsafeGetFirst;

    engineState
    |> HierarchyGameObjectEngineService.setParentKeepOrder(
         HierarchyGameObjectEngineService.getParentGameObject(
           targetGameObject,
           engineState,
         )
         |> OptionService.unsafeGet,
         draggedGameObject,
       )
    |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
         draggedGameObject,
         targetGameObject,
         Wonderjs.TransformType.Before,
       );
  };

let handleDragToBeTargetGameObjectSib =
    (dragPosition, targetGameObject, draggedGameObject, engineState) =>
  switch (dragPosition) {
  | DragBeforeTarget =>
    engineState
    |> HierarchyGameObjectEngineService.setParentKeepOrder(
         HierarchyGameObjectEngineService.getParentGameObject(
           targetGameObject,
           engineState,
         )
         |> OptionService.unsafeGet,
         draggedGameObject,
       )
    |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
         draggedGameObject,
         targetGameObject,
         Wonderjs.TransformType.Before,
       )

  | DragIntoTarget =>
    _handleDragIntoTarget(targetGameObject, draggedGameObject, engineState)

  | DragAfterTarget =>
    engineState
    |> HierarchyGameObjectEngineService.setParentKeepOrder(
         HierarchyGameObjectEngineService.getParentGameObject(
           targetGameObject,
           engineState,
         )
         |> OptionService.unsafeGet,
         draggedGameObject,
       )
    |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
         draggedGameObject,
         targetGameObject,
         Wonderjs.TransformType.After,
       )
  };