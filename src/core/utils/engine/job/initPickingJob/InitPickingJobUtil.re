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

let _isIntersectAABB = (ray, gameObject, engineState) =>
  /* ////TODO perf:cache aabbShapeMap in editorState */
  /* TODO perf:if not transform and geometry not change, not compute aabb */
  RayUtils.isIntersectAABB(
    AABBShapeUtils.setFromGameObject(gameObject, engineState),
    ray,
  );

let _getDistanceToCamera = (gameObject, cameraPos, engineState) =>
  Wonderjs.Vector3Service.sub(
    Wonderjs.Vector3Type.Float,
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        gameObject,
        engineState,
      ),
      engineState,
    ),
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
  |> Js.Array.map(intersectedGameObject =>
       _getDistanceToCamera(intersectedGameObject, cameraPos, engineState)
     )
  |> Js.Array.sortInPlaceWith((a, b) =>
       a -. b |> NumberType.convertFloatToInt
     )
  |> ArrayService.getFirst;
};

let _getCanvasSize = engineState => {
  let canvas = ViewEngineService.unsafeGetCanvas(engineState) |> Obj.magic;

  (canvas##width, canvas##height);
};

let _convertMouselocationInViewToNDC =
    ((x, y), (canvasWidth, canvasHeight))
    : InitPickingJobType.mouseData => {
  x:
    (x |> NumberType.convertIntToFloat)
    /. (canvasWidth |> NumberType.convertIntToFloat)
    *. 2.
    -. 1.,
  y:
    (y |> NumberType.convertIntToFloat)
    /. (canvasHeight |> NumberType.convertIntToFloat)
    *. 2.
    -. 1.,
};

let _getPerspectiveCameraData =
    (cameraGameObject, (editorState, engineState))
    : InitPickingJobType.perspectiveCameraData => {
  cameraToWorldMatrix:
    BasicCameraViewEngineService.getBasicCameraViewWorldToCameraMatrix(
      GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
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

let _findPickedOne =
    ({userData}: EventType.customEvent, (editorState, engineState)) => {
  /* TODO use location? */
  let {locationInView}: EventType.pointEvent =
    InitPickingJobType.userDataToPointEvent(
      userData |> OptionService.unsafeGet,
    );
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRay(
      _convertMouselocationInViewToNDC(
        locationInView,
        _getCanvasSize(engineState),
      ),
      _getPerspectiveCameraData(
        cameraGameObject,
        (editorState, engineState),
      ),
    );

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
  |> Js.Array.filter(gameObject =>
       _isIntersectAABB(ray, gameObject, engineState)
     )
  |> Js.Array.filter(gameObject =>
       _isIntersectMesh(ray, gameObject, engineState)
     )
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

  let (editorState, engineState) =
    (editorState, engineState)
    |> _findPickedOne(event)
    |> OptionService.andThenWithDefault(
         gameObject =>
           _selectSceneTreeNode(gameObject, (editorState, engineState)),
         (editorState, engineState),
       );

  editorState |> StateEditorService.setState |> ignore;

  (engineState, event);
};

let initJob = (_, engineState) => {
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