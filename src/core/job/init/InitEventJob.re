open EventType;

let _isTriggerGameViewEvent = () =>
  TargetEventEditorService.getEventTarget(StateEditorService.getState())
  === Game;

let _isTriggerSceneViewEvent = () =>
  TargetEventEditorService.getEventTarget(StateEditorService.getState())
  === Scene;

let _isTriggerOtherEvent = () =>
  TargetEventEditorService.getEventTarget(StateEditorService.getState())
  === Other;

module PointEvent = {
  let _convertMouseEventToPointEvent =
      (
        eventName,
        {location, locationInView, button, wheel, movementDelta, event}: mouseEvent,
      )
      : pointEvent => {
    name: eventName,
    location,
    locationInView,
    button: Some(button),
    wheel: Some(wheel),
    movementDelta,
    event: event |> mouseDomEventToPointDomEvent,
  };

  let _bindDomEventToTriggerPointEvent =
      (
        (domEventName, customEventName, pointEventName, eventTarget),
        (
          onDomEventFunc,
          convertDomEventToPointEventFunc,
          isTriggerCustomGlobalEventFunc,
        ),
        engineState,
      ) =>
    onDomEventFunc(
      ~eventName=domEventName,
      ~handleFunc=
        (. mouseEvent, engineState) =>
          isTriggerCustomGlobalEventFunc() ?
            {
              /* let engineState = _triggerRefreshInspectorEvent(engineState); */

              let (engineState, _) =
                ManageEventEngineService.triggerCustomGlobalEvent(
                  CreateCustomEventEngineService.create(
                    customEventName,
                    convertDomEventToPointEventFunc(
                      pointEventName,
                      mouseEvent,
                    )
                    |> pointEventToUserData
                    |. Some,
                  ),
                  engineState,
                );

              switch (eventTarget) {
              | Scene => StateLogicService.loopBodyWhenStop(engineState)
              | _ => engineState
              };
            } :
            engineState,
      ~state=engineState,
      (),
    );

  let _bindMouseEventToTriggerViewPointEvent =
      (
        mouseEventName,
        customEventName,
        pointEventName,
        eventTarget,
        isTriggerCustomGlobalEventFunc,
        engineState,
      ) =>
    _bindDomEventToTriggerPointEvent(
      (mouseEventName, customEventName, pointEventName, eventTarget),
      (
        ManageEventEngineService.onMouseEvent(~priority=0),
        _convertMouseEventToPointEvent,
        isTriggerCustomGlobalEventFunc,
      ),
      engineState,
    );

  let _bindMouseEventToTriggerSceneViewPointEvent =
      (
        mouseEventName,
        customEventName,
        pointEventName,
        isTriggerCustomGlobalEventFunc,
        engineState,
      ) =>
    _bindMouseEventToTriggerViewPointEvent(
      mouseEventName,
      customEventName,
      pointEventName,
      Scene,
      isTriggerCustomGlobalEventFunc,
      engineState,
    );

  let _bindMouseEventToTriggerGameViewPointEvent =
      (
        mouseEventName,
        customEventName,
        pointEventName,
        isTriggerCustomGlobalEventFunc,
        engineState,
      ) =>
    _bindMouseEventToTriggerViewPointEvent(
      mouseEventName,
      customEventName,
      pointEventName,
      Game,
      isTriggerCustomGlobalEventFunc,
      engineState,
    );

