let isIntersectMesh = (gameObject, ray, engineState) =>
  MeshUtils.checkIntersectMesh(
    ray,
    (
      GameObjectComponentEngineService.unsafeGetGeometryComponent(
        gameObject,
        engineState,
      ),
      TransformEngineService.getLocalToWorldMatrixTypeArray(
        GameObjectComponentEngineService.unsafeGetTransformComponent(
          gameObject,
          engineState,
        ),
        engineState,
      ),
      RayType.None,
    ),
    engineState,
  )
  |> Js.Option.isSome;

let isSelectTranslationAxisGizmo =
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
             let aabb =
               AABBShapeUtils.setFromPoints(
                 GeometryEngineService.unsafeGetGeometryVertices(
                   GameObjectComponentEngineService.unsafeGetGeometryComponent(
                     gameObject,
                     engineState,
                   ),
                   engineState,
                 ),
               );

             let halfExtendsLength =
               aabb |> AABBShapeUtils.getHalfExtends |> Vector3Service.length;

             RayIntersectUtils.isIntersectOBB(
               aabb
               |> AABBShapeUtils.expandByScalar(
                    expandFactor *. halfExtendsLength,
                  ),
               TransformEngineService.getLocalToWorldMatrixTypeArray(
                 GameObjectComponentEngineService.unsafeGetTransformComponent(
                   gameObject,
                   engineState,
                 ),
                 engineState,
               ),
               ray,
             );
           },
       false,
     );
};

let _isSelectTranslationPlaneGizmo =
    (translationPlaneGizmo, ray, engineState, editorState) =>
  isIntersectMesh(translationPlaneGizmo, ray, engineState);

let _unsafeGetIntersectPointWithPlane =
    (plane, ray, (editorState, engineState)) =>
  switch (RayIntersectUtils.checkIntersectPlane(plane, ray)) {
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
    FindPlaneForCheckIntersectTranslationUtils.findMostOrthogonalPlaneForXAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForYAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTranslationGizmoSceneViewEditorService.getYAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectTranslationUtils.findMostOrthogonalPlaneForYAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForZAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTranslationGizmoSceneViewEditorService.getZAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectTranslationUtils.findMostOrthogonalPlaneForZAxis,
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
  isSelectTranslationAxisGizmo(
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
        ),
        SelectTranslationGizmoSceneViewEditorService.onlySelectTranslationXAxisGizmo,
        _getMoveStartDataForXAxis,
      ),
      (editorState, engineState),
    ) :
    isSelectTranslationAxisGizmo(
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
          ),
          SelectTranslationGizmoSceneViewEditorService.onlySelectTranslationYAxisGizmo,
          _getMoveStartDataForYAxis,
        ),
        (editorState, engineState),
      ) :
      isSelectTranslationAxisGizmo(
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