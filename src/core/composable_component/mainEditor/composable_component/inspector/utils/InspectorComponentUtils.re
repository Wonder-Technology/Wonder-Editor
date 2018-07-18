let addComponentByType = (type_, currentSceneTreeNode, engineState) =>
  switch type_ {
  | "sourceInstance" =>
    let (engineState, sourceInstanceComponent) = engineState |> SourceInstanceEngineService.create;
    engineState
    |> GameObjectComponentEngineService.addSourceInstanceComponent(
         currentSceneTreeNode,
         sourceInstanceComponent
       )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addComponentByType",
        ~description={j|the type:$type_ is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|type:$type_ , currentSceneTreeNode:$currentSceneTreeNode|j}
      )
    )
  };