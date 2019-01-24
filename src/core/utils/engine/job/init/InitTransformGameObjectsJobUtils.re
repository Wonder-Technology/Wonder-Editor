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
         xAxisGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         wholeGameObject,
         yAxisGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         wholeGameObject,
         zAxisGameObject,
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
        lastIntersectPointWithPlane: None,
        lastPlaneForCheckIntersect: None,
      }),
  },
};

let _isSelectTranslationAxisGameObject =
    (translationAxisGameObject, ray, engineState, editorState) =>
  HierarchyGameObjectEngineService.getAllChildren(
    translationAxisGameObject,
    engineState,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. isSelect, gameObject) =>
         isSelect ?
           isSelect :
           RayUtils.isIntersectAABB(
             AABBShapeUtils.setFromGameObject(gameObject, engineState),
             ray,
           ),
       false,
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
      TransformEngineService.getPosition(
        GameObjectComponentEngineService.unsafeGetTransformComponent(
          SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
          engineState,
        ),
        engineState,
      ),
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

/* let _unsafeGetIntersectPointWithPlaneForXAxis =
     (ray, (editorState, engineState)) =>
   _unsafeGetIntersectPointWithPlane(
     PlaneTransformGameObjectSceneViewEditorService.buildXYPlane(
       editorState,
       engineState,
     ),
     ray,
     (editorState, engineState),
   ); */

let _isLastPlaneForCheckIntersectChange = (currentPlane, editorState) =>
  switch (
    PlaneTransformGameObjectSceneViewEditorService.getLastPlaneForCheckIntersect(
      editorState,
    )
  ) {
  | None => false
  | Some(lastPlane) =>
    ! PlaneShapeUtils.isPlaneEqual(lastPlane, currentPlane)
  };

let _unsafeGetIntersectPointWithPlaneForXAxis =
    (ray, (editorState, engineState)) => {
  let plane =
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

  (
    plane,
    _unsafeGetIntersectPointWithPlane(
      plane,
      ray,
      (editorState, engineState),
    ),
  );
};

let _unsafeGetIntersectPointWithPlaneForYAxis =
    (ray, (editorState, engineState)) => {
  let plane =
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

  (
    plane,
    _unsafeGetIntersectPointWithPlane(
      plane,
      ray,
      (editorState, engineState),
    ),
  );
};

let _unsafeGetIntersectPointWithPlaneForZAxis =
    (ray, (editorState, engineState)) => {
  let plane =
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

  (
    plane,
    _unsafeGetIntersectPointWithPlane(
      plane,
      ray,
      (editorState, engineState),
    ),
  );
};

let _selectAxisGameObject =
    (
      ray,
      (
        onlySelectTranslationAxisGameObjectFunc,
        unsafeGetIntersectPointWithPlaneForAxisFunc,
      ),
      (editorState, engineState),
    ) => {
  let editorState = onlySelectTranslationAxisGameObjectFunc(editorState);

  let (mostOrthogonalPlane, intersectPointWithPlane) =
    unsafeGetIntersectPointWithPlaneForAxisFunc(
      ray,
      (editorState, engineState),
    );

  let editorState =
    _isLastPlaneForCheckIntersectChange(mostOrthogonalPlane, editorState) ?
      PlaneTransformGameObjectSceneViewEditorService.clearLastIntersectPointWithPlane(
        editorState,
      ) :
      editorState;

  let editorState =
    editorState
    |> PlaneTransformGameObjectSceneViewEditorService.setLastPlaneForCheckIntersect(
         Some(mostOrthogonalPlane),
       );

  PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
    intersectPointWithPlane |. Some,
    editorState,
  );
};

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
            _unsafeGetIntersectPointWithPlaneForXAxis,
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
              _unsafeGetIntersectPointWithPlaneForYAxis,
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
                _unsafeGetIntersectPointWithPlaneForZAxis,
              ),
              (editorState, engineState),
            ) :
            editorState
            |> SelectTransformGameObjectSceneViewEditorService.notSelectAllTransformGameObject
            |> PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
                 None,
               );
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
    (
      (currentIntersectPointWithPlane, lastIntersectPointWithPlane),
      (editorState, engineState),
    ) => {
  let (posX, posY, posZ) =
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
        engineState,
      ),
      engineState,
    );

  let delta =
    _computeDeltaForMoveXAxis(
      currentIntersectPointWithPlane,
      lastIntersectPointWithPlane,
    );

  (posX -. delta, posY, posZ);
};

