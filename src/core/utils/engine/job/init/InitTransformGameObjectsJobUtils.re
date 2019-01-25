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

let _createTranslationAxisGameObject = (color, engineState) => {
  let (engineState, axisGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, coneGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, cylinderGameObject) =
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

  let cylinderTransform =
    engineState
    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
         cylinderGameObject,
       );

  let coneTransform =
    engineState
    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
         coneGameObject,
       );

  let engineState =
    engineState
    |> TransformEngineService.setLocalPosition(
         (0., 2.5, 0.),
         cylinderTransform,
       )
    |> TransformEngineService.setLocalPosition((0., 5.5, 0.), coneTransform);

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

let _createTransformGameObjects = engineState => {
  let (engineState, xAxisGameObject, xAxisTransform) =
    _createTranslationAxisGameObject([|1., 0., 0.|], engineState);
  let (engineState, yAxisGameObject, yAxisTransform) =
    _createTranslationAxisGameObject([|0., 1., 0.|], engineState);
  let (engineState, zAxisGameObject, zAxisTransform) =
    _createTranslationAxisGameObject([|0., 0., 1.|], engineState);

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

  let (engineState, wholeGameObject) =
    GameObjectEngineService.create(engineState);

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(
         wholeGameObject,
         zAxisGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         wholeGameObject,
         yAxisGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         wholeGameObject,
         xAxisGameObject,
       );

  (
    engineState,
    wholeGameObject,
    (xAxisGameObject, yAxisGameObject, zAxisGameObject),
  );
};

let _setToEditorState =
    (
      wholeGameObject,
      (xAxisGameObject, yAxisGameObject, zAxisGameObject),
      editorState: EditorType.editorState,
    )
    : EditorType.editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        translationWholeGameObject: wholeGameObject,
        translationXAxisGameObject: xAxisGameObject,
        translationYAxisGameObject: yAxisGameObject,
        translationZAxisGameObject: zAxisGameObject,
        isTranslationXAxisGameObjectSelected: false,
        isTranslationYAxisGameObjectSelected: false,
        isTranslationZAxisGameObjectSelected: false,
        intersectPointWithPlaneOffsetForXAxis: None,
        intersectPointWithPlaneOffsetForYAxis: None,
        intersectPointWithPlaneOffsetForZAxis: None,
      }),
  },
};

