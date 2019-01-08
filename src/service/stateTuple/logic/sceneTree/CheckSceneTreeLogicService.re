let rec _judgeAllParents = (targetTransform, draggedTransform, engineState) =>
  switch (
    TransformEngineService.getParent(targetTransform, engineState)
    |> Js.Undefined.to_opt
  ) {
  | None => false
  | Some(transformParent) =>
    transformParent === draggedTransform ?
      true : _judgeAllParents(transformParent, draggedTransform, engineState)
  };

let _isDragedGameObjectBeTargetGameObjectParent =
    (targetGameObject, draggedGameObject, engineState) =>
  _judgeAllParents(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      targetGameObject,
      engineState,
    ),
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      draggedGameObject,
      engineState,
    ),
    engineState,
  );

let _checkTargetGameObjectBeDragedGameObjectParent =
    (draggedGameObject, targetGameObject, engineState)
    : Result.RelationResult.t =>
  switch (
    engineState
    |> TransformEngineService.getParent(
         engineState
         |> GameObjectComponentEngineService.unsafeGetTransformComponent(
              draggedGameObject,
            ),
       )
    |> Js.Undefined.to_opt
  ) {
  | None => Success()
  | Some(transformParent) =>
    transformParent
    === GameObjectComponentEngineService.unsafeGetTransformComponent(
          targetGameObject,
          engineState,
        ) ?
      Fail(
        Some(
          "target gameObject shouldn't be the parent of source gameObject",
        ),
      ) :
      Success()
  };

let checkGameObjectRelation =
    (draggedGameObject, targetGameObject, (_editorState, engineState))
    : Result.RelationResult.t =>
  targetGameObject === draggedGameObject ?
    Fail(Some("source and target gameObject shouldn't be the same")) :
    _isDragedGameObjectBeTargetGameObjectParent(
      targetGameObject,
      draggedGameObject,
      engineState,
    ) ?
      Fail(
        Some(
          "source gameObject shouldn't be the parent of the target gameObject",
        ),
      ) :
      _checkTargetGameObjectBeDragedGameObjectParent(
        draggedGameObject,
        targetGameObject,
        engineState,
      );