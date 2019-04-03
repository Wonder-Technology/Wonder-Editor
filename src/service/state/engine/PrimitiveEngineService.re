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

  let (engineState, arcballCameraController) =
    ArcballCameraEngineService.create(engineState);

  let engineState =
    engineState
    |> ArcballCameraEngineService.setArcballCameraControllerDistance(
         1.1,
         arcballCameraController,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerWheelSpeed(
         arcballCameraController,
         0.5,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedX(
         arcballCameraController,
         1.,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedY(
         arcballCameraController,
         1.,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerTheta(
         arcballCameraController,
         Js.Math._PI /. 5.,
       )
    |> BasicCameraViewEngineService.activeBasicCameraView(cameraView)
    |> GameObjectComponentEngineService.addArcballCameraControllerComponent(
         camera,
         arcballCameraController,
       );

  (engineState, camera);
};

let createSphereTest = engineState => {
  let (engineState, sphereGeometry) =
    GeometryEngineService.createSphereGeometry(0.5, 28, engineState);
  let (engineState, gameObject) =
    GameObjectEngineService.create(engineState);
  let (inspectorEngineState, material) =
    LightMaterialEngineService.create(engineState);
  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);
  let renderGroup =
    RenderGroupEngineService.buildRenderGroup(meshRenderer, material);

  engineState
  |> RenderGroupEngineService.addRenderGroupComponents(
       gameObject,
       renderGroup,
       (
         GameObjectComponentEngineService.addMeshRendererComponent,
         GameObjectComponentEngineService.addLightMaterialComponent,
       ),
     )
  |> GameObjectComponentEngineService.addGeometryComponent(
       gameObject,
       sphereGeometry,
     );

  (engineState, gameObject);
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

  engineState
  |> GameObjectComponentEngineService.addDirectionLightComponent(
       gameObject,
       directionLight,
     )
  |> TransformEngineService.setLocalPosition(
       (3., 4., 1.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         gameObject,
         engineState,
       ),
     )
  |> TransformEngineService.setTransformLocalEulerAngles(
       (75., 65., -60.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         gameObject,
         engineState,
       ),
     );

  (engineState, gameObject);
};