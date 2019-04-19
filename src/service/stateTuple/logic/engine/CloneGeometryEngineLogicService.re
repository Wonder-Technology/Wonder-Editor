let cloneGeometryToOtherEngineState =
    (
      targetGameObject,
      (clonedGameObject, clonedEngineState),
      targetEngineState,
    ) => {
  let clonedGameObjectGeometry =
    clonedEngineState
    |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
         clonedGameObject,
       );

  let (targetEngineState, newGeometry) =
    GeometryEngineService.create(targetEngineState);

  targetEngineState
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       GeometryEngineService.unsafeGetGeometryVertices,
       GeometryEngineService.setGeometryVertices,
       newGeometry,
       (clonedGameObjectGeometry, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       GeometryEngineService.unsafeGetGeometryNormals,
       GeometryEngineService.setGeometryNormals,
       newGeometry,
       (clonedGameObjectGeometry, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       GeometryEngineService.unsafeGetGeometryTexCoords,
       GeometryEngineService.setGeometryTexCoords,
       newGeometry,
       (clonedGameObjectGeometry, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetOptionValueFunc(
       GeometryEngineService.getGeometryIndices16,
       GeometryEngineService.setGeometryIndices16,
       newGeometry,
       (clonedGameObjectGeometry, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetOptionValueFunc(
       GeometryEngineService.getGeometryIndices32,
       GeometryEngineService.setGeometryIndices32,
       newGeometry,
       (clonedGameObjectGeometry, clonedEngineState),
     );

  (newGeometry, targetEngineState);
};