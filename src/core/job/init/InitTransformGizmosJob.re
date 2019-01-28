let _createBasicGameObject = (geometry, engineState) => {
  let (engineState, gameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, renderGroup) =
    engineState
    |> RenderGroupEngineService.createRenderGroup((
         MeshRendererEngineService.create,
         BasicMaterialEngineService.create,
       ));

  (
    engineState
    |> GameObjectComponentEngineService.addGeometryComponent(
         gameObject,
         geometry,
       )
    |> RenderGroupEngineService.addRenderGroupComponents(
         gameObject,
         renderGroup,
         (
           GameObjectComponentEngineService.addMeshRendererComponent,
           GameObjectComponentEngineService.addBasicMaterialComponent,
         ),
       ),
    gameObject,
    renderGroup.material,
    renderGroup.meshRenderer,
  );
};

let _createTranslationAxisGizmo = (color, engineState) => {
  let (engineState, axisGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, coneGeometry) =
    GeometryEngineService.createConeGeometry(0.5, 1., 10, 10, engineState);

  let (engineState, cylinderGeometry) =
    GeometryEngineService.createCylinderGeometry(
      0.1,
      0.1,
      5.,
      5,
      5,
      engineState,
    );

  let (engineState, coneGameObject, coneMaterial, coneMeshRenderer) =
    engineState |> _createBasicGameObject(coneGeometry);

  let (
    engineState,
    cylinderGameObject,
    cylinderMaterial,
    cylinderMeshRenderer,
  ) =
    engineState |> _createBasicGameObject(cylinderGeometry);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("arrow", coneGameObject)
    |> GameObjectEngineService.setGameObjectName("line", cylinderGameObject);

  let engineState =
    engineState
    |> BasicMaterialEngineService.setColor(color, coneMaterial)
    /* |> BasicMaterialEngineService.setIsDepthTest(false, coneMaterial) */
    |> MeshRendererEngineService.setMeshRendererIsRender(
         coneMeshRenderer,
         false,
       )
    |> BasicMaterialEngineService.setColor(color, cylinderMaterial)
    /* |> BasicMaterialEngineService.setIsDepthTest(false, cylinderMaterial) */
    |> MeshRendererEngineService.setMeshRendererIsRender(
         cylinderMeshRenderer,
         false,
       );

  let engineState =
    engineState
    |> TransformGameObjectEngineService.setLocalPosition(
         cylinderGameObject,
         (0., 2.5, 0.),
       )
    |> TransformGameObjectEngineService.setLocalPosition(
         coneGameObject,
         (0., 5.5, 0.),
       );

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(
         axisGameObject,
         coneGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         axisGameObject,
         cylinderGameObject,
       );

  (
    engineState,
    axisGameObject,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      axisGameObject,
      engineState,
    ),
  );
};

let _createTransformGizmos = engineState => {
  let (engineState, xAxisGizmo, xAxisTransform) =
    _createTranslationAxisGizmo([|1., 0., 0.|], engineState);
  let (engineState, yAxisGizmo, yAxisTransform) =
    _createTranslationAxisGizmo([|0., 1., 0.|], engineState);

  let (engineState, zAxisGizmo, zAxisTransform) =
    _createTranslationAxisGizmo([|0., 0., 1.|], engineState);

  let engineState =
    engineState
    |> TransformEngineService.setLocalEulerAngles(
         (0., 0., (-90.)),
         xAxisTransform,
       )
    |> TransformEngineService.setLocalEulerAngles(
         (90., 0., 0.),
         zAxisTransform,
       );

  let (engineState, wholeGizmo) =
    GameObjectEngineService.create(engineState);

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, zAxisGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, yAxisGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, xAxisGizmo);

  (engineState, wholeGizmo, (xAxisGizmo, yAxisGizmo, zAxisGizmo));
};

