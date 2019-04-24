let getAllClonedGameObjectArr = clonedGameObjectArr =>
  clonedGameObjectArr |> WonderCommonlib.ArrayService.flatten;

let getClonedGameObject = clonedGameObjectArr =>
  clonedGameObjectArr
  |> WonderCommonlib.ArrayService.flatten
  |> ArrayService.unsafeGetFirst;

let _cloneGameObjectTransform =
    (newGameObject, (clonedGameObject, clonedEngineState), targetEngineState) => {
  let clonedGameObjectTransform =
    clonedEngineState
    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
         clonedGameObject,
       );
  let targetGameObjectTransform =
    targetEngineState
    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
         newGameObject,
       );

  targetEngineState
  |> CloneTransformEngineLogicService.cloneTransformToOtherEngineState(
       targetGameObjectTransform,
       (clonedGameObjectTransform, clonedEngineState),
     );
};

let _cloneGameObjectRenderGroupIfExist =
    (newGameObject, (clonedGameObject, clonedEngineState), targetEngineState) =>
  InspectorRenderGroupUtils.hasRenderGroupComponents(
    clonedGameObject,
    clonedEngineState,
  ) ?
    {
      let (newRenderGroup, addMaterialFunc, targetEngineState) =
        targetEngineState
        |> CloneRenderGroupEngineLogicService.cloneRenderGroupToOtherEngineState(
             newGameObject,
             (clonedGameObject, clonedEngineState),
           );

      targetEngineState
      |> RenderGroupEngineService.addRenderGroupComponents(
           newGameObject,
           newRenderGroup,
           (
             GameObjectComponentEngineService.addMeshRendererComponent,
             addMaterialFunc,
           ),
         );
    } :
    targetEngineState;

let _cloneGameObjectGeometryIfExist =
    (newGameObject, (clonedGameObject, clonedEngineState), targetEngineState) =>
  clonedEngineState
  |> GameObjectComponentEngineService.hasGeometryComponent(clonedGameObject) ?
    {
      let (newGeometry, targetEngineState) =
        targetEngineState
        |> CloneGeometryEngineLogicService.cloneGeometryToOtherEngineState(
             newGameObject,
             (clonedGameObject, clonedEngineState),
           );

      targetEngineState
      |> GameObjectComponentEngineService.addGeometryComponent(
           newGameObject,
           newGeometry,
         );
    } :
    targetEngineState;

let cloneGameObjectToOtherEngineState =
    (clonedGameObject, clonedEngineState, targetEngineState) => {
  let (targetEngineState, newGameObject) =
    GameObjectEngineService.create(targetEngineState);

  let targetEngineState =
    targetEngineState
    |> CloneValueEngineLogicService.cloneValueByGetOptionValueFunc(
         GameObjectEngineService.getGameObjectName,
         GameObjectEngineService.setGameObjectName,
         newGameObject,
         (clonedGameObject, clonedEngineState),
       )
    |> _cloneGameObjectTransform(
         newGameObject,
         (clonedGameObject, clonedEngineState),
       )
    |> _cloneGameObjectRenderGroupIfExist(
         newGameObject,
         (clonedGameObject, clonedEngineState),
       )
    |> _cloneGameObjectGeometryIfExist(
         newGameObject,
         (clonedGameObject, clonedEngineState),
       );

  (newGameObject, targetEngineState);
};