let _computeXYPlaneTotalAngle =
    (
      (localDragStartPointX, localDragStartPointY, _),
      (localIntersectPlanePointX, localIntersectPlanePointY, _),
    ) =>
  Js.Math.atan2(
    ~x=localIntersectPlanePointX,
    ~y=localIntersectPlanePointY,
    (),
  )
  *. AngleService.getRadToDeg()
  -. Js.Math.atan2(~x=localDragStartPointX, ~y=localDragStartPointY, ())
  *. AngleService.getRadToDeg();

let _computeXZPlaneTotalAngle =
    (
      (localDragStartPointX, _, localDragStartPointZ),
      (localIntersectPlanePointX, _, localIntersectPlanePointZ),
    ) =>
  Js.Math.atan2(
    ~x=localIntersectPlanePointZ,
    ~y=localIntersectPlanePointX,
    (),
  )
  *. AngleService.getRadToDeg()
  -. Js.Math.atan2(~x=localDragStartPointZ, ~y=localDragStartPointX, ())
  *. AngleService.getRadToDeg();

let _computeYZPlaneTotalAngle =
    (
      (_, localDragStartPointY, localDragStartPointZ),
      (_, localIntersectPlanePointY, localIntersectPlanePointZ),
    ) =>
  Js.Math.atan2(
    ~x=localIntersectPlanePointY,
    ~y=localIntersectPlanePointZ,
    (),
  )
  *. AngleService.getRadToDeg()
  -. Js.Math.atan2(~x=localDragStartPointY, ~y=localDragStartPointZ, ())
  *. AngleService.getRadToDeg();

let _computeNeedRotateAngle = (totalAngle, editorState) =>
  totalAngle
  -. (
    switch (
      AngleRotationGizmoSceneViewEditorService.getLastTotalAngle(editorState)
    ) {
    | None => 0.
    | Some(lastTotalAngle) => lastTotalAngle
    }
  );
/* |> WonderLog.Contract.ensureCheck(
     needRotateAngle =>
       WonderLog.(
         Contract.(
           Operators.(
             test(
               Log.buildAssertMessage(
                 ~expect={j|needRotateAngle >= 0|j},
                 ~actual={j|not|j},
               ),
               () =>
               needRotateAngle |> assertGte(Float, 0.0)
             )
           )
         )
       ),
     StateEditorService.getStateIsDebug(),
   ); */

let _rotateCurrentSceneTreeNode =
    /* ((angle, axis, center), editorState, engineState) => { */
    ((angle, axis), rotateOnAxisFunc, editorState, engineState) =>
  /* WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;

         test(
           Log.buildAssertMessage(
             ~expect=
               {j|rotate around->center should equal current scene tree node->position|j},
             ~actual={j|not|j},
           ),
           () =>
           center
           == InitTransformGizmosUtils.getCurrentSceneTreeNodePosition(
                editorState,
                engineState,
              )
           |> assertTrue
         );
         test(
           Log.buildAssertMessage(
             ~expect=
               {j|rotate around->center should equal rotation whole gizmo->position|j},
             ~actual={j|not|j},
           ),
           () =>
           center
           == TransformGameObjectEngineService.getPosition(
                GameObjectComponentEngineService.unsafeGetTransformComponent(
                  OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
                    editorState,
                  ),
                  engineState,
                ),
                engineState,
              )
           |> assertTrue
         );
       },
       StateEditorService.getStateIsDebug(),
     ); */
  /* let position = center; */
  engineState
  |> rotateOnAxisFunc(
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
         engineState,
       ),
       (angle, axis),
     );

/* |> TransformEngineService.rotateAround(
     GameObjectComponentEngineService.unsafeGetTransformComponent(
       OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
         editorState,
       ),
       engineState,
     ),
     (angle, axis, center, position),
   ); */

let _affectGizmo =
    (
      ray,
      (plane, planeLocalAxis),
      computeTotalAngleFunc,
      editorState,
      engineState,
    ) => {
  let (totalAngle, needRotateAngle) =
    switch (RayUtils.checkIntersectPlane(plane, ray)) {
    | None =>
      /* TODO test */
      WonderLog.Log.print("not find intersected point!!! 00000000") |> ignore;

      (
        AngleRotationGizmoSceneViewEditorService.getLastTotalAngle(
          editorState,
        ),
        0.,
      );
    | Some(intersectPlanePoint) =>
      let localToWorldMatrixTypeArray =
        TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
          OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
            editorState,
          ),
          engineState,
        );

      let dragStartPoint =
        AngleRotationGizmoSceneViewEditorService.unsafeGetDragStartPoint(
          editorState,
        );

      let totalAngle =
        computeTotalAngleFunc(
          CoordinateUtils.convertPosFromWorldToLocalCoordSystem(
            dragStartPoint,
            localToWorldMatrixTypeArray,
            engineState,
          ),
          CoordinateUtils.convertPosFromWorldToLocalCoordSystem(
            intersectPlanePoint,
            localToWorldMatrixTypeArray,
            engineState,
          ),
        );

      (Some(totalAngle), _computeNeedRotateAngle(totalAngle, editorState));
    };

  /* WonderLog.Log.printJson((
       "(totalAngle, needRotateAngle): ",
       (totalAngle, needRotateAngle),
     ))
     |> ignore; */

  let editorState =
    editorState
    |> AngleRotationGizmoSceneViewEditorService.setLastTotalAngle(totalAngle);

  _rotateCurrentSceneTreeNode(
    (needRotateAngle, planeLocalAxis),
    switch (
      CoordinateSystemTransformGizmoSceneViewEditorService.getCoordinateSystem(
        editorState,
      )
    ) {
    | World => TransformEngineService.rotateWorldOnAxis
    | Local => TransformEngineService.rotateLocalOnAxis
    },
    editorState,
    engineState,
  );

  (editorState, engineState);
};

let affectRotationGizmo = (event, (editorState, engineState)) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  SelectRotationGizmoSceneViewEditorService.isXYCircleGizmoSelected(
    editorState,
  ) ?
    _affectGizmo(
      ray,
      (
        CircleRotationGizmosUtils.buildXYPlane(editorState, engineState),
        CircleRotationGizmosUtils.getXYPlaneLocalAxis(),
      ),
      _computeXYPlaneTotalAngle,
      editorState,
      engineState,
    ) :
    SelectRotationGizmoSceneViewEditorService.isXZCircleGizmoSelected(
      editorState,
    ) ?
      _affectGizmo(
        ray,
        (
          CircleRotationGizmosUtils.buildXZPlane(editorState, engineState),
          CircleRotationGizmosUtils.getXZPlaneLocalAxis(),
        ),
        _computeXZPlaneTotalAngle,
        editorState,
        engineState,
      ) :
      SelectRotationGizmoSceneViewEditorService.isYZCircleGizmoSelected(
        editorState,
      ) ?
        _affectGizmo(
          ray,
          (
            CircleRotationGizmosUtils.buildYZPlane(editorState, engineState),
            CircleRotationGizmosUtils.getYZPlaneLocalAxis(),
          ),
          _computeYZPlaneTotalAngle,
          editorState,
          engineState,
        ) :
        (editorState, engineState);
};