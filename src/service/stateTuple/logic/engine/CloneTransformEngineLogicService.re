let cloneTransformToOtherEngineState =
    (
      targetGameObjectTransform,
      (clonedGameObjectTransform, clonedEngineState),
      targetEngineState,
    ) =>
  targetEngineState
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       TransformEngineService.getLocalPosition,
       TransformEngineService.setLocalPosition,
       targetGameObjectTransform,
       (clonedGameObjectTransform, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       TransformEngineService.getLocalRotation,
       TransformEngineService.setLocalRotation,
       targetGameObjectTransform,
       (clonedGameObjectTransform, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       TransformEngineService.getLocalScale,
       TransformEngineService.setLocalScale,
       targetGameObjectTransform,
       (clonedGameObjectTransform, clonedEngineState),
     );