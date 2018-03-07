let addComponentByType = (type_, currentGameObject, stateTuple) =>
  switch type_ {
  | "sourceInstance" =>
    let (sourceInstanceComponent, newStateTuple) =
      stateTuple |> MainEditorComponentBuss.createSourceInstanceComponent;
    newStateTuple
    |> GameObjectFacade.addSourceInstanceComponent(
         currentGameObject,
         sourceInstanceComponent
       )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addComponentByType",
        ~description={j|the type:$type_ is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|type:$type_ , currentGameObject:$currentGameObject|j}
      )
    )
  };