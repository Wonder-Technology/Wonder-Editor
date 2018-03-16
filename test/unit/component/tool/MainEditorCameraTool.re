open Wonderjs;

let getCurrentCameraGameObject = (engintState) =>
  SceneAPI.getCurrentCameraGameObject(engintState) |> Js.Option.getExn;

let getCurrentCameraProjection = (engintState) =>
  SceneAPI.getCurrentCameraGameObject(engintState)
  |> Js.Option.getExn
  |> GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent;