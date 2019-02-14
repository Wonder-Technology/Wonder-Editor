let _getIntersectPointWithPlane = (plane, ray, (editorState, engineState)) =>
  RayUtils.checkIntersectPlane(plane, ray);

let _computeCurrentSceneTreeNodeNewPositionForMoveAxis =
    (
      ray,
      axisVec,
      findMostOrthogonalPlaneForAxisFunc,
      (editorState, engineState),
    ) => {
  let plane =
    findMostOrthogonalPlaneForAxisFunc(ray, (editorState, engineState));

  switch (
    _getIntersectPointWithPlane(plane, ray, (editorState, engineState))
  ) {
  | None => None
  | Some(point) =>
    let axisGameObjectStartPoint =
      MoveTranslationGizmoSceneViewEditorService.unsafeAxisGizmoStartPoint(
        editorState,
      );

    Wonderjs.Vector3Service.add(
      Wonderjs.Vector3Type.Float,
      axisGameObjectStartPoint,
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        PointService.projectPointToLine(
          point,
          axisGameObjectStartPoint,
          axisVec,
        ),
        MoveTranslationGizmoSceneViewEditorService.unsafeGetDragStartPoint(
          editorState,
        ),
      ),
    )
    |. Some;
  };
};

let _computeCurrentSceneTreeNodeNewPositionForMoveXAxis =
    (ray, (editorState, engineState)) =>
  _computeCurrentSceneTreeNodeNewPositionForMoveAxis(
    ray,
    AxisTranslationGizmoSceneViewEditorService.getXAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectTranslationUtils.findMostOrthogonalPlaneForXAxis,
    (editorState, engineState),
  );

let _computeCurrentSceneTreeNodeNewPositionForMoveYAxis =
    (ray, (editorState, engineState)) =>
  _computeCurrentSceneTreeNodeNewPositionForMoveAxis(
    ray,
    AxisTranslationGizmoSceneViewEditorService.getYAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectTranslationUtils.findMostOrthogonalPlaneForYAxis,
    (editorState, engineState),
  );

let _computeCurrentSceneTreeNodeNewPositionForMoveZAxis =
    (ray, (editorState, engineState)) =>
  _computeCurrentSceneTreeNodeNewPositionForMoveAxis(
    ray,
    AxisTranslationGizmoSceneViewEditorService.getZAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectTranslationUtils.findMostOrthogonalPlaneForZAxis,
    (editorState, engineState),
  );

let _computeCurrentSceneTreeNodeNewPositionForMovePlane =
    (ray, plane, (editorState, engineState)) =>
  switch (
    _getIntersectPointWithPlane(plane, ray, (editorState, engineState))
  ) {
  | None => None
  | Some(point) =>
    let currentSceneTreeNodeStartPoint =
      OperateTranslationGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartPoint(
        editorState,
      );

    Wonderjs.Vector3Service.add(
      Wonderjs.Vector3Type.Float,
      currentSceneTreeNodeStartPoint,
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        point,
        MoveTranslationGizmoSceneViewEditorService.unsafeGetDragStartPoint(
          editorState,
        ),
      ),
    )
    |. Some;
  };

let _computeCurrentSceneTreeNodeNewPositionForMoveXYPlane =
    (ray, (editorState, engineState)) =>
  _computeCurrentSceneTreeNodeNewPositionForMovePlane(
    ray,
    PlaneTranslationGizmoSceneViewEditorService.buildXYPlane(
      editorState,
      engineState,
    ),
    (editorState, engineState),
  );

let _computeCurrentSceneTreeNodeNewPositionForMoveXZPlane =
    (ray, (editorState, engineState)) =>
  _computeCurrentSceneTreeNodeNewPositionForMovePlane(
    ray,
    PlaneTranslationGizmoSceneViewEditorService.buildXZPlane(
      editorState,
      engineState,
    ),
    (editorState, engineState),
  );

let _computeCurrentSceneTreeNodeNewPositionForMoveYZPlane =
    (ray, (editorState, engineState)) =>
  _computeCurrentSceneTreeNodeNewPositionForMovePlane(
    ray,
    PlaneTranslationGizmoSceneViewEditorService.buildYZPlane(
      editorState,
      engineState,
    ),
    (editorState, engineState),
  );

let _moveCurrentSceneTreeNodeAndWholeTranslationGizmo =
    (newPosition, editorState, engineState) =>
  engineState
  |> TransformEngineService.setPosition(
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
         engineState,
       ),
       newPosition,
     )
  |> TransformEngineService.setPosition(
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
           editorState,
         ),
         engineState,
       ),
       newPosition,
     );

let _affectTranslationGizmo = (newPosition, (editorState, engineState)) =>
  switch (newPosition) {
  | None => (editorState, engineState)
  | Some(newPosition) =>
    let engineState =
      _moveCurrentSceneTreeNodeAndWholeTranslationGizmo(
        newPosition,
        editorState,
        engineState,
      );

    (editorState, engineState);
  };

let _affectTranslationAxisGizmo = (newPosition, (editorState, engineState)) =>
  _affectTranslationGizmo(newPosition, (editorState, engineState));

let _affectTranslationPlaneGizmo = (newPosition, (editorState, engineState)) =>
  _affectTranslationGizmo(newPosition, (editorState, engineState));

let _affectAxisGizmo = (ray, editorState, engineState) =>
  SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected(
    editorState,
  ) ?
    _affectTranslationAxisGizmo(
      _computeCurrentSceneTreeNodeNewPositionForMoveXAxis(
        ray,
        (editorState, engineState),
      ),
      (editorState, engineState),
    ) :
    SelectTranslationGizmoSceneViewEditorService.isTranslationYAxisGizmoSelected(
      editorState,
    ) ?
      _affectTranslationAxisGizmo(
        _computeCurrentSceneTreeNodeNewPositionForMoveYAxis(
          ray,
          (editorState, engineState),
        ),
        (editorState, engineState),
      ) :
      SelectTranslationGizmoSceneViewEditorService.isTranslationZAxisGizmoSelected(
        editorState,
      ) ?
        _affectTranslationAxisGizmo(
          _computeCurrentSceneTreeNodeNewPositionForMoveZAxis(
            ray,
            (editorState, engineState),
          ),
          (editorState, engineState),
        ) :
        (editorState, engineState);

let _affectPlaneGizmo = (ray, affectAxisGizmoFunc, editorState, engineState) =>
  SelectTranslationGizmoSceneViewEditorService.isTranslationXYPlaneGizmoSelected(
    editorState,
  ) ?
    _affectTranslationPlaneGizmo(
      _computeCurrentSceneTreeNodeNewPositionForMoveXYPlane(
        ray,
        (editorState, engineState),
      ),
      (editorState, engineState),
    ) :
    SelectTranslationGizmoSceneViewEditorService.isTranslationXZPlaneGizmoSelected(
      editorState,
    ) ?
      _affectTranslationPlaneGizmo(
        _computeCurrentSceneTreeNodeNewPositionForMoveXZPlane(
          ray,
          (editorState, engineState),
        ),
        (editorState, engineState),
      ) :
      SelectTranslationGizmoSceneViewEditorService.isTranslationYZPlaneGizmoSelected(
        editorState,
      ) ?
        _affectTranslationPlaneGizmo(
          _computeCurrentSceneTreeNodeNewPositionForMoveYZPlane(
            ray,
            (editorState, engineState),
          ),
          (editorState, engineState),
        ) :
        affectAxisGizmoFunc(ray, editorState, engineState);

let affectTranslationGizmo = (event, (editorState, engineState)) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  _affectPlaneGizmo(ray, _affectAxisGizmo, editorState, engineState);
};