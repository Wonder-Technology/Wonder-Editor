open Wonderjs;

let getCurrentCameraController = (engintState) =>
  CameraControllerSystem.getCurrentCameraController(engintState) |> Js.Option.getExn;