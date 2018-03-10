let addComponentByType = (type_, currentGameObject, engineState) =>
  switch type_ {
  | "sourceInstance" =>
    let (engineState, sourceInstanceComponent) = engineState |> SourceInstanceEngineService.create;
    engineState
    |> GameObjectComponentEngineService.addSourceInstanceComponent(
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