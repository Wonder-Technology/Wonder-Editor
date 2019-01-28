
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
      MoveTransformGizmoSceneViewEditorService.unsafeAxisGizmoStartPoint(
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
        MoveTransformGizmoSceneViewEditorService.unsafeGetPickStartPoint(
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
    AxisTransformGizmoSceneViewEditorService.getXAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneForXAxis,
    (editorState, engineState),
  );

let _computeCurrentSceneTreeNodeNewPositionForMoveYAxis =
    (ray, (editorState, engineState)) =>
  _computeCurrentSceneTreeNodeNewPositionForMoveAxis(
    ray,
    AxisTransformGizmoSceneViewEditorService.getYAxisNormalizedVec(
      editorState,
      engineState,
    ),
FindPlaneForCheckIntersectUtils.   findMostOrthogonalPlaneForYAxis,
    (editorState, engineState),
  );

let _computeCurrentSceneTreeNodeNewPositionForMoveZAxis =
    (ray, (editorState, engineState)) =>
  _computeCurrentSceneTreeNodeNewPositionForMoveAxis(
    ray,
    AxisTransformGizmoSceneViewEditorService.getZAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneForZAxis,
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
         TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
           editorState,
         ),
         engineState,
       ),
       newPosition,
     );

let _affectTranslationAxisGizmo = (newPosition, (editorState, engineState)) =>
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

let affectTransformGizmo = (event, (editorState, engineState)) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  SelectTransformGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected(
    editorState,
  ) ?
    _affectTranslationAxisGizmo(
      _computeCurrentSceneTreeNodeNewPositionForMoveXAxis(
        ray,
        (editorState, engineState),
      ),
      (editorState, engineState),
    ) :
    SelectTransformGizmoSceneViewEditorService.isTranslationYAxisGizmoSelected(
      editorState,
    ) ?
      _affectTranslationAxisGizmo(
        _computeCurrentSceneTreeNodeNewPositionForMoveYAxis(
          ray,
          (editorState, engineState),
        ),
        (editorState, engineState),
      ) :
      SelectTransformGizmoSceneViewEditorService.isTranslationZAxisGizmoSelected(
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
};