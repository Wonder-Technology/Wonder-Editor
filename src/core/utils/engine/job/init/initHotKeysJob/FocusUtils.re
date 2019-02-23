let _setArcballCameraControllerFocusRelatedAttribute =
    (arcballCameraController, (distance, target), engineState) => {
  Js.log(distance);

  engineState
  |> ArcballCameraEngineService.setArcballCameraControllerTarget(
       arcballCameraController,
       target,
     )
  |> ArcballCameraEngineService.setArcballCameraControllerDistance(
       distance,
       arcballCameraController,
     );
};

let _getTargetGameObjectMaxScale = (targetGameObjectTransform, engineState) => {
  let (scaleX, scaleY, scaleZ) =
    engineState |> TransformEngineService.getScale(targetGameObjectTransform);

  Js.Math.max_float(scaleX, scaleY) |> Js.Math.max_float(scaleZ);
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
         engineState |> GeometryEngineService.getGeometryVertices(geometry),
         engineState
         |> TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
              gameObject,
            ),
       );
     });

let _calcGeometrySphereCenterAndRadius = (targetGameObject, engineState) => {
  let aabb =
    AABBShapeUtils.setFromAllPointsAndLocalToWolrdMatrices(
      _buildAllPointsAndLocalToWolrdMatrices(targetGameObject, engineState),
    );
  let center = AABBShapeUtils.getCenter(aabb);

  (center, AABBShapeUtils.calcRadiusOfAABB(aabb, center));
};

let _calcArcballCameraControllerDistance =
    (distance, targetGameObjectTransform, engineState) =>
  _getTargetGameObjectMaxScale(targetGameObjectTransform, engineState)
  *. distance
  *. 2.5;

let setEditorCameraFocusTargetGameObject =
    (editCamera, targetGameObject, editorState, engineState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|the editor camera should has arcballCameraController component|j},
                ~actual={j|not|j},
              ),
              () =>
              GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                editCamera,
                engineState,
              )
              |> assertTrue
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  let editorCameraArcballControllerComponent =
    GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
      editCamera,
      engineState,
    );
  let targetGameObjectTransform =
    engineState
    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
         targetGameObject,
       );

  let (center, radius) =
    engineState |> _calcGeometrySphereCenterAndRadius(targetGameObject);

  _setArcballCameraControllerFocusRelatedAttribute(
    editorCameraArcballControllerComponent,
    (
      engineState
      |> _calcArcballCameraControllerDistance(
           radius,
           targetGameObjectTransform,
         ),
      center,
    ),
    engineState,
  );
};