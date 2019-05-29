open ShapeType;

let _renderWhenStop = (event, (handleFunc, renderWhenStopFunc), engineState) => {
  let (engineState, event) = handleFunc(. event, engineState);

  let engineState = renderWhenStopFunc(engineState);

  (engineState, event);
};

let _renderWhenStopForSceneView = (event, handleFunc, engineState) =>
  _renderWhenStop(
    event,
    (handleFunc, StateLogicService.renderWhenStop),
    engineState,
  );

let _renderWhenStopForInspector = (event, handleFunc, inspectorEngineState) =>
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
      renderWhenStopFunc,
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
          MouseEventService.isRightMouseButton(event) ?
            renderWhenStopFunc(event, pointDragStartHandleFunc, engineState) :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=pointDragOverEventName,
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isRightMouseButton(event) ?
            renderWhenStopFunc(event, pointDragOverHandleFunc, engineState) :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=pointDragDropEventName,
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isRightMouseButton(event) ?
            renderWhenStopFunc(event, pointDragDropHandleFunc, engineState) :
            (engineState, event),
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
      _renderWhenStopForSceneView,
      mainEngineState,
    );

  let mainEngineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointScaleEventName(),
      ~handleFunc=
        (. event, mainEngineState) =>
          _renderWhenStopForSceneView(
            event,
            pointScaleHandleFunc,
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
      _renderWhenStopForInspector,
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