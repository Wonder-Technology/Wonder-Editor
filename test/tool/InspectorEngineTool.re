let getSceneCameras = engineState =>
  engineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(
       engineState |> SceneEngineService.getSceneGameObject,
     )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     );

let unsafeGetSceneFirstCamera = engineState =>
  getSceneCameras(engineState) |> ArrayService.unsafeGetFirst;

let getSceneDirectionLights = engineState =>
  engineState
  |> HierarchyGameObjectEngineService.getChildren(
       engineState |> SceneEngineService.getSceneGameObject,
     )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasDirectionLightComponent(
         gameObject,
         engineState,
       )
     );

let getSceneAllChild = engineState =>
  engineState
  |> HierarchyGameObjectEngineService.getChildren(
       engineState |> SceneEngineService.getSceneGameObject,
     );

let getSceneEmptyGameObject = engineState =>
  engineState |> getSceneAllChild |> ArrayService.unsafeGetLast;