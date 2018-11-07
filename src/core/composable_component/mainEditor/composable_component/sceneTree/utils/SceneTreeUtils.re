let getWidget = () => EditorType.SceneTree;

let isWidget = startWidget =>
  switch (startWidget) {
  | None => false
  | Some(startWidget) => startWidget === getWidget()
  };

let _isDragedGameObjectBeTargetGameObjectParent =
    (targetGameObject, dragedGameObject, engineState) => {
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
};

let _isTargetGameObjectBeRemovedGameObjectParent =
    (dragedGameObject, targetGameObject, engineState) =>
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
  | None => false
  | Some(transformParent) =>
    transformParent
    === GameObjectComponentEngineService.unsafeGetTransformComponent(
          targetGameObject,
          engineState,
        ) ?
      true : false
  };

let isGameObjectRelationError =
    (targetGameObject, dragedGameObject, (_editorState, engineState)) =>
  targetGameObject === dragedGameObject ?
    true :
    _isDragedGameObjectBeTargetGameObjectParent(
      targetGameObject,
      dragedGameObject,
      engineState,
    ) ?
      true :
      _isTargetGameObjectBeRemovedGameObjectParent(
        dragedGameObject,
        targetGameObject,
        engineState,
      );
