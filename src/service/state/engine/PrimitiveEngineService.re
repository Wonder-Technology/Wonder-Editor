open Wonderjs;

open CameraGroupType;

let createCamera = engineState => {
  let (engineState, camera) = GameObjectEngineService.create(engineState);
  let (engineState, {cameraView, cameraProjection} as cameraComponentRecord) =
    CameraEngineService.createCameraGroup(engineState);

  let engineState =
    engineState
    |> CameraGroupEngineService.addCameraGroupComponents(
         camera,
         cameraComponentRecord,
         (
           GameObjectComponentEngineService.addBasicCameraViewComponent,
           GameObjectComponentEngineService.addPerspectiveCameraProjectionComponent,
         ),
       );

  (engineState, camera);
};

let createSphere = (material, addMaterialFunc, engineState) => {
  let (engineState, sphereGeometry) =
    GeometryEngineService.createSphereGeometry(0.5, 28, engineState);

  let (engineState, gameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);
  let renderGroup =
    RenderGroupEngineService.buildRenderGroup(meshRenderer, material);

  let engineState =
    engineState
    |> RenderGroupEngineService.addRenderGroupComponents(
         gameObject,
         renderGroup,
         (
           GameObjectComponentEngineService.addMeshRendererComponent,
           addMaterialFunc,
         ),
       )
    |> GameObjectComponentEngineService.addGeometryComponent(
         gameObject,
         sphereGeometry,
       );

  (engineState, gameObject);
};

let createDirectionLight = engineState => {
  let (engineState, gameObject) =
    GameObjectEngineService.create(engineState);
  let (engineState, directionLight) =
    DirectionLightEngineService.create(engineState);

  let engineState =
    engineState
    |> GameObjectComponentEngineService.addDirectionLightComponent(
         gameObject,
         directionLight,
       );

  (engineState, gameObject);
};