  let bindDomEventToTriggerPointEvent = (editorState, engineState) =>
    BrowserEngineService.isPC(engineState) ?
      engineState
      |> _bindMouseEventToTriggerGameViewPointEvent(
           Click,
           GameViewEventEditorService.getPointTapEventName(),
           PointTap,
           _isTriggerGameViewEvent,
         )
      |> _bindMouseEventToTriggerGameViewPointEvent(
           MouseUp,
           GameViewEventEditorService.getPointUpEventName(),
           PointUp,
           _isTriggerGameViewEvent,
         )
      |> _bindMouseEventToTriggerGameViewPointEvent(
           MouseDown,
           GameViewEventEditorService.getPointDownEventName(),
           PointDown,
           _isTriggerGameViewEvent,
         )
      |> _bindMouseEventToTriggerGameViewPointEvent(
           MouseWheel,
           GameViewEventEditorService.getPointScaleEventName(),
           PointScale,
           _isTriggerGameViewEvent,
         )
      |> _bindMouseEventToTriggerGameViewPointEvent(
           MouseMove,
           GameViewEventEditorService.getPointMoveEventName(),
           PointMove,
           _isTriggerGameViewEvent,
         )
      |> _bindMouseEventToTriggerGameViewPointEvent(
           MouseDragStart,
           GameViewEventEditorService.getPointDragStartEventName(),
           PointDragStart,
           _isTriggerGameViewEvent,
         )
      |> _bindMouseEventToTriggerGameViewPointEvent(
           MouseDragOver,
           GameViewEventEditorService.getPointDragOverEventName(),
           PointDragOver,
           _isTriggerGameViewEvent,
         )
      |> _bindMouseEventToTriggerGameViewPointEvent(
           MouseDragDrop,
           GameViewEventEditorService.getPointDragDropEventName(),
           PointDragDrop,
           _isTriggerGameViewEvent,
         )
      |> _bindMouseEventToTriggerSceneViewPointEvent(
           Click,
           SceneViewEventEditorService.getPointTapEventName(),
           PointTap,
           _isTriggerSceneViewEvent,
         )
      |> _bindMouseEventToTriggerSceneViewPointEvent(
           MouseUp,
           SceneViewEventEditorService.getPointUpEventName(),
           PointUp,
           _isTriggerSceneViewEvent,
         )
      |> _bindMouseEventToTriggerSceneViewPointEvent(
           MouseDown,
           SceneViewEventEditorService.getPointDownEventName(),
           PointDown,
           _isTriggerSceneViewEvent,
         )
      |> _bindMouseEventToTriggerSceneViewPointEvent(
           MouseWheel,
           SceneViewEventEditorService.getPointScaleEventName(),
           PointScale,
           _isTriggerSceneViewEvent,
         )
      |> _bindMouseEventToTriggerSceneViewPointEvent(
           MouseMove,
           SceneViewEventEditorService.getPointMoveEventName(),
           PointMove,
           _isTriggerSceneViewEvent,
         )
      |> _bindMouseEventToTriggerSceneViewPointEvent(
           MouseDragStart,
           SceneViewEventEditorService.getPointDragStartEventName(),
           PointDragStart,
           _isTriggerSceneViewEvent,
         )
      |> _bindMouseEventToTriggerSceneViewPointEvent(
           MouseDragOver,
           SceneViewEventEditorService.getPointDragOverEventName(),
           PointDragOver,
           _isTriggerSceneViewEvent,
         )
      |> _bindMouseEventToTriggerSceneViewPointEvent(
           MouseDragDrop,
           SceneViewEventEditorService.getPointDragDropEventName(),
           PointDragDrop,
           _isTriggerSceneViewEvent,
         ) :
      {
        ConsoleUtils.error(
          LogUtils.buildErrorMessage(
            ~description={j|unknown browser|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
          editorState,
        );

        engineState;
      };
};

module DomEvent = {
  let _fromPointDomEvent = (eventName, engineState) =>
    WonderBsMost.Most.fromEvent(eventName, EventUtils.getBody(), false);

  let _fromKeyboardDomEvent = (eventName, engineState) =>
    WonderBsMost.Most.fromEvent(eventName, EventUtils.getBody(), false);

  let _preventContextMenuEvent = event => {
    HandleDomEventEngineService.preventDefault(
      event |> EventType.eventTargetToDomEvent,
    )
    |> ignore;

    ();
  };

  let _execMouseEventHandle = mouseEvent => {
    StateEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> StateEngineService.setState
    |> ignore;

    ();
  };

  let _execMouseMoveEventHandle = (mouseEventName, event) => {
    let engineState = StateEngineService.unsafeGetState();

    let mouseEvent =
      event
      |> eventTargetToMouseDomEvent
      |> HandleMouseEventEngineService.convertMouseDomEventToMouseEvent(
           mouseEventName,
           _,
           engineState,
         );

    engineState
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> HandleMouseEventEngineService.setLastXYWhenMouseMove(mouseEvent)
    |> StateEngineService.setState
    |> ignore;

    ();
  };

  let _execMouseDragOverEventHandle = mouseEvent => {
    StateEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> HandleMouseEventEngineService.setLastXYByLocation(mouseEvent)
    |> StateEngineService.setState
    |> ignore;

    ();
  };

  let _execMouseDragStartEventHandle = mouseEvent => {
    StateEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> HandleMouseEventEngineService.setIsDrag(true)
    |> HandleMouseEventEngineService.setLastXY(None, None)
    |> StateEngineService.setState
    |> ignore;

    ();
  };

  let _execMouseDragDropEventHandle = mouseEvent => {
    StateEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> HandleMouseEventEngineService.setIsDrag(false)
    |> StateEngineService.setState
    |> ignore;

    ();
  };

  let _execKeyboardEventHandle = (keyboardEventName, event) => {
    StateEngineService.unsafeGetState()
    |> HandleKeyboardEventEngineService.execEventHandle(
         keyboardEventName,
         event |> eventTargetToKeyboardDomEvent,
       )
    |> StateEngineService.setState
    |> ignore;

    ();
  };

  let _isMouseInView = ((mouseX, mouseY), (x, y, width, height)) =>
    mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;

  let _isTargetNotCanvas = event =>
    Obj.magic(event)##target##tagName !== "CANVAS";

  let _setEventTarget = (({locationInView, event}: mouseEvent) as mouseEvent) => {
    let editorState = StateEditorService.getState();

    let eventTarget =
      _isTargetNotCanvas(event) ?
        Other :
        _isMouseInView(
          locationInView,
          SceneViewEditorService.unsafeGetViewRect(editorState),
        ) ?
          Scene :
          _isMouseInView(
            locationInView,
            GameViewEditorService.unsafeGetViewRect(editorState),
          ) ?
            Game : Other;

    editorState
    |> TargetEventEditorService.setEventTarget(eventTarget)
    |> StateEditorService.setState
    |> ignore;

    mouseEvent;
  };

  let _mapMouseEventToView = (({locationInView}: mouseEvent) as mouseEvent) => {
    let editorState = StateEditorService.getState();

    let (gx, gy, _, _) =
      GameViewEditorService.unsafeGetViewRect(editorState);

    let (locationInViewX, locationInViewY) = locationInView;

    switch (TargetEventEditorService.getEventTarget(editorState)) {
    | Other
    | Scene => mouseEvent
    | Game => {
        ...mouseEvent,
        locationInView: (locationInViewX - gx, locationInViewY - gy),
      }
    };
  };

  let _convertDomEventToMouseEvent = (eventName, event) => {
    let engineState = StateEngineService.unsafeGetState();

    event
    |> eventTargetToMouseDomEvent
    |> HandleMouseEventEngineService.convertMouseDomEventToMouseEvent(
         eventName,
         _,
         engineState,
       );
  };
  let _mapAndExecMouseEventHandle = (eventName, event) =>
    _convertDomEventToMouseEvent(eventName, event)
    |> _mapMouseEventToView
    |> _execMouseEventHandle;

  let _execViewKeyboardEventHandle =
      (sceneViewEventName, gameViewEventName, event) =>
    _isTriggerGameViewEvent() ?
      /* _triggerRefreshInspectorEvent |> StateLogicService.getAndSetEngineState; */
      _execKeyboardEventHandle(
        gameViewEventName |> EventType.editorDomEventNameToEngineDomEventName,
        event,
      ) :
      _isTriggerSceneViewEvent() ?
        {
          _execKeyboardEventHandle(
            sceneViewEventName
            |> EventType.editorDomEventNameToEngineDomEventName,
            event,
          );

          StateLogicService.loopBodyWhenStop
          |> StateLogicService.getAndSetEngineState;
        } :
        ();

  let _fromPCDomEventArr = engineState => [|
    WonderBsMost.Most.fromEvent("contextmenu", EventUtils.getBody(), false)
    |> WonderBsMost.Most.tap(event => _preventContextMenuEvent(event)),
    _fromPointDomEvent("click", engineState)
    |> WonderBsMost.Most.tap(event =>
         _mapAndExecMouseEventHandle(Click, event)
       ),
    _fromPointDomEvent("mousedown", engineState)
    |> WonderBsMost.Most.tap(event =>
         _setEventTarget(_convertDomEventToMouseEvent(MouseDown, event))
         |> _mapMouseEventToView
         |> _execMouseEventHandle
       ),
    _fromPointDomEvent("mouseup", engineState)
    |> WonderBsMost.Most.tap(event =>
         _mapAndExecMouseEventHandle(MouseUp, event)
       ),
    _fromPointDomEvent("mousemove", engineState)
    |> WonderBsMost.Most.tap(event =>
         _mapAndExecMouseEventHandle(MouseMove, event)
       ),
    _fromPointDomEvent("mousewheel", engineState)
    |> WonderBsMost.Most.tap(event =>
         _mapAndExecMouseEventHandle(MouseWheel, event)
       ),
    _fromPointDomEvent("mousedown", engineState)
    |> WonderBsMost.Most.tap(event =>
         _convertDomEventToMouseEvent(MouseDragStart, event)
         |> _mapMouseEventToView
         |> _execMouseDragStartEventHandle
       )
    |> WonderBsMost.Most.flatMap(event =>
         _fromPointDomEvent("mousemove", engineState)
         |> WonderBsMost.Most.until(
              _fromPointDomEvent("mouseup", engineState)
              |> WonderBsMost.Most.tap(event =>
                   _convertDomEventToMouseEvent(MouseDragDrop, event)
                   |> _mapMouseEventToView
                   |> _execMouseDragDropEventHandle
                 ),
            )
       )
    |> WonderBsMost.Most.tap(event =>
         _convertDomEventToMouseEvent(MouseDragOver, event)
         |> _mapMouseEventToView
         |> _execMouseDragOverEventHandle
       ),
    _fromKeyboardDomEvent("keyup", engineState)
    |> WonderBsMost.Most.tap(event =>
         _execViewKeyboardEventHandle(KeyUp_SceneView, KeyUp_GameView, event)
       ),
    _fromKeyboardDomEvent("keydown", engineState)
    |> WonderBsMost.Most.tap(event =>
         _execViewKeyboardEventHandle(
           KeyDown_SceneView,
           KeyDown_GameView,
           event,
         )
       ),
    _fromKeyboardDomEvent("keypress", engineState)
    |> WonderBsMost.Most.tap(event =>
         _execViewKeyboardEventHandle(
           KeyPress_SceneView,
           KeyPress_GameView,
           event,
         )
       ),
  |];

  let fromDomEvent = (editorState, engineState) =>
    WonderBsMost.Most.mergeArray(
      BrowserEngineService.isPC(engineState) ?
        _fromPCDomEventArr(engineState) :
        {
          ConsoleUtils.error(
            LogUtils.buildErrorMessage(
              ~description={j|unknown browser|j},
              ~reason="",
              ~solution={j||j},
              ~params={j||j},
            ),
            editorState,
          );

          [||];
        },
    );

  let handleDomEventStreamError = (e, editorState) => {
    let message = Obj.magic(e)##message;
    let stack = Obj.magic(e)##stack;

    ConsoleUtils.debug(
      LogUtils.buildDebugMessage(
        ~description={j|from dom event stream error|j},
        ~params={j|message:$message\nstack:$stack|j},
      ),
      StateEditorService.getStateIsDebug(),
      editorState,
    );
  };
};

let initEventForEditorJob = (_, engineState) => {
  let editorState = StateEditorService.getState();
  let domEventStreamSubscription =
    DomEvent.fromDomEvent(editorState, engineState)
    |> WonderBsMost.Most.subscribe({
         "next": _ => (),
         "error": e => DomEvent.handleDomEventStreamError(e, editorState),
         "complete": () => (),
       });

  engineState
  |> ManageEventEngineService.setDomEventStreamSubscription(
       domEventStreamSubscription,
     )
  |> PointEvent.bindDomEventToTriggerPointEvent(editorState);
};