open EventType;

let _loopBodyWhenStop = engineState =>
  SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
    engineState : engineState |> DirectorEngineService.loopBody(0.);

let _getBody = () => DomHelper.document##body |> bodyToEventTarget;

let _isTriggerGameViewEvent = () =>
  switch (EventEditorService.getEventTarget(StateEditorService.getState())) {
  | Scene => false
  | Game => true
  };

let _isTriggerSceneViewEvent = () =>
  switch (EventEditorService.getEventTarget(StateEditorService.getState())) {
  | Scene => true
  | Game => false
  };

let _fromPointDomEvent = (eventName, engineState) =>
  WonderBsMost.Most.fromEvent(
    eventName,
    ViewEngineService.unsafeGetCanvas(engineState) |> canvasToEventTarget,
    false,
  );

let _fromKeyboardDomEvent = (eventName, engineState) =>
  WonderBsMost.Most.fromEvent(eventName, _getBody(), false);

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
      (domEventName, customEventName, pointEventName),
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
            let (engineState, _) =
              ManageEventEngineService.triggerCustomGlobalEvent(
                CreateCustomEventEngineService.create(
                  customEventName,
                  convertDomEventToPointEventFunc(pointEventName, mouseEvent)
                  |> pointEventToUserData
                  |. Some,
                ),
                engineState,
              );

            _loopBodyWhenStop(engineState);
          } :
          engineState,
    ~state=engineState,
    (),
  );

let _bindMouseEventToTriggerPointEvent =
    (
      mouseEventName,
      customEventName,
      pointEventName,
      isTriggerCustomGlobalEventFunc,
      engineState,
    ) =>
  _bindDomEventToTriggerPointEvent(
    (mouseEventName, customEventName, pointEventName),
    (
      ManageEventEngineService.onMouseEvent(~priority=0),
      _convertMouseEventToPointEvent,
      isTriggerCustomGlobalEventFunc,
    ),
    engineState,
  );

let bindDomEventToTriggerPointEvent = engineState =>
  BrowserEngineService.isPC(engineState) ?
    engineState
    |> _bindMouseEventToTriggerPointEvent(
         Click,
         NameEventEngineService.getPointTapEventName(),
         PointTap,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseUp,
         NameEventEngineService.getPointUpEventName(),
         PointUp,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDown,
         NameEventEngineService.getPointDownEventName(),
         PointDown,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseWheel,
         NameEventEngineService.getPointScaleEventName(),
         PointScale,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseMove,
         NameEventEngineService.getPointMoveEventName(),
         PointMove,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDrag,
         NameEventEngineService.getPointDragEventName(),
         PointDrag,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         Click,
         EventEditorService.getPointTapEventName(),
         PointTap,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseUp,
         EventEditorService.getPointUpEventName(),
         PointUp,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDown,
         EventEditorService.getPointDownEventName(),
         PointDown,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseWheel,
         EventEditorService.getPointScaleEventName(),
         PointScale,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseMove,
         EventEditorService.getPointMoveEventName(),
         PointMove,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDrag,
         EventEditorService.getPointDragEventName(),
         PointDrag,
         _isTriggerSceneViewEvent,
       ) :
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="bindDomEventToTriggerPointEvent",
        ~description={j|unknown browser|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    );

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

let _execMouseDragingEventHandle = mouseEvent => {
  StateEngineService.unsafeGetState()
  |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
  |> HandleMouseEventEngineService.setLastXYByLocation(mouseEvent)
  |> StateEngineService.setState
  |> ignore;

  ();
};

let _execMouseDragStartEventHandle = () => {
  StateEngineService.unsafeGetState()
  |> HandleMouseEventEngineService.setIsDrag(true)
  |> HandleMouseEventEngineService.setLastXY(None, None)
  |> StateEngineService.setState
  |> ignore;

  ();
};