/* let _computeDeltaForMoveYAxis = (ray, (engineState, editorState)) => {
     let (_, lastIntersectPointWithPlaneY, _) as lastIntersectPointWithPlane =
       PlaneTransformGameObjectSceneViewEditorService.unsafeGetLastIntersectPointWithPlane(
         editorState,
       );
     let (_, currentIntersectPointWithPlaneY, _) as currentIntersectPointWithPlane =
       _unsafeGetIntersectPointWithPlaneForYAxis(
         ray,
         (editorState, engineState),
       );

     (
       currentIntersectPointWithPlane,
       currentIntersectPointWithPlaneY -. lastIntersectPointWithPlaneY,
     );
   };

   let _computeCurrentGameObjectNewPositionForMoveYAxis =
       (ray, (engineState, editorState)) => {
     let (posX, posY, posZ) =
       TransformEngineService.getPosition(
         GameObjectComponentEngineService.unsafeGetTransformComponent(
           SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
           engineState,
         ),
         engineState,
       );

     let (currentIntersectPointWithPlane, delta) =
       _computeDeltaForMoveYAxis(ray, (engineState, editorState));

     (currentIntersectPointWithPlane, (posX, posY +. delta, posZ));
   };

   let _computeDeltaForMoveZAxis = (ray, (engineState, editorState)) => {
     let (_, _, lastIntersectPointWithPlaneZ) as lastIntersectPointWithPlane =
       PlaneTransformGameObjectSceneViewEditorService.unsafeGetLastIntersectPointWithPlane(
         editorState,
       );
     let (_, _, currentIntersectPointWithPlaneZ) as currentIntersectPointWithPlane =
       _unsafeGetIntersectPointWithPlaneForZAxis(
         ray,
         (editorState, engineState),
       );

     (
       currentIntersectPointWithPlane,
       currentIntersectPointWithPlaneZ -. lastIntersectPointWithPlaneZ,
     );
   };

   let _computeCurrentGameObjectNewPositionForMoveZAxis =
       (ray, (engineState, editorState)) => {
     let (posX, posY, posZ) =
       TransformEngineService.getPosition(
         GameObjectComponentEngineService.unsafeGetTransformComponent(
           SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
           engineState,
         ),
         engineState,
       );

     let (currentIntersectPointWithPlane, delta) =
       _computeDeltaForMoveZAxis(ray, (engineState, editorState));

     (currentIntersectPointWithPlane, (posX, posY, posZ +. delta));
   }; */

let _computeDeltaForMoveYAxis =
    (
      (_, lastIntersectPointWithPlaneY, _),
      (_, currentIntersectPointWithPlaneY, _),
    ) =>
  currentIntersectPointWithPlaneY -. lastIntersectPointWithPlaneY;

let _computeCurrentGameObjectNewPositionForMoveYAxis =
    (
      (currentIntersectPointWithPlane, lastIntersectPointWithPlane),
      (editorState, engineState),
    ) => {
  let (posX, posY, posZ) =
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
        engineState,
      ),
      engineState,
    );

  let delta =
    _computeDeltaForMoveYAxis(
      currentIntersectPointWithPlane,
      lastIntersectPointWithPlane,
    );

  (posX, posY -. delta, posZ);
};

let _computeDeltaForMoveZAxis =
    (
      (_, _, lastIntersectPointWithPlaneZ),
      (_, _, currentIntersectPointWithPlaneZ),
    ) =>
  currentIntersectPointWithPlaneZ -. lastIntersectPointWithPlaneZ;

let _computeCurrentGameObjectNewPositionForMoveZAxis =
    (
      (currentIntersectPointWithPlane, lastIntersectPointWithPlane),
      (editorState, engineState),
    ) => {
  let (posX, posY, posZ) =
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
        engineState,
      ),
      engineState,
    );

  let delta =
    _computeDeltaForMoveZAxis(
      currentIntersectPointWithPlane,
      lastIntersectPointWithPlane,
    );

  (posX, posY, posZ -. delta);
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
    (
      (mostOrthogonalPlane, currentIntersectPointWithPlane),
      computeCurrentGameObjectNewPositionForMoveAxisFunc,
      (editorState, engineState),
    ) => {
  let editorState =
    _isLastPlaneForCheckIntersectChange(mostOrthogonalPlane, editorState) ?
      PlaneTransformGameObjectSceneViewEditorService.clearLastIntersectPointWithPlane(
        editorState,
      ) :
      editorState;

  let editorState =
    editorState
    |> PlaneTransformGameObjectSceneViewEditorService.setLastPlaneForCheckIntersect(
         Some(mostOrthogonalPlane),
       );

  let (editorState, engineState) =
    switch (
      PlaneTransformGameObjectSceneViewEditorService.getLastIntersectPointWithPlane(
        editorState,
      )
    ) {
    | None => (editorState, engineState)
    | Some(lastIntersectPointWithPlane) =>
      let newPosition =
        computeCurrentGameObjectNewPositionForMoveAxisFunc(
          (currentIntersectPointWithPlane, lastIntersectPointWithPlane),
          (editorState, engineState),
        );

      let engineState =
        _moveCurrentSceneTreeNodeAndWholeTranslationGameObject(
          newPosition,
          editorState,
          engineState,
        );

      (editorState, engineState);
    };

  let editorState =
    PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
      currentIntersectPointWithPlane |. Some,
      editorState,
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
      _unsafeGetIntersectPointWithPlaneForXAxis(
        ray,
        (editorState, engineState),
      ),
      _computeCurrentGameObjectNewPositionForMoveXAxis,
      (editorState, engineState),
    ) :
    SelectTransformGameObjectSceneViewEditorService.isTranslationYAxisGameObjectSelected(
      editorState,
    ) ?
      _affectTranslationAxisGameObject(
        _unsafeGetIntersectPointWithPlaneForYAxis(
          ray,
          (editorState, engineState),
        ),
        _computeCurrentGameObjectNewPositionForMoveYAxis,
        (editorState, engineState),
      ) :
      SelectTransformGameObjectSceneViewEditorService.isTranslationZAxisGameObjectSelected(
        editorState,
      ) ?
        _affectTranslationAxisGameObject(
          _unsafeGetIntersectPointWithPlaneForZAxis(
            ray,
            (editorState, engineState),
          ),
          _computeCurrentGameObjectNewPositionForMoveZAxis,
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