let _setArcballCameraControllerFocusRelatedAttribute =
    (arcballCameraController, (distance, target), engineState) =>
  engineState
  |> ArcballCameraEngineService.setArcballCameraControllerTarget(
       arcballCameraController,
       target,
     )
  |> ArcballCameraEngineService.setArcballCameraControllerDistance(
       distance,
       arcballCameraController,
     );

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

let _getFixedDistance = () => 3.;

let _calcCenterAndDistance = (targetGameObject, engineState) =>
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

    (center, AABBShapeUtils.calcRadiusOfAABB(aabb, center) *. 2.5);
  };

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

  let (center, distance) =
    engineState |> _calcCenterAndDistance(targetGameObject);

  _setArcballCameraControllerFocusRelatedAttribute(
    editorCameraArcballControllerComponent,
    (distance, center),
    engineState,
  );
};