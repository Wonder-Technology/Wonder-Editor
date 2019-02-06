/* open EditorType;

   open SceneViewType; */

/* TransformEngineService.getPosition(
     GameObjectComponentEngineService.unsafeGetTransformComponent(
       SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
       engineState,
     ),
     engineState,
   ); */

/* let _isSelectCircleNotVisiblePart =
     (intersectPointInCircle,  cameraPosInLocalCoordSystem) =>
   Vector3Service.dot(
     Wonderjs.Vector3Service.normalize(
       Wonderjs.Vector3Service.sub(
         Wonderjs.Vector3Type.Float,
         (0., 0., 0.),
         intersectPointInCircle,
       ),
     ),
     Wonderjs.Vector3Service.sub(
       Wonderjs.Vector3Type.Float,
       cameraPosInLocalCoordSystem,
       intersectPointInCircle,
     ),
   )
   >= 0.0; */

let _isSelectCircleNotVisiblePart =
    (intersectPointInCircle, centerPoint, cameraPos) =>
  Vector3Service.dot(
    Wonderjs.Vector3Service.normalize(
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        centerPoint,
        intersectPointInCircle,
      ),
    ),
    Wonderjs.Vector3Service.sub(
      Wonderjs.Vector3Type.Float,
      cameraPos,
      intersectPointInCircle,
    ),
  )
  >= 0.0;

let _isSelectCircle = (intersectXYPlanePoint, editorState, engineState) =>
  switch (intersectXYPlanePoint) {
  | None => false
  | Some(intersectPoint) =>
    _isSelectCircleNotVisiblePart(
      intersectPoint,
      CircleRotationGizmosUtils.getCenterPoint(editorState, engineState),
      /* CameraPosUtils.getCameraPosInLocalCoordSystem(
           CameraPosUtils.getCameraPos(editorState, engineState),
           TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
             SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
             engineState,
           ),
           engineState,
         ), */
      CameraPosUtils.getCameraPos(editorState, engineState),
    ) ?
      false :
      {
        let expandFactor = 0.2;
        let radius =
          DataRotationGizmoSceneViewEditorService.getRadius()
          *. ComputeTransformGizmoScaleUtils.getScaleFactor(
               editorState,
               engineState,
             );

        let lengthToCenter =
          Vector3Service.length(
            Wonderjs.Vector3Service.sub(
              Wonderjs.Vector3Type.Float,
              intersectPoint,
              CircleRotationGizmosUtils.getCenterPoint(
                editorState,
                engineState,
              ),
            ),
          );

        lengthToCenter <= radius
        *. (1. +. expandFactor)
        && lengthToCenter >= radius
        *. (1. -. expandFactor);
      }
  };

let _selectXYCircle = (intersectXYPlanePoint, editorState, engineState) =>
  editorState
  |> SelectRotationGizmoSceneViewEditorService.onlySelectXYCircleGizmo
  |> AngleRotationGizmoSceneViewEditorService.setDragStartPoint(
       intersectXYPlanePoint,
     );

let selectRotationGizmo = (event, engineState, editorState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  let intersectXYPlanePoint =
    RayUtils.checkIntersectPlane(
      CircleRotationGizmosUtils.buildXYPlane(editorState, engineState),
      ray,
    );

  _isSelectCircle(intersectXYPlanePoint, editorState, engineState) ?
    {
      WonderLog.Log.print("select xy plane") |> ignore;

      _selectXYCircle(
        intersectXYPlanePoint |> OptionService.unsafeGet,
        editorState,
        engineState,
      );
    } :
    {
      WonderLog.Log.print("not select xy plane") |> ignore;

      editorState;
    };
  /* _handleSelectPlaneGizmo(
       ray,
       _handleSelectAxisGizmo,
       editorState,
       engineState,
     ); */
};