let _execMouseDragEndEventHandle = () => {
  StateEngineService.unsafeGetState()
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

let _setEventTarget = (({locationInView}: mouseEvent) as mouseEvent) => {
  let editorState = StateEditorService.getState();

  let eventTarget =
    _isMouseInView(
      locationInView,
      SceneViewEditorService.unsafeGetViewRect(editorState),
    ) ?
      Scene :
      _isMouseInView(
        locationInView,
        GameViewEditorService.unsafeGetViewRect(editorState),
      ) ?
        Game : EventEditorService.getEventTarget(editorState);

  editorState
  |> EventEditorService.setEventTarget(eventTarget)
  |> StateEditorService.setState
  |> ignore;

  mouseEvent;
};

let _mapMouseEventToView = (({locationInView}: mouseEvent) as mouseEvent) => {
  let editorState = StateEditorService.getState();

  let (gx, gy, _, _) = GameViewEditorService.unsafeGetViewRect(editorState);

  let (locationInViewX, locationInViewY) = locationInView;

  switch (EventEditorService.getEventTarget(editorState)) {
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
    (sceneViewEventName, gameViewEventName, event) => {
  _isTriggerGameViewEvent() ?
    _execKeyboardEventHandle(gameViewEventName, event) :
    _execKeyboardEventHandle(sceneViewEventName |> Obj.magic, event);

  _loopBodyWhenStop |> StateLogicService.getAndSetEngineState;
};

let _fromPCDomEventArr = engineState => [|
  WonderBsMost.Most.fromEvent("contextmenu", _getBody(), false)
  |> WonderBsMost.Most.tap(event => _preventContextMenuEvent(event)),
  _fromPointDomEvent("click", engineState)
  |> WonderBsMost.Most.tap(event =>
       _setEventTarget(_convertDomEventToMouseEvent(Click, event))
       |> _mapMouseEventToView
       |> _execMouseEventHandle
     ),
  _fromPointDomEvent("mousedown", engineState)
  |> WonderBsMost.Most.tap(event =>
       _mapAndExecMouseEventHandle(MouseDown, event)
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
  |> WonderBsMost.Most.tap(event => _execMouseDragStartEventHandle())
  |> WonderBsMost.Most.flatMap(event =>
       _fromPointDomEvent("mousemove", engineState)
       |> WonderBsMost.Most.until(
            _fromPointDomEvent("mouseup", engineState)
            |> WonderBsMost.Most.tap(event => _execMouseDragEndEventHandle()),
          )
     )
  |> WonderBsMost.Most.tap(event =>
       _convertDomEventToMouseEvent(MouseDrag, event)
       |> _mapMouseEventToView
       |> _execMouseDragingEventHandle
     ),
  _fromKeyboardDomEvent("keyup", engineState)
  |> WonderBsMost.Most.tap(event =>
       _execViewKeyboardEventHandle(KeyUp_editor, KeyUp, event)
     ),
  _fromKeyboardDomEvent("keydown", engineState)
  |> WonderBsMost.Most.tap(event =>
       _execViewKeyboardEventHandle(KeyDown_editor, KeyDown, event)
     ),
  _fromKeyboardDomEvent("keypress", engineState)
  |> WonderBsMost.Most.tap(event =>
       _execViewKeyboardEventHandle(KeyPress_editor, KeyPress, event)
     ),
|];

let fromDomEvent = engineState =>
  WonderBsMost.Most.mergeArray(
    BrowserEngineService.isPC(engineState) ?
      _fromPCDomEventArr(engineState) :
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="fromDomEvent",
          ~description={j|unknown browser|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      ),
  );

let handleDomEventStreamError = e => {
  let message = Obj.magic(e)##message;
  let stack = Obj.magic(e)##stack;

  WonderLog.Log.debug(
    WonderLog.Log.buildDebugMessage(
      ~description={j|from dom event stream error|j},
      ~params={j|message:$message\nstack:$stack|j},
    ),
    StateEditorService.getStateIsDebug(),
  );
};

let initEventForEditorJob = (_, engineState) => {
  let domEventStreamSubscription =
    fromDomEvent(engineState)
    |> WonderBsMost.Most.subscribe({
         "next": _ => (),
         "error": e => handleDomEventStreamError(e),
         "complete": () => (),
       });

  engineState
  |> ManageEventEngineService.setDomEventStreamSubscription(
       domEventStreamSubscription,
     )
  |> bindDomEventToTriggerPointEvent;
};