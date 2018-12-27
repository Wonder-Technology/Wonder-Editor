let rec _judgeAllParents = (targetTransform, dragedTransform, engineState) =>
  switch (
    TransformEngineService.getParent(targetTransform, engineState)
    |> Js.Undefined.to_opt
  ) {
  | None => false
  | Some(transformParent) =>
    transformParent === dragedTransform ?
      true : _judgeAllParents(transformParent, dragedTransform, engineState)
  };

let _isDragedGameObjectBeTargetGameObjectParent =
    (targetGameObject, dragedGameObject, engineState) =>
  _judgeAllParents(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      targetGameObject,
      engineState,
    ),
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      dragedGameObject,
      engineState,
    ),
    engineState,
  );

let _checkTargetGameObjectBeDragedGameObjectParent =
    (dragedGameObject, targetGameObject, engineState)
    : Result.RelationResult.t =>
  switch (
    engineState
    |> TransformEngineService.getParent(
         engineState
         |> GameObjectComponentEngineService.unsafeGetTransformComponent(
              dragedGameObject,
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
    (dragedGameObject, targetGameObject, (_editorState, engineState))
    : Result.RelationResult.t =>
  targetGameObject === dragedGameObject ?
    Fail(Some("source and target gameObject shouldn't be the same")) :
    _isDragedGameObjectBeTargetGameObjectParent(
      targetGameObject,
      dragedGameObject,
      engineState,
    ) ?
      Fail(
        Some(
          "source gameObject shouldn't be the parent of the target gameObject",
        ),
      ) :
      _checkTargetGameObjectBeDragedGameObjectParent(
        dragedGameObject,
        targetGameObject,
        engineState,
      );