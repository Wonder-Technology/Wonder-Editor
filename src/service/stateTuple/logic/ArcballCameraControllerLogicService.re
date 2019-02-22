let _renderWhenStop = (event, handleFunc, engineState) => {
  let (engineState, event) = handleFunc(. event, engineState);

  let engineState = StateLogicService.renderWhenStop(engineState);

  (engineState, event);
};

let _isKeyAffectedArballCameraController = ({key}: EventType.keyboardEvent) =>
  switch (key) {
  | "a"
  | "s"
  | "d"
  | "w" => true
  | _ => false
  };

let _handleKeyDownForSceneView = (event, keydownHandleFunc, engineState) =>
  _isKeyAffectedArballCameraController(event) ?
    {
      HandleDomEventEngineService.preventDefault(
        event.event |> EventType.keyboardDomEventToDomEvent,
      )
      |> ignore;

      let engineState = keydownHandleFunc(. event, engineState);

      let engineState = StateLogicService.renderWhenStop(engineState);

      engineState;
    } :
    engineState;

let bindArcballCameraControllerEventForSceneView =
    (cameraController, engineState) => {
  let (
    engineState,
    pointDragStartHandleFunc,
    pointDragDropHandleFunc,
    pointDragOverHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  ) =
    ArcballCameraEngineService.prepareBindEvent(
      cameraController,
      engineState,
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragStartEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(event, pointDragStartHandleFunc, engineState) :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragDropEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(event, pointDragDropHandleFunc, engineState) :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragOverEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(event, pointDragOverHandleFunc, engineState) :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointScaleEventName(),
      ~handleFunc=
        (. event, engineState) =>
          _renderWhenStop(event, pointScaleHandleFunc, engineState),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onKeyboardEvent(
      ~eventName=EventType.KeyDown_SceneView |> Obj.magic,
      ~handleFunc=
        (. event: EventType.keyboardEvent, engineState) =>
          _handleKeyDownForSceneView(event, keydownHandleFunc, engineState),
      ~state=engineState,
      (),
    );

  engineState;
};

let _checkSceneAllArcballCameraControllersNotBindEvent = engineState =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect=
              {j|scene's all arcballCameraControllers should not bind event|j},
            ~actual={j|bind|j},
          ),
          () =>
          HierarchyGameObjectEngineService.getAllGameObjects(
            SceneEngineService.getSceneGameObject(engineState),
            engineState,
          )
          |> Js.Array.filter(gameObject =>
               GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                 gameObject,
                 engineState,
               )
             )
          |> Js.Array.filter(arcballCameraController =>
               ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                 arcballCameraController,
                 engineState,
               )
             )
          |> Js.Array.length == 0
        )
      )
    )
  );

let bindGameViewActiveCameraArcballCameraControllerEvent = engineState => {
  WonderLog.Contract.requireCheck(
    () => _checkSceneAllArcballCameraControllersNotBindEvent(engineState),
    StateEditorService.getStateIsDebug(),
  );

  switch (
    GameViewEditorService.getActivedBasicCameraView(
      StateEditorService.getState(),
    )
  ) {
  | None => engineState
  | Some(activeBasicCameraView) =>
    BasicCameraViewEngineService.getBasicCameraViewGameObject(
      activeBasicCameraView,
      engineState,
    )
    |> ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponentForGameView(
         _,
         engineState,
       )
  };
};

let unbindGameViewActiveCameraArcballCameraControllerEvent = engineState =>
  (
    switch (
      GameViewEditorService.getActivedBasicCameraView(
        StateEditorService.getState(),
      )
    ) {
    | None => engineState
    | Some(activeBasicCameraView) =>
      BasicCameraViewEngineService.getBasicCameraViewGameObject(
        activeBasicCameraView,
        engineState,
      )
      |> ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponentForGameView(
           _,
           engineState,
         )
    }
  )
  |> WonderLog.Contract.ensureCheck(
       engineState =>
         _checkSceneAllArcballCameraControllersNotBindEvent(engineState),
       StateEditorService.getStateIsDebug(),
     );

let _setArcballCameraControllerFocusRelatedAttribute =
    (arcballCameraController, (distance, target), engineState) => {
  Js.log(distance);

  engineState
  |> ArcballCameraEngineService.setArcballCameraControllerTarget(
       arcballCameraController,
       target,
     )
  |> ArcballCameraEngineService.setArcballCameraControllerDistance(
       distance,
       arcballCameraController,
     );
};

let _getTargetGameObjectMaxScale = (targetGameObjectTransform, engineState) => {
  let (xScale, yScale, zScale) =
    engineState |> TransformEngineService.getScale(targetGameObjectTransform);

  Js.Math.max_float(xScale, yScale) |> Js.Math.max_float(zScale);
};

let _getMaxDistanceOfPointsToCenter = (targetGameObject, engineState) =>
  engineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(targetGameObject)
  |> Js.Array.map(gameObject =>
       switch (
         engineState
         |> GameObjectComponentEngineService.getGeometryComponent(gameObject)
       ) {
       | None => None
       | Some(geometry) =>
         engineState
         |> GeometryEngineService.getGeometryVertices(geometry)
         |. Some
       }
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. maxValue, vertices) => {
         let distanceOfPointsToCenter =
           switch (vertices) {
           | None => 0.
           | Some(vertices) =>
             SphereShapeUtils.findMaxDistanceOfPointsToCenter(
               (0., 0., 0.),
               vertices,
             )
           };

         Js.Math.max_float(distanceOfPointsToCenter, maxValue);
       },
       0.,
     )
  |> Js.Math.sqrt;

let setEditorCameraFocusTargetGameObject =
    (targetGameObject, editorState, engineState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|the editor camera should has arcballCameraController component|j},
                ~actual={j|not|j},
              ),
              () =>
              editorState
              |> SceneViewEditorService.unsafeGetEditCamera
              |. GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                   engineState,
                 )
              |> assertTrue
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  let editorCameraArcballControllerComponent =
    editorState
    |> SceneViewEditorService.unsafeGetEditCamera
    |. GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
         engineState,
       );
  let targetGameObjectTransform =
    engineState
    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
         targetGameObject,
       );

  let targetGameObjectPosition =
    engineState
    |> TransformEngineService.getPosition(targetGameObjectTransform);

  let arcballCameraControllerDistance =
    _getMaxDistanceOfPointsToCenter(targetGameObject, engineState)
    *. _getTargetGameObjectMaxScale(targetGameObjectTransform, engineState)
    *. 2.
    +. FocusDataUtils.getSmallGameObjectFocusDeviation();

  engineState |> SceneEngineService.isSceneGameObject(targetGameObject) ?
    _setArcballCameraControllerFocusRelatedAttribute(
      editorCameraArcballControllerComponent,
      (
        arcballCameraControllerDistance
        +. FocusDataUtils.getSceneGameObjectArcballCameraDistance(),
        targetGameObjectPosition,
      ),
      engineState,
    ) :
    _setArcballCameraControllerFocusRelatedAttribute(
      editorCameraArcballControllerComponent,
      (arcballCameraControllerDistance, targetGameObjectPosition),
      engineState,
    );
};