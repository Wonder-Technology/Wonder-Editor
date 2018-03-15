open Wonderjs;

let hasMaterialComponent = GameObject.hasGameObjectMaterialComponent;

let getMaterialComponent = GameObject.getGameObjectMaterialComponent;

let addMeshRendererComponent = GameObject.addGameObjectMeshRendererComponent;

let addMaterialComponent = GameObject.addGameObjectMaterialComponent;

let addGeometryComponent = GameObject.addGameObjectGeometryComponent;

let addCameraControllerComponent = GameObject.addGameObjectCameraControllerComponent;

let hasCameraControllerComponent = GameObject.hasGameObjectCameraControllerComponent;

let getCameraControllerComponent = GameObject.getGameObjectCameraControllerComponent;

let getTransformComponent = GameObject.getGameObjectTransformComponent;

let hasTransformComponent = GameObject.hasGameObjectTransformComponent;

let getGeometryComponent = GameObject.getGameObjectGeometryComponent;

let hasGeometryComponent = GameObject.hasGameObjectGeometryComponent;

let getSourceInstanceComponent = (gameObject, engineState) =>
  engineState |> GameObject.getGameObjectSourceInstanceComponent(gameObject) |> Js.Option.getExn;

let hasSourceInstanceComponent = GameObject.hasGameObjectSourceInstanceComponent;

let addSourceInstanceComponent = GameObject.addGameObjectSourceInstanceComponent;

let hasMeshRendererComponent = GameObject.hasGameObjectMeshRendererComponent;