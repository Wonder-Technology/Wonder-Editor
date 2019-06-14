let createPerspectiveCamera = engineState => {
  open PerspectiveCameraProjectionEngineService;
  let (engineState, cameraProjection) = create(engineState);
  let engineState =
    engineState
    |> setPerspectiveCameraNear(0.01, cameraProjection)
    |> setPerspectiveCameraFar(50000., cameraProjection)
    |> setPerspectiveCameraFovy(60., cameraProjection);

  (engineState, cameraProjection);
};

let createCameraGroup = engineState =>
  engineState
  |> CameraGroupEngineService.createCameraGroup((
       BasicCameraViewEngineService.create,
       createPerspectiveCamera,
     ));

let hasCameraGroup = (gameObject, engineState) =>
  engineState
  |> CameraGroupEngineService.hasCameraGroupComponents(
       gameObject,
       (
         GameObjectComponentEngineService.hasBasicCameraViewComponent,
         GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent,
       ),
     );

/* let _bindEventIfInRunMode = (gameObject, lastBasicCameraView, engineState) =>
   StateEditorService.getIsRun() ?
     engineState
     |> ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponent(
          gameObject,
        )
     |> ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
          BasicCameraViewEngineService.getBasicCameraViewGameObject(
            lastBasicCameraView,
            engineState,
          ),
        ) :
     engineState; */

/* let _setLastCameraToBeActiveAndBindEvent =
       (gameObject, targetRemoveBasicCameraView, engineState) => {
     let lastBasicCameraView =
       engineState
       |> GameObjectComponentEngineService.getAllBasicCameraViewComponents
       |> Js.Array.filter(component => component != targetRemoveBasicCameraView)
       |> ArrayService.unsafeGetLast;

     engineState
     |> _bindEventIfInRunMode(gameObject, lastBasicCameraView)
     |> BasicCameraViewEngineService.activeBasicCameraView(lastBasicCameraView);
   };

   let prepareForRemoveCameraGroup = (gameObject, engineState) => {
     let targetRemoveBasicCameraView =
       engineState
       |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
            gameObject,
          );

     BasicCameraViewEngineService.isActiveBasicCameraView(
       targetRemoveBasicCameraView,
       engineState,
     ) ?
       _setLastCameraToBeActiveAndBindEvent(
         gameObject,
         targetRemoveBasicCameraView,
         engineState,
       ) :
       engineState;
   }; */
