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
         (0., 0., 90.),
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
    (plane, ray, (engineState, editorState)) =>
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

let _unsafeGetIntersectPointWithPlaneForXAxis =
    (ray, (engineState, editorState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTransformGameObjectSceneViewEditorService.buildXYPlane(
      engineState,
      editorState,
    ),
    ray,
    (engineState, editorState),
  );

let _unsafeGetIntersectPointWithPlaneForYAxis =
    (ray, (engineState, editorState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTransformGameObjectSceneViewEditorService.buildXYPlane(
      engineState,
      editorState,
    ),
    ray,
    (engineState, editorState),
  );

let _unsafeGetIntersectPointWithPlaneForZAxis =
    (ray, (engineState, editorState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTransformGameObjectSceneViewEditorService.buildXZPlane(
      engineState,
      editorState,
    ),
    ray,
    (engineState, editorState),
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
        {
          let editorState =
            SelectTransformGameObjectSceneViewEditorService.onlySelectTranslationXAxisGameObject(
              editorState,
            );

          PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
            _unsafeGetIntersectPointWithPlaneForXAxis(
              ray,
              (engineState, editorState),
            )
            |. Some,
            editorState,
          );
        } :
        _isSelectTranslationAxisGameObject(
          TransformGameObjectSceneViewEditorService.unsafeGetTranslationYAxisGameObject(
            editorState,
          ),
          ray,
          engineState,
          editorState,
        ) ?
          {
            let editorState =
              SelectTransformGameObjectSceneViewEditorService.onlySelectTranslationYAxisGameObject(
                editorState,
              );

            PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
              _unsafeGetIntersectPointWithPlaneForYAxis(
                ray,
                (engineState, editorState),
              )
              |. Some,
              editorState,
            );
          } :
          _isSelectTranslationAxisGameObject(
            TransformGameObjectSceneViewEditorService.unsafeGetTranslationZAxisGameObject(
              editorState,
            ),
            ray,
            engineState,
            editorState,
          ) ?
            {
              let editorState =
                SelectTransformGameObjectSceneViewEditorService.onlySelectTranslationZAxisGameObject(
                  editorState,
                );

              PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
                _unsafeGetIntersectPointWithPlaneForZAxis(
                  ray,
                  (engineState, editorState),
                )
                |. Some,
                editorState,
              );
            } :
            editorState
            |> SelectTransformGameObjectSceneViewEditorService.notSelectAllTransformGameObject
            |> PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
                 None,
               );
    } :
    editorState
    |> SelectTransformGameObjectSceneViewEditorService.notSelectAllTransformGameObject;

let _computeDeltaForMoveXAxis = (ray, (engineState, editorState)) => {
  let (lastIntersectPointWithPlaneX, _, _) as lastIntersectPointWithPlane =
    PlaneTransformGameObjectSceneViewEditorService.unsafeGetLastIntersectPointWithPlane(
      editorState,
    );
  let (currentIntersectPointWithPlaneX, _, _) as currentIntersectPointWithPlane =
    _unsafeGetIntersectPointWithPlaneForXAxis(
      ray,
      (engineState, editorState),
    );

  (
    currentIntersectPointWithPlane,
    currentIntersectPointWithPlaneX -. lastIntersectPointWithPlaneX,
  );
};

let _computeCurrentGameObjectNewPositionForMoveXAxis =
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
    _computeDeltaForMoveXAxis(ray, (engineState, editorState));

  (currentIntersectPointWithPlane, (posX +. delta, posY, posZ));
};

let _computeDeltaForMoveYAxis = (ray, (engineState, editorState)) => {
  let (_, lastIntersectPointWithPlaneY, _) as lastIntersectPointWithPlane =
    PlaneTransformGameObjectSceneViewEditorService.unsafeGetLastIntersectPointWithPlane(
      editorState,
    );
  let (_, currentIntersectPointWithPlaneY, _) as currentIntersectPointWithPlane =
    _unsafeGetIntersectPointWithPlaneForYAxis(
      ray,
      (engineState, editorState),
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
      (engineState, editorState),
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
    {
      let (currentIntersectPointWithPlane, newPosition) =
        _computeCurrentGameObjectNewPositionForMoveXAxis(
          ray,
          (engineState, editorState),
        );

      let engineState =
        _moveCurrentSceneTreeNodeAndWholeTranslationGameObject(
          newPosition,
          editorState,
          engineState,
        );

      let editorState =
        PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
          currentIntersectPointWithPlane |. Some,
          editorState,
        );

      (editorState, engineState);
    } :
    SelectTransformGameObjectSceneViewEditorService.isTranslationYAxisGameObjectSelected(
      editorState,
    ) ?
      {
        let (currentIntersectPointWithPlane, newPosition) =
          _computeCurrentGameObjectNewPositionForMoveYAxis(
            ray,
            (engineState, editorState),
          );

        let engineState =
          _moveCurrentSceneTreeNodeAndWholeTranslationGameObject(
            newPosition,
            editorState,
            engineState,
          );

        let editorState =
          PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
            currentIntersectPointWithPlane |. Some,
            editorState,
          );

        (editorState, engineState);
      } :
      SelectTransformGameObjectSceneViewEditorService.isTranslationZAxisGameObjectSelected(
        editorState,
      ) ?
        {
          let (currentIntersectPointWithPlane, newPosition) =
            _computeCurrentGameObjectNewPositionForMoveZAxis(
              ray,
              (engineState, editorState),
            );

          let engineState =
            _moveCurrentSceneTreeNodeAndWholeTranslationGameObject(
              newPosition,
              editorState,
              engineState,
            );

          let editorState =
            PlaneTransformGameObjectSceneViewEditorService.setLastIntersectPointWithPlane(
              currentIntersectPointWithPlane |. Some,
              editorState,
            );

          (editorState, engineState);
        } :
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