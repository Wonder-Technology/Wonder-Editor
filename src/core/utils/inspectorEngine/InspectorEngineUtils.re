let removeInspectorEngineSceneAllChildren = inspectorEngineState =>
  inspectorEngineState
  |> SceneEngineService.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial
  |> JobEngineService.execDisposeJob
  |> StateLogicService.refreshInspectorEngineState
  |> ignore;