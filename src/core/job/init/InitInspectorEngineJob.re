open Wonderjs;
open CameraGroupType;

let _prepareCamera = inspectorEngineState => {
  let (inspectorEngineState, camera) =
    GameObjectEngineService.create(inspectorEngineState);
  let (
    inspectorEngineState,
    {cameraView, cameraProjection} as cameraComponentRecord,
  ) =
    CameraEngineService.createCameraGroup(inspectorEngineState);

  let inspectorEngineState =
    inspectorEngineState
    |> CameraGroupEngineService.addCameraGroupComponents(
         camera,
         cameraComponentRecord,
         (
           GameObjectComponentEngineService.addBasicCameraViewComponent,
           GameObjectComponentEngineService.addPerspectiveCameraProjectionComponent,
         ),
       );

  let (inspectorEngineState, arcballCameraController) =
    ArcballCameraEngineService.create(inspectorEngineState);

  let inspectorEngineState =
    inspectorEngineState
    |> ArcballCameraEngineService.setArcballCameraControllerDistance(
         2.,
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

  (inspectorEngineState, camera);
};

let _createSphere = inspectorEngineState => {
  let (inspectorEngineState, sphereGeometry) =
    GeometryEngineService.createSphereGeometry(0.5, 28, inspectorEngineState);
  let (engineState, lightMaterial) =
    LightMaterialEngineService.create(inspectorEngineState);

  let (inspectorEngineState, gameObject) =
    GameObjectEngineService.create(inspectorEngineState);

  let (inspectorEngineState, meshRenderer) =
    MeshRendererEngineService.create(inspectorEngineState);
  let renderGroup =
    RenderGroupEngineService.buildRenderGroup(meshRenderer, lightMaterial);

  inspectorEngineState
  |> RenderGroupEngineService.addRenderGroupComponents(
       gameObject,
       renderGroup,
       (
         GameObjectAPI.addGameObjectMeshRendererComponent,
         GameObjectAPI.addGameObjectLightMaterialComponent,
       ),
     )
  |> GameObjectComponentEngineService.addGeometryComponent(
       gameObject,
       sphereGeometry,
     );

  (inspectorEngineState, gameObject);
};

let initInspectorEngineJob = (_, inspectorEngineState) => {
  let (inspectorEngineState, camera) = _prepareCamera(inspectorEngineState);
  let (inspectorEngineState, sphere) = _createSphere(inspectorEngineState);

  inspectorEngineState
  |> SceneEngineService.addSceneChild(camera)
  |> SceneEngineService.addSceneChild(sphere);

  inspectorEngineState;
};