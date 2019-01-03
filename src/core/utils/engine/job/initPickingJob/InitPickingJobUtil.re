open InitPickingJobType;

let _isIntersectMesh = (ray, gameObject, engineState) => {
  let geometry =
    GameObjectComponentEngineService.unsafeGetGeometryComponent(
      gameObject,
      engineState,
    );

  MeshUtils.isIntersectMesh(
    TransformEngineService.getLocalToWorldMatrixTypeArray(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        gameObject,
        engineState,
      ),
      engineState,
    ),
    /* TODO add material->side logic */
    (false, true),
    (
      GeometryEngineService.getGeometryVertices(geometry, engineState),
      GeometryEngineService.getGeometryIndices(geometry, engineState),
      GeometryEngineService.getGeometryIndices32(geometry, engineState),
      GeometryEngineService.getIndicesCount(geometry, engineState),
    ),
    ray,
  );
};

/* let _isIntersectAABB = (ray, gameObject, engineState) =>
   /* ////TODO perf:cache aabbShapeMap in editorState */
   /* TODO perf:if not transform and geometry not change, not compute aabb */
   RayUtils.isIntersectAABB(
     AABBShapeUtils.setFromGameObject(gameObject, engineState),
     ray,
   ); */

let _isIntersectSphere =
    (
      ray,
      (_, _, geometry, localToWorldMatrixTypeArray),
      (editorState, engineState),
    ) =>
  RayUtils.isIntersectSphere(
    SphereShapeUtils.setFromTranslationAndScale(
      PickingEditorService.unsafeGetSphereShape(geometry, editorState),
      localToWorldMatrixTypeArray,
    ),
    ray,
  );

let _getDistanceToCamera = (transform, cameraPos, engineState) =>
  Wonderjs.Vector3Service.sub(
    Wonderjs.Vector3Type.Float,
    TransformEngineService.getPosition(transform, engineState),
    cameraPos,
  )
  |> Vector3Service.length;

let _getTopOne = (cameraGameObject, engineState, intersectedGameObjects) => {
  let cameraPos =
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
    );

  intersectedGameObjects
  |> Js.Array.sortInPlaceWith(
       ((_, transform1, _, _), (_, transform2, _, _)) =>
       _getDistanceToCamera(transform1, cameraPos, engineState)
       -. _getDistanceToCamera(transform2, cameraPos, engineState)
       |> NumberType.convertFloatToInt
     )
  |> ArrayService.getFirst
  |> Js.Option.map((. (gameObject, _, _, _)) => gameObject);
};

let _getSceneViewSize = editorState => {
  let (_, _, width, height) =
    SceneViewEditorService.unsafeGetViewRect(editorState);

  /* let canvas = ViewEngineService.unsafeGetCanvas(engineState) |> Obj.magic;

     (canvas##width, canvas##height); */

  /* (
       width |> NumberType.convertIntToFloat,
       height |> NumberType.convertIntToFloat,
     ); */
  (width, height);
};

let _convertMouselocationInViewToNDC = ((x, y), (canvasWidth, canvasHeight)) => {
  x:
    (x |> NumberType.convertIntToFloat)
    /. (canvasWidth |> NumberType.convertIntToFloat)
    *. 2.
    -. 1.,
  y:
    1.
    -. (y |> NumberType.convertIntToFloat)
    /. (canvasHeight |> NumberType.convertIntToFloat)
    *. 2.,
};