let _isSelectTranslationAxisGameObject =
    (translationAxisGameObject, ray, engineState, editorState) => {
  let expandFactor = 0.2;

  HierarchyGameObjectEngineService.getAllChildren(
    translationAxisGameObject,
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
      AxisTransformGameObjectSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGameObjectSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGameObjectSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGameObjectSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let _findMostOrthogonalPlaneForYAxis = (ray, (editorState, engineState)) =>
  _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTransformGameObjectSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGameObjectSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGameObjectSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGameObjectSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let _findMostOrthogonalPlaneForZAxis = (ray, (editorState, engineState)) =>
  _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTransformGameObjectSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGameObjectSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGameObjectSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGameObjectSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let _computeOffsetForXAxis = (ray, (editorState, engineState)) => {
  let plane =
    _findMostOrthogonalPlaneForXAxis(ray, (editorState, engineState));

  let (pointX, _, _) =
    _unsafeGetIntersectPointWithPlane(
      plane,
      ray,
      (editorState, engineState),
    );

  let (posX, _, _) =
    _getCurrentSceneTreeNodePosition(editorState, engineState);

  posX -. pointX;
};

let _computeOffsetForYAxis = (ray, (editorState, engineState)) => {
  let plane =
    _findMostOrthogonalPlaneForYAxis(ray, (editorState, engineState));

  let (_, pointY, _) =
    _unsafeGetIntersectPointWithPlane(
      plane,
      ray,
      (editorState, engineState),
    );

  let (_, posY, _) =
    _getCurrentSceneTreeNodePosition(editorState, engineState);

  posY -. pointY;
};

let _computeOffsetForZAxis = (ray, (editorState, engineState)) => {
  let plane =
    _findMostOrthogonalPlaneForZAxis(ray, (editorState, engineState));

  let (_, _, pointZ) =
    _unsafeGetIntersectPointWithPlane(
      plane,
      ray,
      (editorState, engineState),
    );

  let (_, _, posZ) =
    _getCurrentSceneTreeNodePosition(editorState, engineState);

  posZ -. pointZ;
};

let _selectAxisGameObject =
    (
      ray,
      (
        onlySelectTranslationAxisGameObjectFunc,
        computeOffsetFunc,
        setIntersectPointWithPlaneOffsetFunc,
      ),
      (editorState, engineState),
    ) =>
  editorState
  |> onlySelectTranslationAxisGameObjectFunc
  |> setIntersectPointWithPlaneOffsetFunc(
       computeOffsetFunc(ray, (editorState, engineState)),
     );

let _selectTransformGameObject = (event, engineState, editorState) =>
  IsTransformGameObjectRenderSceneViewEditorService.isTranslationWholeGameObjectRender(
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

      _isSelectTranslationAxisGameObject(
        TransformGameObjectSceneViewEditorService.unsafeGetTranslationXAxisGameObject(
          editorState,
        ),
        ray,
        engineState,
        editorState,
      ) ?
        _selectAxisGameObject(
          ray,
          (
            SelectTransformGameObjectSceneViewEditorService.onlySelectTranslationXAxisGameObject,
            _computeOffsetForXAxis,
            OffsetTransformGameObjectSceneViewEditorService.setIntersectPointWithPlaneOffsetForXAxis,
          ),
          (editorState, engineState),
        ) :
        _isSelectTranslationAxisGameObject(
          TransformGameObjectSceneViewEditorService.unsafeGetTranslationYAxisGameObject(
            editorState,
          ),
          ray,
          engineState,
          editorState,
        ) ?
          _selectAxisGameObject(
            ray,
            (
              SelectTransformGameObjectSceneViewEditorService.onlySelectTranslationYAxisGameObject,
              _computeOffsetForYAxis,
              OffsetTransformGameObjectSceneViewEditorService.setIntersectPointWithPlaneOffsetForYAxis,
            ),
            (editorState, engineState),
          ) :
          _isSelectTranslationAxisGameObject(
            TransformGameObjectSceneViewEditorService.unsafeGetTranslationZAxisGameObject(
              editorState,
            ),
            ray,
            engineState,
            editorState,
          ) ?
            _selectAxisGameObject(
              ray,
              (
                SelectTransformGameObjectSceneViewEditorService.onlySelectTranslationZAxisGameObject,
                _computeOffsetForZAxis,
                OffsetTransformGameObjectSceneViewEditorService.setIntersectPointWithPlaneOffsetForZAxis,
              ),
              (editorState, engineState),
            ) :
            editorState
            |> SelectTransformGameObjectSceneViewEditorService.notSelectAllTransformGameObject;
    } :
    editorState
    |> SelectTransformGameObjectSceneViewEditorService.notSelectAllTransformGameObject;

let _computeDeltaForMoveXAxis =
    (
      (lastIntersectPointWithPlaneX, _, _),
      (currentIntersectPointWithPlaneX, _, _),
    ) =>
  currentIntersectPointWithPlaneX -. lastIntersectPointWithPlaneX;

let _computeCurrentGameObjectNewPositionForMoveXAxis =
    (ray, (editorState, engineState)) => {
  let plane =
    _findMostOrthogonalPlaneForXAxis(ray, (editorState, engineState));

  let (_, posY, posZ) =
    _getCurrentSceneTreeNodePosition(editorState, engineState);

  switch (
    _getIntersectPointWithPlane(plane, ray, (editorState, engineState))
  ) {
  | None => None
  | Some((pointX, _, _)) =>
    Some((
      OffsetTransformGameObjectSceneViewEditorService.unsafeGetIntersectPointWithPlaneOffsetForXAxis(
        editorState,
      )
      +. pointX,
      posY,
      posZ,
    ))
  };
};

let _computeCurrentGameObjectNewPositionForMoveYAxis =
    (ray, (editorState, engineState)) => {
  let plane =
    _findMostOrthogonalPlaneForYAxis(ray, (editorState, engineState));

  let (posX, _, posZ) =
    _getCurrentSceneTreeNodePosition(editorState, engineState);

  switch (
    _getIntersectPointWithPlane(plane, ray, (editorState, engineState))
  ) {
  | None => None
  | Some((_, pointY, _)) =>
    Some((
      posX,
      OffsetTransformGameObjectSceneViewEditorService.unsafeGetIntersectPointWithPlaneOffsetForYAxis(
        editorState,
      )
      +. pointY,
      posZ,
    ))
  };
};

let _computeCurrentGameObjectNewPositionForMoveZAxis =
    (ray, (editorState, engineState)) => {
  let plane =
    _findMostOrthogonalPlaneForZAxis(ray, (editorState, engineState));

  let (posX, posY, _) =
    _getCurrentSceneTreeNodePosition(editorState, engineState);

  switch (
    _getIntersectPointWithPlane(plane, ray, (editorState, engineState))
  ) {
  | None => None
  | Some((_, _, pointZ)) =>
    Some((
      posX,
      posY,
      OffsetTransformGameObjectSceneViewEditorService.unsafeGetIntersectPointWithPlaneOffsetForZAxis(
        editorState,
      )
      +. pointZ,
    ))
  };
};

let _moveCurrentSceneTreeNodeAndWholeTranslationGameObject =
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
         TransformGameObjectSceneViewEditorService.unsafeGetTranslationWholeGameObject(
           editorState,
         ),
         engineState,
       ),
       newPosition,
     );

