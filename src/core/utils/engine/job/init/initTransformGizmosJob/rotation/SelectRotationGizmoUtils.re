/* open EditorType;

   open SceneViewType; */

let _getCenterPoint = (editorState, engineState) =>
  InitTransformGizmosUtils.getCurrentSceneTreeNodePosition(
    editorState,
    engineState,
  );
/* TransformEngineService.getPosition(
     GameObjectComponentEngineService.unsafeGetTransformComponent(
       SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
       engineState,
     ),
     engineState,
   ); */

let _isSelectCircleNotVisiblePart =
    (intersectPointInCircle, cameraPosInLocalCoordSystem) =>
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
  >= 0.0;

let _isSelectCircle = (intersectXYPlanePoint, editorState, engineState) =>
  switch (intersectXYPlanePoint) {
  | None => false
  | Some(intersectPoint) =>
    _isSelectCircleNotVisiblePart(
      intersectPoint,
      CameraPosUtils.getCameraPosInLocalCoordSystem(
        CameraPosUtils.getCameraPos(editorState, engineState),
        TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
          SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
          engineState,
        ),
        engineState,
      ),
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
              _getCenterPoint(editorState, engineState),
            ),
          );

        lengthToCenter <= radius
        *. (1. +. expandFactor)
        && lengthToCenter >= radius
        *. (1. -. expandFactor);
      }
  };

let _buildPlane =
    (initialDirectionVector, centerPoint, editorState, engineState) =>
  PlaneShapeUtils.setFromNormalAndCoplanarPoint(
    Wonderjs.Vector3Service.transformMat4Tuple(
      initialDirectionVector,
      TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
        engineState,
      ),
    )
    |> Wonderjs.Vector3Service.normalize,
    centerPoint,
  );

let _buildXYPlane = (editorState, engineState) =>
  _buildPlane(
    (0., 0., 1.),
    _getCenterPoint(editorState, engineState),
    editorState,
    engineState,
  );

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
      _buildXYPlane(editorState, engineState),
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