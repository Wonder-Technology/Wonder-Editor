open ShapeType;

let _renderWhenStop = (event, (handleFunc, renderWhenStopFunc), engineState) => {
  let (engineState, event) = handleFunc(. event, engineState);

  let engineState = renderWhenStopFunc(engineState);

  (engineState, event);
};

let _handleEventFuncForSceneView = (event, handleFunc, engineState) =>
  MouseEventService.isRightMouseButton(event) ?
    _renderWhenStop(
      event,
      (handleFunc, StateLogicService.renderWhenStop),
      engineState,
    ) :
    (engineState, event);

let _handleEventFuncForInspector = (event, handleFunc, inspectorEngineState) =>
  _renderWhenStop(
    event,
    (handleFunc, StateLogicService.renderInspectorEngineStateWhenStop),
    inspectorEngineState,
  );

let _isKeyAffectedArballCameraController = ({key}: EventType.keyboardEvent) =>
  switch (key) {
  | "a"
  | "s"
  | "d"
  | "w" => true
  | _ => false
  };

let _handleKeyDownForSceneView = (event, keydownHandleFunc, engineState) =>
  _isKeyAffectedArballCameraController(event)
  && ArcballCameraEngineService.isTriggerKeydownEventHandler(event) ?
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

let _bindArcballCameraControllerEvent =
    (
      cameraController,
      (
        pointDragStartEventName,
        pointDragOverEventName,
        pointDragDropEventName,
      ),
      handleEventFunc,
      engineState,
    ) => {
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
      ~eventName=pointDragStartEventName,
      ~handleFunc=
        (. event, engineState) =>
          handleEventFunc(event, pointDragStartHandleFunc, engineState),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=pointDragOverEventName,
      ~handleFunc=
        (. event, engineState) =>
          handleEventFunc(event, pointDragOverHandleFunc, engineState),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=pointDragDropEventName,
      ~handleFunc=
        (. event, engineState) =>
          handleEventFunc(event, pointDragDropHandleFunc, engineState),
      ~state=engineState,
      (),
    );

  (engineState, (pointScaleHandleFunc, keydownHandleFunc));
};

let bindArcballCameraControllerEventForSceneView =
    (cameraController, mainEngineState) => {
  let (mainEngineState, (pointScaleHandleFunc, keydownHandleFunc)) =
    _bindArcballCameraControllerEvent(
      cameraController,
      (
        SceneViewEventEditorService.getPointDragStartEventName(),
        SceneViewEventEditorService.getPointDragOverEventName(),
        SceneViewEventEditorService.getPointDragDropEventName(),
      ),
      _handleEventFuncForSceneView,
      mainEngineState,
    );

  let mainEngineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointScaleEventName(),
      ~handleFunc=
        (. event, mainEngineState) =>
          _renderWhenStop(
            event,
            (pointScaleHandleFunc, StateLogicService.renderWhenStop),
            mainEngineState,
          ),
      ~state=mainEngineState,
      (),
    );

  let mainEngineState =
    ManageEventEngineService.onKeyboardEvent(
      ~eventName=EventType.KeyDown_SceneView |> Obj.magic,
      ~handleFunc=
        (. event: EventType.keyboardEvent, mainEngineState) =>
          _handleKeyDownForSceneView(
            event,
            keydownHandleFunc,
            mainEngineState,
          ),
      ~state=mainEngineState,
      (),
    );

  mainEngineState;
};

let bindArcballCameraControllerEventForInspector =
    (cameraController, inspectorEngineState) => {
  let (inspectorEngineState, _) =
    _bindArcballCameraControllerEvent(
      cameraController,
      (
        InspectorEventEditorService.getPointDragStartEventName(),
        InspectorEventEditorService.getPointDragOverEventName(),
        InspectorEventEditorService.getPointDragDropEventName(),
      ),
      _handleEventFuncForInspector,
      inspectorEngineState,
    );

  inspectorEngineState;
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

let bindGameViewActiveCameraArcballCameraControllerEvent =
    (gameObject, engineState) => {
  WonderLog.Contract.requireCheck(
    () => _checkSceneAllArcballCameraControllersNotBindEvent(engineState),
    StateEditorService.getStateIsDebug(),
  );

  engineState
  |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
       gameObject,
     )
  |> ArcballCameraEngineService.bindArcballCameraControllerEventForGameView(
       _,
       engineState,
     );
};

let unbindGameViewActiveCameraArcballCameraControllerEvent =
    (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
       gameObject,
     )
  |> ArcballCameraEngineService.unbindArcballCameraControllerEventForGameView(
       _,
       engineState,
     )
  |> WonderLog.Contract.ensureCheck(
       engineState =>
         _checkSceneAllArcballCameraControllersNotBindEvent(engineState),
       StateEditorService.getStateIsDebug(),
     );