let _getPerspectiveCameraData =
    (cameraGameObject, (editorState, engineState)) => {
  /* let perspectiveCameraProjection =
       GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
         cameraGameObject,
         engineState,
       );

     (
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         cameraGameObject,
         engineState,
       )
       |> TransformEngineService.getPosition(_, engineState),
       BasicCameraViewEngineService.getBasicCameraViewWorldToCameraMatrix(
         GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
           cameraGameObject,
           engineState,
         ),
         engineState,
       ),
       PerspectiveCameraProjectionEngineService.unsafeGetPerspectiveCameraProjectionPMatrix(
         perspectiveCameraProjection,
         engineState,
       ),
       PerspectiveCameraProjectionEngineService.getPerspectiveCameraNear(
         perspectiveCameraProjection,
         engineState,
       ),
       PerspectiveCameraProjectionEngineService.getPerspectiveCameraFar(
         perspectiveCameraProjection,
         engineState,
       ),
     ); */
  cameraToWorldMatrix:
    BasicCameraViewEngineService.getBasicCameraViewWorldToCameraMatrix(
      GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
    )
    |> Wonderjs.Matrix4Service.invert(
         _,
         Wonderjs.Matrix4Service.createIdentityMatrix4(),
       ),
  projectionMatrix:
    PerspectiveCameraProjectionEngineService.unsafeGetPerspectiveCameraProjectionPMatrix(
      GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
    ),
};

let _getAllGameObjectData = engineState =>
  GameObjectEngineService.getAllGameObjects(
    SceneEngineService.getSceneGameObject(engineState),
    engineState,
  )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasGeometryComponent(
         gameObject,
         engineState,
       )
       && InspectorRenderGroupUtils.hasRenderGroupComponents(
            gameObject,
            engineState,
          )
     )
  |> Js.Array.map(gameObject => {
       let transform =
         GameObjectComponentEngineService.unsafeGetTransformComponent(
           gameObject,
           engineState,
         );
       (
         gameObject,
         transform,
         /* let geometry = GameObjectComponentEngineService.unsafeGetGeometryComponent(
                      gameObject,
                      engineState,
                    );


            let localToWorldMatrixTypeArray =        TransformEngineService.getLocalToWorldMatrixTypeArray(
                      GameObjectComponentEngineService.unsafeGetTransformComponent(
                        gameObject,
                        engineState,
                      ),
                      engineState,
                    ); */
         /* PickingEditorService.getSphereShape(editorState)

            SphereShapeUtils.setFromPoints(
              GeometryEngineService.getGeometryVertices(geometry, engineState)
            ); */
         GameObjectComponentEngineService.unsafeGetGeometryComponent(
           gameObject,
           engineState,
         ),
         TransformEngineService.getLocalToWorldMatrixTypeArray(
           transform,
           engineState,
         ),
       );
     });

let _computeSphereShapeData = (allGameObjectData, (editorState, engineState)) =>
  /* let {locationInView}: EventType.pointEvent =
       userDataToPointEvent(userData |> OptionService.unsafeGet);

     let cameraGameObject =
       SceneViewEditorService.unsafeGetEditCamera(editorState);

     let (locationInViewX, locationInViewY) = locationInView; */
  /* let ray =
     RayUtils.createPerspectiveCameraRay(
       _convertMouselocationInViewToNDC(
         locationInView,
         _getSceneViewSize(editorState),
       ),
       _getPerspectiveCameraData(
         cameraGameObject,
         (editorState, engineState),
       ),
     ); */
  /* let ray =
     RayUtils.createPerspectiveCameraRay(
       (
         locationInViewX |> NumberType.convertIntToFloat,
         locationInViewY |> NumberType.convertIntToFloat,
       ),
       _getSceneViewSize(editorState),
       _getPerspectiveCameraData(
         cameraGameObject,
         (editorState, engineState),
       ),
     ); */
  /* let (localToWorldMatrixTypeArray, geometry) = */
  /* GameObjectEngineService.getAllGameObjects(
       SceneEngineService.getSceneGameObject(engineState),
       engineState,
     )
     |> Js.Array.filter(gameObject =>
          GameObjectComponentEngineService.hasGeometryComponent(
            gameObject,
            engineState,
          )
          && InspectorRenderGroupUtils.hasRenderGroupComponents(
               gameObject,
               engineState,
             )
        ) */
  /* |> WonderCommonlib.ArrayService.reduceOneParam((. )) */
  /* allGameObjects
     |> Js.Array.map(gameObject => {
          let geometry =
            GameObjectComponentEngineService.unsafeGetGeometryComponent(
              gameObject,
              engineState,
            );

          let localToWorldMatrixTypeArray =
            TransformEngineService.getLocalToWorldMatrixTypeArray(
              GameObjectComponentEngineService.unsafeGetTransformComponent(
                gameObject,
                engineState,
              ),
              engineState,
            );

          /* PickingEditorService.getSphereShape(editorState)

             SphereShapeUtils.setFromPoints(
               GeometryEngineService.getGeometryVertices(geometry, engineState)
             ); */

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
          );
        }) */
  allGameObjectData
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. editorState, (_, _, geometry, localToWorldMatrixTypeArray)) =>
         switch (PickingEditorService.getSphereShape(geometry, editorState)) {
         | None =>
           PickingEditorService.setSphereShape(
             geometry,
             SphereShapeUtils.setFromPoints(
               GeometryEngineService.getGeometryVertices(
                 geometry,
                 engineState,
               ),
             ),
             editorState,
           )
         | Some(_) => editorState
         },
       editorState,
     );
