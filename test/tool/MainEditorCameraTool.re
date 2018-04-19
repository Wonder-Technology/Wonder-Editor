open Wonderjs;

let getCurrentCameraGameObject = (engineState) => SceneAPI.getCurrentCameraGameObject(engineState);

let getCurrentCameraProjection = (engineState) =>
  engineState
  |> GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
       getCurrentCameraGameObject(engineState) |> Js.Option.getExn
     );