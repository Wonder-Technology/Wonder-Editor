let _isSelectTranslationAxisGizmo =
    (translationAxisGizmo, ray, engineState, editorState) => {
  let expandFactor = 0.3;

  HierarchyGameObjectEngineService.getAllChildren(
    translationAxisGizmo,
    engineState,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. isSelect, gameObject) =>
         isSelect ?
           isSelect :
           {
             let halfExtendsLength =
               AABBShapeUtils.setFromGameObject(gameObject, engineState)
               |> AABBShapeUtils.getHalfExtends
               |> Vector3Service.length;

             RayUtils.isIntersectAABB(
               AABBShapeUtils.setFromGameObject(gameObject, engineState)
               |> AABBShapeUtils.expandByScalar(
                    expandFactor *. halfExtendsLength,
                  ),
               ray,
             );
           },
       false,
     );
};

let _isSelectTranslationPlaneGizmo =
    (translationPlaneGizmo, ray, engineState, editorState) =>
  RayUtils.isIntersectAABB(
    AABBShapeUtils.setFromGameObject(translationPlaneGizmo, engineState),
    ray,
  );

let _unsafeGetIntersectPointWithPlane =
    (plane, ray, (editorState, engineState)) =>
  switch (RayUtils.checkIntersectPlane(plane, ray)) {
  | None =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should intersect with plane|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(point) => point
  };

let _getMoveStartDataForAxis =
    (
      ray,
      axisVec,
      findMostOrthogonalPlaneForAxisFunc,
      (editorState, engineState),
    ) => {
  let plane =
    findMostOrthogonalPlaneForAxisFunc(ray, (editorState, engineState));

  let point =
    _unsafeGetIntersectPointWithPlane(
      plane,
      ray,
      (editorState, engineState),
    );

  let axisGameObjectStartPoint =
    AxisTranslationGizmoSceneViewEditorService.getAxisGizmoPos(
      editorState,
      engineState,
    );

  (
    axisGameObjectStartPoint,
    PointService.projectPointToLine(point, axisGameObjectStartPoint, axisVec),
  );
};

let _getMoveStartDataForXAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTranslationGizmoSceneViewEditorService.getXAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneForXAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForYAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTranslationGizmoSceneViewEditorService.getYAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneForYAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForZAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTranslationGizmoSceneViewEditorService.getZAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneForZAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForXYPlane = (ray, (editorState, engineState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTranslationGizmoSceneViewEditorService.buildXYPlane(
      editorState,
      engineState,
    ),
    ray,
    (editorState, engineState),
  );

let _getMoveStartDataForXZPlane = (ray, (editorState, engineState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTranslationGizmoSceneViewEditorService.buildXZPlane(
      editorState,
      engineState,
    ),
    ray,
    (editorState, engineState),
  );

let _getMoveStartDataForYZPlane = (ray, (editorState, engineState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTranslationGizmoSceneViewEditorService.buildYZPlane(
      editorState,
      engineState,
    ),
    ray,
    (editorState, engineState),
  );

let _selectAxisGizmo =
    (
      ray,
      (
        setCurrentGizmoColorFunc,
        onlySelectTranslationAxisGizmoFunc,
        getMoveStartDataFunc,
      ),
      (editorState, engineState),
    ) => {
  let editorState = editorState |> onlySelectTranslationAxisGizmoFunc;

  let engineState = setCurrentGizmoColorFunc(editorState, engineState);

  let (axisGameObjectStartPoint, dragStartPoint) =
    getMoveStartDataFunc(ray, (editorState, engineState));

  editorState
  |> MoveTranslationGizmoSceneViewEditorService.setDragStartPoint(
       dragStartPoint,
     )
  |> MoveTranslationGizmoSceneViewEditorService.setAxisGizmoStartPoint(
       axisGameObjectStartPoint,
     );
};

let _selectPlaneGizmo =
    (
      ray,
      (
        setCurrentGizmoColorFunc,
        onlySelectTranslationPlaneGizmoFunc,
        getMoveStartDataFunc,
      ),
      (editorState, engineState),
    ) => {
  let editorState = editorState |> onlySelectTranslationPlaneGizmoFunc;

  let engineState = setCurrentGizmoColorFunc(editorState, engineState);

  let dragStartPoint = getMoveStartDataFunc(ray, (editorState, engineState));

  editorState
  |> MoveTranslationGizmoSceneViewEditorService.setDragStartPoint(
       dragStartPoint,
     );
};

let _handleSelectAxisGizmo = (ray, editorState, engineState) =>
  _isSelectTranslationAxisGizmo(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    ),
    ray,
    engineState,
    editorState,
  ) ?
    _selectAxisGizmo(
      ray,
      (
        CurrentTransformGizmosUtils.setCurrentGizmoColor(
          GameObjectEngineService.getAllBasicMaterials(
            HierarchyGameObjectEngineService.getAllGameObjects(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
                editorState,
              ),
              engineState,
            ),
            engineState,
          ),
          GameObjectEngineService.unsafeGetGameObjectName(
            OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
              editorState,
            ),
            engineState,
          ),
          CurrentTranslationGizmosUtils.isAxisSelected,
        ),
        SelectTranslationGizmoSceneViewEditorService.onlySelectTranslationXAxisGizmo,
        _getMoveStartDataForXAxis,
      ),
      (editorState, engineState),
    ) :
    _isSelectTranslationAxisGizmo(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
        editorState,
      ),
      ray,
      engineState,
      editorState,
    ) ?
      _selectAxisGizmo(
        ray,
        (
          CurrentTransformGizmosUtils.setCurrentGizmoColor(
            GameObjectEngineService.getAllBasicMaterials(
              HierarchyGameObjectEngineService.getAllGameObjects(
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                  editorState,
                ),
                engineState,
              ),
              engineState,
            ),
            GameObjectEngineService.unsafeGetGameObjectName(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                editorState,
              ),
              engineState,
            ),
            CurrentTranslationGizmosUtils.isAxisSelected,
          ),
          SelectTranslationGizmoSceneViewEditorService.onlySelectTranslationYAxisGizmo,
          _getMoveStartDataForYAxis,
        ),
        (editorState, engineState),
      ) :
      _isSelectTranslationAxisGizmo(
        OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
          editorState,
        ),
        ray,
        engineState,
        editorState,
      ) ?
        _selectAxisGizmo(
          ray,
          (
            CurrentTransformGizmosUtils.setCurrentGizmoColor(
              GameObjectEngineService.getAllBasicMaterials(
                HierarchyGameObjectEngineService.getAllGameObjects(
                  OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
                    editorState,
                  ),
                  engineState,
                ),
                engineState,
              ),
              GameObjectEngineService.unsafeGetGameObjectName(
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
                  editorState,
                ),
                engineState,
              ),
              CurrentTranslationGizmosUtils.isAxisSelected,
            ),
            SelectTranslationGizmoSceneViewEditorService.onlySelectTranslationZAxisGizmo,
            _getMoveStartDataForZAxis,
          ),
          (editorState, engineState),
        ) :
        editorState
        |> SelectTranslationGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo;

