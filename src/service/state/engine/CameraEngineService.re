let createPerspectiveCamera = engineState => {
  open PerspectiveCameraProjectionEngineService;
  let (engineState, cameraProjection) = create(engineState);
  let engineState =
    engineState
    |> setPerspectiveCameraNear(cameraProjection, 0.1)
    |> setPerspectiveCameraFar(cameraProjection, 1000.)
    |> setPerspectiveCameraFovy(cameraProjection, 60.)
    |> setPerspectiveCameraAspect(cameraProjection, 1.);
  (engineState, cameraProjection);
};

let createCamera = engineState => {
  let (engineState, cameraView) =
    BasicCameraViewEngineService.create(engineState);
  let (engineState, cameraProjection) = createPerspectiveCamera(engineState);
  let (engineState, gameObject) =
    engineState |> GameObjectEngineService.create;
  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("camera", gameObject)
    |> GameObjectComponentEngineService.addBasicCameraViewComponent(
         gameObject,
         cameraView,
       )
    |> GameObjectComponentEngineService.addPerspectiveCameraProjectionComponent(
         gameObject,
         cameraProjection,
       );
  (engineState, gameObject);
};

/* let createCameraBox = (engineState) => {
     let (engineState, cameraView) = BasicCameraViewEngineService.create(engineState);
     let (engineState, cameraProjection) = createPerspectiveCamera(engineState);
     let (engineState, material) = BasicMaterialEngineService.create(engineState);
     let (engineState, meshRenderer) = MeshRendererEngineService.create(engineState);
     let (engineState, geometry) = GeometryEngineService.createBoxGeometry(engineState);
     let (engineState, gameObject) = engineState |> GameObjectEngineService.create;
     let engineState =
       engineState
       |> GeometryEngineService.setBoxGeometryConfigData(
            geometry,
            {
              "width": Js.Nullable.return(1.),
              "height": Js.Nullable.return(1.),
              "depth": Js.Nullable.return(1.),
              "widthSegment": Js.Nullable.undefined,
              "heightSegment": Js.Nullable.undefined,
              "depthSegment": Js.Nullable.undefined
            }
          )
       |> GameObjectComponentEngineService.addBasicMaterialComponent(gameObject, material)
       |> GameObjectComponentEngineService.addMeshRendererComponent(gameObject, meshRenderer)
       |> GameObjectComponentEngineService.addBoxGeometryComponent(gameObject, geometry)
       |> GameObjectComponentEngineService.addBasicCameraViewComponent(gameObject, cameraView)
       |> GameObjectComponentEngineService.addPerspectiveCameraProjectionComponent(
            gameObject,
            cameraProjection
          );
     (engineState, gameObject)
   }; */
let isCamera = GameObjectComponentEngineService.hasBasicCameraViewComponent;