/* _computeSphereShapeData((editorState, engineState )) */

let _findPickedOne =
    (
      {userData}: EventType.customEvent,
      allGameObjectData,
      (editorState, engineState),
    ) => {
  let {locationInView}: EventType.pointEvent =
    userDataToPointEvent(userData |> OptionService.unsafeGet);

  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let (locationInViewX, locationInViewY) = locationInView;

  let ray =
    RayUtils.createPerspectiveCameraRay(
      _convertMouselocationInViewToNDC(
        locationInView,
        _getSceneViewSize(editorState),
      ),
      _getPerspectiveCameraData(
        cameraGameObject,
        (editorState, engineState),
      ),
    );

  /* let ray =
     RayUtils.createPerspectiveCameraRay(
       (
         locationInViewX |> NumberType.convertIntToFloat,
         locationInViewY |> NumberType.convertIntToFloat,
       ),
       _getSceneViewSize(editorState),
       _getPerspectiveCameraData(
         cameraGameObject,
         (editorState, engineState),
       ),
     ); */

  allGameObjectData
  |> Js.Array.filter(data =>
       _isIntersectSphere(ray, data, (editorState, engineState))
     )
  /* |> Js.Array.filter(gameObject =>
       _isIntersectMesh(ray, gameObject, engineState)
     ) */
  |> WonderLog.Log.print
  |> _getTopOne(cameraGameObject, engineState);
};

let _selectSceneTreeNode = (gameObject, (editorState, engineState)) => {
  let editorState =
    SceneEditorService.setCurrentSceneTreeNode(gameObject, editorState);

  let (engineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        EventEditorService.getRefreshSceneTreeAndInspectorEventName(),
        None,
      ),
      engineState,
    );

  (editorState, engineState);
};

let _handlePicking = (event: EventType.customEvent, engineState) => {
  let editorState = StateEditorService.getState();

  let allGameObjectData = _getAllGameObjectData(engineState);

  let editorState =
    _computeSphereShapeData(allGameObjectData, (editorState, engineState));

  let (editorState, engineState) =
    (editorState, engineState)
    |> _findPickedOne(event, allGameObjectData)
    |> OptionService.andThenWithDefault(
         gameObject =>
           _selectSceneTreeNode(gameObject, (editorState, engineState)),
         (editorState, engineState),
       );

  editorState |> StateEditorService.setState |> ignore;

  (engineState, event);
};

let initJob = (_, engineState) => {
  /* let eu =
     Wonderjs.Matrix4Service.getEulerAngles(
       Js.Typed_array.Float32Array.make([|
         1.,
         0.,
         0.,
         0.,
         0.,
         0.5253219888177296,
         0.8509035245341184,
         0.,
         0.,
         (-0.8509035245341184),
         0.5253219888177296,
         0.,
         0.,
         0.,
         0.,
         1.,
       |]),
     );
     WonderLog.Log.print(("eu: ", eu)) |> ignore; */

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointDownEventName(),
      ~handleFunc=
        (. event, engineState) => _handlePicking(event, engineState),
      ~state=engineState,
      (),
    );

  engineState;
};