let _handleSelectPlaneGizmo =
    (ray, handleSelectAxisGizmoFunc, editorState, engineState) =>
  _isSelectTranslationPlaneGizmo(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
      editorState,
    ),
    ray,
    engineState,
    editorState,
  ) ?
    _selectPlaneGizmo(
      ray,
      (
        CurrentTransformGizmosUtils.setCurrentGizmoColor(
          GameObjectEngineService.getAllBasicMaterials(
            HierarchyGameObjectEngineService.getAllGameObjects(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
                editorState,
              ),
              engineState,
            ),
            engineState,
          ),
          GameObjectEngineService.unsafeGetGameObjectName(
            OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
              editorState,
            ),
            engineState,
          ),
          CurrentTranslationGizmosUtils.isPlaneSelected,
        ),
        SelectTranslationGizmoSceneViewEditorService.onlySelectTranslationXYPlaneGizmo,
        _getMoveStartDataForXYPlane,
      ),
      (editorState, engineState),
    ) :
    _isSelectTranslationPlaneGizmo(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
        editorState,
      ),
      ray,
      engineState,
      editorState,
    ) ?
      _selectPlaneGizmo(
        ray,
        (
          CurrentTransformGizmosUtils.setCurrentGizmoColor(
            GameObjectEngineService.getAllBasicMaterials(
              HierarchyGameObjectEngineService.getAllGameObjects(
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
                  editorState,
                ),
                engineState,
              ),
              engineState,
            ),
            GameObjectEngineService.unsafeGetGameObjectName(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
                editorState,
              ),
              engineState,
            ),
            CurrentTranslationGizmosUtils.isPlaneSelected,
          ),
          SelectTranslationGizmoSceneViewEditorService.onlySelectTranslationXZPlaneGizmo,
          _getMoveStartDataForXZPlane,
        ),
        (editorState, engineState),
      ) :
      _isSelectTranslationPlaneGizmo(
        OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
          editorState,
        ),
        ray,
        engineState,
        editorState,
      ) ?
        _selectPlaneGizmo(
          ray,
          (
            CurrentTransformGizmosUtils.setCurrentGizmoColor(
              GameObjectEngineService.getAllBasicMaterials(
                HierarchyGameObjectEngineService.getAllGameObjects(
                  OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
                    editorState,
                  ),
                  engineState,
                ),
                engineState,
              ),
              GameObjectEngineService.unsafeGetGameObjectName(
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
                  editorState,
                ),
                engineState,
              ),
              CurrentTranslationGizmosUtils.isPlaneSelected,
            ),
            SelectTranslationGizmoSceneViewEditorService.onlySelectTranslationYZPlaneGizmo,
            _getMoveStartDataForYZPlane,
          ),
          (editorState, engineState),
        ) :
        handleSelectAxisGizmoFunc(ray, editorState, engineState);

let selectTranslationGizmo = (event, engineState, editorState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  _handleSelectPlaneGizmo(
    ray,
    _handleSelectAxisGizmo,
    editorState,
    engineState,
  );
};