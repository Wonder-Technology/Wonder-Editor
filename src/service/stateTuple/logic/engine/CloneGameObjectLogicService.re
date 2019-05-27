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
    (
      newGameObject,
      (clonedGameObject, clonedEngineState),
      editorState,
      targetEngineState,
    ) =>
  InspectorRenderGroupUtils.hasRenderGroupComponents(
    clonedGameObject,
    clonedEngineState,
  ) ?
    {
      let (newRenderGroup, addMaterialFunc, editorState, targetEngineState) =
        targetEngineState
        |> CloneRenderGroupEngineLogicService.cloneRenderGroupToOtherEngineState(
             newGameObject,
             (clonedGameObject, clonedEngineState),
             editorState,
           );

      (
        editorState,
        targetEngineState
        |> RenderGroupEngineService.addRenderGroupComponents(
             newGameObject,
             newRenderGroup,
             (
               GameObjectComponentEngineService.addMeshRendererComponent,
               addMaterialFunc,
             ),
           ),
      );
    } :
    (editorState, targetEngineState);

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
    (clonedGameObject, editorState, clonedEngineState, targetEngineState) => {
  let (targetEngineState, newGameObject) =
    GameObjectEngineService.create(targetEngineState);

  let (editorState, targetEngineState) =
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
         editorState,
       );

  let targetEngineState =
    targetEngineState
    |> _cloneGameObjectGeometryIfExist(
         newGameObject,
         (clonedGameObject, clonedEngineState),
       );

  (newGameObject, editorState, targetEngineState);
};