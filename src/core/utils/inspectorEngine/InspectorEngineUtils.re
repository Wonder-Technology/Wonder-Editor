let removeInspectorEngineSceneAllChildren = inspectorEngineState =>
  inspectorEngineState
  |> SceneEngineService.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial
  |> JobEngineService.execDisposeJob
  |> ReallocateCPUMemoryJob.reallocate(0.1)
  |> StateLogicService.refreshInspectorEngineState
  |> ignore;