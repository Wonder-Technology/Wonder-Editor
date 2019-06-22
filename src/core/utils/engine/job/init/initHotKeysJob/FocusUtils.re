open Wonderjs;

let _getFixedDistance = () => 3.;

let _calcPosition = (transform, (target, distance), engineState) =>
  engineState
  |> TransformEngineService.getLocalToWorldMatrixTypeArray(transform)
  |> Wonderjs.Matrix4Service.setTranslation(target)
  |> Vector3Service.transformMat4Tuple((0., 0., distance));

let _setFlyCameraControllerFocusRelatedAttribute =
    (camera, (distance, (posX, posY, posZ) as centerPosition), engineState) => {
  let cameraTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      camera,
      engineState,
    );

  engineState
  |> _calcPosition(cameraTransform, (centerPosition, distance))
  |> TransformEngineService.setLocalPosition(_, cameraTransform, engineState);
};

let _buildAllPointsAndLocalToWolrdMatrices = (targetGameObject, engineState) =>
  engineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(targetGameObject)
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasGeometryComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.map(gameObject => {
       let geometry =
         engineState
         |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
              gameObject,
            );

       (
         engineState
         |> GeometryEngineService.unsafeGetGeometryVertices(geometry),
         engineState
         |> TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
              gameObject,
            ),
       );
     });

let _calcCenterAndDistance = (targetGameObject, radiusRatio, engineState) =>
  switch (
    _buildAllPointsAndLocalToWolrdMatrices(targetGameObject, engineState)
  ) {
  | allPointsAndLocalToWolrdMatrices
      when Js.Array.length(allPointsAndLocalToWolrdMatrices) === 0 => (
      TransformGameObjectEngineService.getPosition(
        targetGameObject,
        engineState,
      ),
      _getFixedDistance(),
    )
  | allPointsAndLocalToWolrdMatrices =>
    let aabb =
      AABBShapeUtils.setFromAllPointsAndLocalToWolrdMatrices(
        _buildAllPointsAndLocalToWolrdMatrices(targetGameObject, engineState),
      );

    let center = AABBShapeUtils.getCenter(aabb);

    (center, AABBShapeUtils.calcRadiusOfAABB(aabb, center) *. radiusRatio);
  };

let setCameraFocusTargetGameObject =
    (camera, targetGameObject, radiusRatio, engineState) => {
  let (center, distance) =
    engineState |> _calcCenterAndDistance(targetGameObject, radiusRatio);

  switch (CameraControllerUtils.getCameraControllerType(camera, engineState)) {
  | Some(FlyCameraController) =>
    engineState
    |> _setFlyCameraControllerFocusRelatedAttribute(
         camera,
         (distance, center),
       )
  | Some(ArcballCameraController) =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="setCameraFocusTargetGameObject",
        ~description=
          {j|the editCamera shouldn't has arcballCameraController|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    );

    engineState;
  | None => engineState
  };
};