let _setToEditorState =
    (
      wholeGizmo,
      (xAxisGizmo, yAxisGizmo, zAxisGizmo),
      editorState: EditorType.editorState,
    )
    : EditorType.editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        translationWholeGizmo: wholeGizmo,
        translationXAxisGizmo: xAxisGizmo,
        translationYAxisGizmo: yAxisGizmo,
        translationZAxisGizmo: zAxisGizmo,
        isTranslationXAxisGizmoSelected: false,
        isTranslationYAxisGizmoSelected: false,
        isTranslationZAxisGizmoSelected: false,
        axisGameObjectStartPoint: None,
        pickStartPoint: None,
      }),
  },
};

let _isSelectTranslationAxisGizmo =
    (translationAxisGizmo, ray, engineState, editorState) => {
  let expandFactor = 0.2;

  HierarchyGameObjectEngineService.getAllChildren(
    translationAxisGizmo,
    engineState,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. isSelect, gameObject) =>
         isSelect ?
           isSelect :
           RayUtils.isIntersectAABB(
             AABBShapeUtils.setFromGameObject(gameObject, engineState)
             |> AABBShapeUtils.expandByScalar(expandFactor),
             ray,
           ),
       false,
     );
};

let _getIntersectPointWithPlane = (plane, ray, (editorState, engineState)) =>
  RayUtils.checkIntersectPlane(plane, ray);

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

let _getCurrentSceneTreeNodePosition = (editorState, engineState) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane =
    (
      (axis1Vec, plane1: ShapeType.planeShape),
      (axis2Vec, plane2: ShapeType.planeShape),
      (editorState, engineState),
    ) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let currentSceneTreeNodeToCameraVec =
    Wonderjs.Vector3Service.sub(
      Wonderjs.Vector3Type.Float,
      _getCurrentSceneTreeNodePosition(editorState, engineState),
      TransformEngineService.getPosition(
        GameObjectComponentEngineService.unsafeGetTransformComponent(
          cameraGameObject,
          engineState,
        ),
        engineState,
      ),
    );

  Vector3Service.projectOnPlane(
    plane1.normal,
    currentSceneTreeNodeToCameraVec,
  )
  |>
  Vector3Service.length < (
                            Vector3Service.projectOnPlane(
                              plane2.normal,
                              currentSceneTreeNodeToCameraVec,
                            )
                            |> Vector3Service.length
                          ) ?
    plane1 : plane2;
  /*
   Vector3Service.dot(currentSceneTreeNodeToCameraVec, axis1Vec)
   > Vector3Service.dot(currentSceneTreeNodeToCameraVec, axis2Vec) ?
     plane2 : plane1; */
};

let _findMostOrthogonalPlaneForXAxis = (ray, (editorState, engineState)) =>
  _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTransformGizmoSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGizmoSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let _findMostOrthogonalPlaneForYAxis = (ray, (editorState, engineState)) =>
  _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTransformGizmoSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGizmoSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let _findMostOrthogonalPlaneForZAxis = (ray, (editorState, engineState)) =>
  _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTransformGizmoSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGizmoSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

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
    AxisTransformGizmoSceneViewEditorService.getAxisGizmoPos(
      editorState,
      engineState,
    );

  (
    axisGameObjectStartPoint,
    PointService.projectPointToLine(point, axisGameObjectStartPoint, axisVec),
  );
};

let _getMoveStartDataForZAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTransformGizmoSceneViewEditorService.getZAxisNormalizedVec(
      editorState,
      engineState,
    ),
    _findMostOrthogonalPlaneForZAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForXAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTransformGizmoSceneViewEditorService.getXAxisNormalizedVec(
      editorState,
      engineState,
    ),
    _findMostOrthogonalPlaneForXAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForYAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTransformGizmoSceneViewEditorService.getYAxisNormalizedVec(
      editorState,
      engineState,
    ),
    _findMostOrthogonalPlaneForYAxis,
    (editorState, engineState),
  );

