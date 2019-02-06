/* open ShapeType; */
/*
 let _computeTotalAngle = (dragStartPoint, intersectXYPlanePoint, centerPoint) =>
   (
     Vector3Service.dot(
       Wonderjs.Vector3Service.sub(
         Wonderjs.Vector3Type.Float,
         dragStartPoint,
         centerPoint,
       )
       |> Wonderjs.Vector3Service.normalize,
       Wonderjs.Vector3Service.sub(
         Wonderjs.Vector3Type.Float,
         intersectXYPlanePoint,
         centerPoint,
       )
       |> Wonderjs.Vector3Service.normalize,
     )
     |> Js.Math.acos
   )
   *. AngleService.getRadToDeg(); */

let _computeTotalAngle =
    (
      (localDragStartPointX, localDragStartPointY, _),
      (localIntersectXYPlanePointX, localIntersectXYPlanePointY, _),
    ) =>
  Js.Math.atan2(
    ~x=localIntersectXYPlanePointX,
    ~y=localIntersectXYPlanePointY,
    (),
  )
  *. AngleService.getRadToDeg()
  -. Js.Math.atan2(~x=localDragStartPointX, ~y=localDragStartPointY, ())
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

let _rotateCurrentSceneTreeNodeAndWholeRotationGizmo =
    /* ((angle, axis, center), editorState, engineState) => { */
    ((angle, axis), editorState, engineState) =>
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
  |> TransformEngineService.rotateLocalOnLocalAxis(
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
         engineState,
       ),
       (angle, axis),
     )
  |> TransformEngineService.rotateLocalOnLocalAxis(
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
           editorState,
         ),
         engineState,
       ),
       (angle, axis),
     ); /* |> TransformEngineService.rotateAround(
           GameObjectComponentEngineService.unsafeGetTransformComponent(
             SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
             engineState,
           ),
           (angle, axis, center, position),
         ) */

/* |> TransformEngineService.rotateAround(
     GameObjectComponentEngineService.unsafeGetTransformComponent(
       OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
         editorState,
       ),
       engineState,
     ),
     (angle, axis, center, position),
   ); */

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
    {
      let plane =
        CircleRotationGizmosUtils.buildXYPlane(editorState, engineState);

      let (totalAngle, needRotateAngle) =
        switch (RayUtils.checkIntersectPlane(plane, ray)) {
        | None =>
          /* TODO test */
          WonderLog.Log.print("not find intersected point!!! 00000000")
          |> ignore;

          (
            AngleRotationGizmoSceneViewEditorService.getLastTotalAngle(
              editorState,
            ),
            0.,
          );
        | Some(intersectXYPlanePoint) =>
          let localToWorldMatrixTypeArray =
            TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
              SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(
                editorState,
              ),
              engineState,
            );

          let dragStartPoint =
            AngleRotationGizmoSceneViewEditorService.unsafeGetDragStartPoint(
              editorState,
            );

          /* let centerPoint =
             CircleRotationGizmosUtils.getCenterPoint(
               editorState,
               engineState,
             ); */

          let totalAngle =
            _computeTotalAngle(
              CoordinateUtils.convertPosFromWorldToLocalCoordSystem(
                dragStartPoint,
                localToWorldMatrixTypeArray,
                engineState,
              ),
              CoordinateUtils.convertPosFromWorldToLocalCoordSystem(
                intersectXYPlanePoint,
                localToWorldMatrixTypeArray,
                engineState,
              ),
              /* centerPoint, */
            );

          (
            Some(totalAngle),
            _computeNeedRotateAngle(totalAngle, editorState),
          );
        };

      WonderLog.Log.printJson((
        "(totalAngle, needRotateAngle): ",
        (totalAngle, needRotateAngle),
      ))
      |> ignore;

      let editorState =
        editorState
        |> AngleRotationGizmoSceneViewEditorService.setLastTotalAngle(
             totalAngle,
           );

      _rotateCurrentSceneTreeNodeAndWholeRotationGizmo(
        (
          needRotateAngle,
          /* plane.normal, */
          CircleRotationGizmosUtils.getXYPlaneLocalAxis(),
          /* CircleRotationGizmosUtils.getCenterPoint(editorState, engineState), */
        ),
        editorState,
        engineState,
      );

      (editorState, engineState);
    } :
    (editorState, engineState);
};