let _affectTranslationAxisGameObject =
    (newPosition, (editorState, engineState)) =>
  switch (newPosition) {
  | None => (editorState, engineState)
  | Some(newPosition) =>
    let engineState =
      _moveCurrentSceneTreeNodeAndWholeTranslationGameObject(
        newPosition,
        editorState,
        engineState,
      );

    (editorState, engineState);
  };

let _affectTransformGameObject = (event, (editorState, engineState)) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  SelectTransformGameObjectSceneViewEditorService.isTranslationXAxisGameObjectSelected(
    editorState,
  ) ?
    _affectTranslationAxisGameObject(
      _computeCurrentGameObjectNewPositionForMoveXAxis(
        ray,
        (editorState, engineState),
      ),
      (editorState, engineState),
    ) :
    SelectTransformGameObjectSceneViewEditorService.isTranslationYAxisGameObjectSelected(
      editorState,
    ) ?
      _affectTranslationAxisGameObject(
        _computeCurrentGameObjectNewPositionForMoveYAxis(
          ray,
          (editorState, engineState),
        ),
        (editorState, engineState),
      ) :
      SelectTransformGameObjectSceneViewEditorService.isTranslationZAxisGameObjectSelected(
        editorState,
      ) ?
        _affectTranslationAxisGameObject(
          _computeCurrentGameObjectNewPositionForMoveZAxis(
            ray,
            (editorState, engineState),
          ),
          (editorState, engineState),
        ) :
        (editorState, engineState);
};

let _bindEvent = (editorState, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointDownEventName(),
      ~handleFunc=
        (. event, engineState) => {
          let editorState = StateEditorService.getState();

          let editorState =
            _selectTransformGameObject(event, engineState, editorState);

          editorState |> StateEditorService.setState |> ignore;

          (engineState, event);
        },
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointDragEventName(),
      ~handleFunc=
        (. event, engineState) => {
          let editorState = StateEditorService.getState();

          let (editorState, engineState) =
            _affectTransformGameObject(event, (editorState, engineState));

          editorState |> StateEditorService.setState |> ignore;

          (engineState, event);
        },
      ~state=engineState,
      (),
    );

  engineState;
};

let initJob = (_, engineState) => {
  let (
    engineState,
    wholeGameObject,
    (xAxisGameObject, yAxisGameObject, zAxisGameObject),
  ) =
    _createTransformGameObjects(engineState);

  let editorState = StateEditorService.getState();

  let editorState =
    editorState
    |> _setToEditorState(
         wholeGameObject,
         (xAxisGameObject, yAxisGameObject, zAxisGameObject),
       );

  let engineState = _bindEvent(editorState, engineState);

  editorState |> StateEditorService.setState |> ignore;

  engineState;
};