let _selectAxisGizmo =
    (
      ray,
      (onlySelectTranslationAxisGizmoFunc, getMoveStartDataFunc),
      (editorState, engineState),
    ) => {
  let editorState = editorState |> onlySelectTranslationAxisGizmoFunc;

  let (axisGameObjectStartPoint, pickStartPoint) =
    getMoveStartDataFunc(ray, (editorState, engineState));

  editorState
  |> MoveTransformGizmoSceneViewEditorService.setPickStartPoint(
       pickStartPoint,
     )
  |> MoveTransformGizmoSceneViewEditorService.setAxisGizmoStartPoint(
       axisGameObjectStartPoint,
     );
};

let _selectTransformGizmo = (event, engineState, editorState) =>
  IsTransformGizmoRenderSceneViewEditorService.isTranslationWholeGizmoRender(
    editorState,
  ) ?
    {
      let cameraGameObject =
        SceneViewEditorService.unsafeGetEditCamera(editorState);

      let ray =
        RayUtils.createPerspectiveCameraRayFromEvent(
          event,
          cameraGameObject,
          (editorState, engineState),
        );

      _isSelectTranslationAxisGizmo(
        TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
          editorState,
        ),
        ray,
        engineState,
        editorState,
      ) ?
        _selectAxisGizmo(
          ray,
          (
            SelectTransformGizmoSceneViewEditorService.onlySelectTranslationXAxisGizmo,
            _getMoveStartDataForXAxis,
          ),
          (editorState, engineState),
        ) :
        _isSelectTranslationAxisGizmo(
          TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
            editorState,
          ),
          ray,
          engineState,
          editorState,
        ) ?
          _selectAxisGizmo(
            ray,
            (
              SelectTransformGizmoSceneViewEditorService.onlySelectTranslationYAxisGizmo,
              _getMoveStartDataForYAxis,
            ),
            (editorState, engineState),
          ) :
          _isSelectTranslationAxisGizmo(
            TransformGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
              editorState,
            ),
            ray,
            engineState,
            editorState,
          ) ?
            _selectAxisGizmo(
              ray,
              (
                SelectTransformGizmoSceneViewEditorService.onlySelectTranslationZAxisGizmo,
                _getMoveStartDataForZAxis,
              ),
              (editorState, engineState),
            ) :
            editorState
            |> SelectTransformGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo;
    } :
    editorState
    |> SelectTransformGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo;

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
    _findMostOrthogonalPlaneForXAxis,
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
    _findMostOrthogonalPlaneForYAxis,
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
    _findMostOrthogonalPlaneForZAxis,
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

let _affectTransformGizmo = (event, (editorState, engineState)) => {
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

let _refreshInspector = () => {
  let dispatchFunc = UIStateService.getDispatch();

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  ();
};

let _bindEvent = (editorState, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDownEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isLeftMouseButton(event) ?
            {
              let editorState = StateEditorService.getState();

              let editorState =
                _selectTransformGizmo(event, engineState, editorState);

              editorState |> StateEditorService.setState |> ignore;

              (engineState, event);
            } :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isLeftMouseButton(event) ?
            {
              let editorState = StateEditorService.getState();

              let (editorState, engineState) =
                _affectTransformGizmo(event, (editorState, engineState));

              SelectTransformGizmoSceneViewEditorService.isSelectAnyTransformGizmo(
                editorState,
              ) ?
                _refreshInspector() : ();

              editorState |> StateEditorService.setState |> ignore;

              (engineState, event);
            } :
            (engineState, event),
      ~state=engineState,
      (),
    );

  engineState;
};

let initJob = (_, engineState) => {
  let (engineState, wholeGizmo, (xAxisGizmo, yAxisGizmo, zAxisGizmo)) =
    _createTransformGizmos(engineState);

  let editorState = StateEditorService.getState();

  let editorState =
    editorState
    |> _setToEditorState(wholeGizmo, (xAxisGizmo, yAxisGizmo, zAxisGizmo));

  let engineState = _bindEvent(editorState, engineState);

  editorState |> StateEditorService.setState |> ignore;

  engineState;
};