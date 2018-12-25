let getWidget = () => EditorType.SceneTree;

let isWidget = startWidget =>
  switch (startWidget) {
  | None => false
  | Some(startWidget) => startWidget === getWidget()
  };

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

let _isTargetGameObjectBeRemovedGameObjectParent =
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
  | None => Fail(None)
  | Some(transformParent) =>
    transformParent
    === GameObjectComponentEngineService.unsafeGetTransformComponent(
          targetGameObject,
          engineState,
        ) ?
      Success() : Fail(None)
  };

let isGameObjectRelationError =
    (targetGameObject, dragedGameObject, (_editorState, engineState))
    : Result.RelationResult.t =>
  targetGameObject === dragedGameObject ?
    Success() :
    _isDragedGameObjectBeTargetGameObjectParent(
      targetGameObject,
      dragedGameObject,
      engineState,
    ) ?
      Success() :
      _isTargetGameObjectBeRemovedGameObjectParent(
        dragedGameObject,
        targetGameObject,
        engineState,
      );