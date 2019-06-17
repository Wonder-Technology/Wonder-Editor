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

let _isKeyAffectedArballCameraController = ({key}: EventType.keyboardEvent) =>
  switch (key) {
  | "a"
  | "s"
  | "q"
  | "e"
  | "d"
  | "w" => true
  | _ => false
  };

let _handleKeyDownForSceneView = (event, keydownHandleFunc, engineState) =>
  _isKeyAffectedArballCameraController(event)
  && FlyCameraEngineService.isTriggerKeydownEventHandler(event) ?
    {
      HandleDomEventEngineService.preventDefault(
        event.event |> EventType.keyboardDomEventToDomEvent,
      )
      |> ignore;

       keydownHandleFunc(. event, engineState);
    } :
    engineState;

let _handleKeyUpForSceneView = (event, keyupHandleFunc, engineState) => {
   keyupHandleFunc(. event, engineState);

};

let _bindFlyCameraControllerEvent =
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
    keyupHandleFunc,
  ) =
    FlyCameraEngineService.prepareBindEvent(cameraController, engineState);

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

  (engineState, (pointScaleHandleFunc, keydownHandleFunc, keyupHandleFunc));
};

let bindFlyCameraControllerEventForSceneView =
    (cameraController, mainEngineState) => {
  let (
    mainEngineState,
    (pointScaleHandleFunc, keydownHandleFunc, keyupHandleFunc),
  ) =
    _bindFlyCameraControllerEvent(
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

  let mainEngineState =
    ManageEventEngineService.onKeyboardEvent(
      ~eventName=EventType.KeyUp_SceneView |> Obj.magic,
      ~handleFunc=
        (. event: EventType.keyboardEvent, mainEngineState) =>
          _handleKeyUpForSceneView(event, keyupHandleFunc, mainEngineState),
      ~state=mainEngineState,
      (),
    );

  mainEngineState;
};

let _checkSceneAllFlyCameraControllersNotBindEvent = engineState =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect=
              {j|scene's all flyCameraControllers should not bind event|j},
            ~actual={j|bind|j},
          ),
          () =>
          HierarchyGameObjectEngineService.getAllGameObjects(
            SceneEngineService.getSceneGameObject(engineState),
            engineState,
          )
          |> Js.Array.filter(gameObject =>
               GameObjectComponentEngineService.hasFlyCameraControllerComponent(
                 gameObject,
                 engineState,
               )
             )
          |> Js.Array.filter(flyCameraController =>
               FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
                 flyCameraController,
                 engineState,
               )
             )
          |> Js.Array.length == 0
        )
      )
    )
  );

let bindGameViewActiveCameraFlyCameraControllerEvent =
    (gameObject, engineState) => {
  WonderLog.Contract.requireCheck(
    () => _checkSceneAllFlyCameraControllersNotBindEvent(engineState),
    StateEditorService.getStateIsDebug(),
  );

  engineState
  |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
       gameObject,
     )
  |> FlyCameraEngineService.bindFlyCameraControllerEventForGameView(
       _,
       engineState,
     );
};

let unbindGameViewActiveCameraFlyCameraControllerEvent =
    (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
       gameObject,
     )
  |> FlyCameraEngineService.unbindFlyCameraControllerEventForGameView(
       _,
       engineState,
     )
  |> WonderLog.Contract.ensureCheck(
       engineState =>
         _checkSceneAllFlyCameraControllersNotBindEvent(engineState),
       StateEditorService.getStateIsDebug(),
     );