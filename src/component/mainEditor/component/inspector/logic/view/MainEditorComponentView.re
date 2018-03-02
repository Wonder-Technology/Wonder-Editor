let addComponentByType = (type_, currentGameObject, stateTuple) =>
  switch type_ {
  | sourceInstance =>
    let (sourceInstanceComponent, newStateTuple) =
      stateTuple |> MainEditorComponentBuss.createSourceInstanceComponent;
    newStateTuple
    |> MainEditorGameObjectBuss.addSourceInstanceComponent(
         currentGameObject,
         sourceInstanceComponent
       )
  };