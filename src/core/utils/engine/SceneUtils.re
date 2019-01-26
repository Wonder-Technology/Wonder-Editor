let initGameObjectAndAddToParent = (parent, child, engineState) =>
  engineState
  |> GameObjectEngineService.initGameObject(child)
  |> HierarchyGameObjectEngineService.addChild(parent, child)
  |> DirectorEngineService.loopBody(0.);

let doesSceneHasRemoveableCamera = () =>
  GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length > 1;

let isSceneHaveNoActiveCamera = () =>
  SceneEngineService.getSceneActiveBasicCameraView
  |> StateLogicService.getEngineStateToGetData
  |> Js.Option.isNone;