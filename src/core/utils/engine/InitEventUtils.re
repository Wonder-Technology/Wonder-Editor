open Wonderjs;

open StateDataMainType;

open EventType;

let _getDefaultDom = () => DomExtend.document##body;

let _fromDomEvent = (eventName, canvasDom) =>
  WonderBsMost.Most.fromEvent(
    eventName,
    canvasDom |> DomHelperType.canvasToEventTarget,
    false,
  );

let _execMouseEventHandle =
    (
      mouseEventName,
      event,
      stateData,
      (getEnginStateFunc, setEngineStateFunc),
    ) => {
  getEnginStateFunc(stateData)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> setEngineStateFunc(stateData)
  |> ignore;

  ();
};

let _fromPCDomEventArr =
    (canvasDom, stateData, (getEnginStateFunc, setEngineStateFunc)) => [|
  _fromDomEvent("click", canvasDom)
  |> WonderBsMost.Most.tap(event =>
       _execMouseEventHandle(
         Click,
         event,
         stateData,
         (getEnginStateFunc, setEngineStateFunc),
       )
     ),
  /* _fromDomEvent("mousedown")
     |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseDown, event)),
     _fromDomEvent("mouseup")
     |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseUp, event)),
     _fromDomEvent("mousemove")
     |> WonderBsMost.Most.tap(event =>
          _execMouseMoveEventHandle(MouseMove, event)
        ),
     _fromDomEvent("mousewheel")
     |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseWheel, event)),
     _fromDomEvent("mousedown")
     |> WonderBsMost.Most.tap(event => _execMouseDragStartEventHandle())
     |> WonderBsMost.Most.flatMap(event =>
          _fromDomEvent("mousemove")
          |> WonderBsMost.Most.until(
               _fromDomEvent("mouseup")
               |> WonderBsMost.Most.tap(event => _execMouseDragEndEventHandle()),
             )
        )
     |> WonderBsMost.Most.tap(event =>
          _execMouseDragingEventHandle(MouseDrag, event)
        ), */
|];

let _fromDomEvent =
    (
      canvasDom,
      {browserDetectRecord},
      stateData,
      (getEnginStateFunc, setEngineStateFunc),
    ) =>
  WonderBsMost.Most.mergeArray(
    switch (browserDetectRecord.browser) {
    | Chrome
    | Firefox =>
      _fromPCDomEventArr(
        canvasDom,
        stateData,
        (getEnginStateFunc, setEngineStateFunc),
      )
    | Android
    | IOS =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_fromDomEvent",
          ~description={j|not support mobile|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    | browser =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_fromDomEvent",
          ~description={j|unknown browser|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|browser:$browser|j},
        ),
      )
    },
  );

let _handleDomEventStreamError = e => {
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

let _bindDomEventToTriggerPointEvent =
    (
      (domEventName, customEventName, pointEventName),
      (onDomEventFunc, convertDomEventToPointEventFunc),
      state,
    ) =>
  onDomEventFunc(
    ~eventName=domEventName,
    ~handleFunc=
      (. mouseEvent, state) =>
        ManageEventMainService.triggerCustomGlobalEvent(
          CreateCustomEventMainService.create(
            customEventName,
            convertDomEventToPointEventFunc(pointEventName, mouseEvent)
            |> pointEventToUserData
            |. Some,
          ),
          state,
        ),
    ~state,
    (),
  );

let _convertMouseEventToPointEvent =
    (
      eventName,
      {location, locationInView, button, wheel, movementDelta, event}: mouseEvent,
    ) => {
  name: eventName,
  location,
  locationInView,
  button: Some(button),
  wheel: Some(wheel),
  movementDelta,
  event: event |> mouseDomEventToPointDomEvent,
};

let _bindMouseEventToTriggerPointEvent =
    (mouseEventName, customEventName, pointEventName, state) =>
  _bindDomEventToTriggerPointEvent(
    (mouseEventName, customEventName, pointEventName),
    (
      ManageEventMainService.onMouseEvent(~priority=0),
      _convertMouseEventToPointEvent,
    ),
    state,
  );

let _bindDomEventToTriggerPointEvent = ({browserDetectRecord} as state) =>
  switch (browserDetectRecord.browser) {
  | Chrome
  | Firefox =>
    state
    |> _bindMouseEventToTriggerPointEvent(
         Click,
         NameEventService.getPointTapEventName(),
         PointTap,
       )
       /* TODO open */
  /* |> _bindMouseEventToTriggerPointEvent(
          MouseUp,
          NameEventService.getPointUpEventName(),
          PointUp,
        )
     |> _bindMouseEventToTriggerPointEvent(
          MouseDown,
          NameEventService.getPointDownEventName(),
          PointDown,
        )
     |> _bindMouseEventToTriggerPointEvent(
          MouseWheel,
          NameEventService.getPointScaleEventName(),
          PointScale,
        )
     |> _bindMouseEventToTriggerPointEvent(
          MouseMove,
          NameEventService.getPointMoveEventName(),
          PointMove,
        )
     |> _bindMouseEventToTriggerPointEvent(
          MouseDrag,
          NameEventService.getPointDragEventName(),
          PointDrag,
        ) */
  | Android
  | IOS =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_bindDomEventToTriggerPointEvent",
        ~description={j|not support mobile|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | browser =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_bindDomEventToTriggerPointEvent",
        ~description={j|unknown browser|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|browser:$browser|j},
      ),
    )
  };

let initEvent =
    (
      canvasDom,
      stateData,
      (getEnginStateFunc, setEngineStateFunc),
      engineState,
    ) => {
  let domEventStreamSubscription =
    _fromDomEvent(
      canvasDom,
      engineState,
      stateData,
      (getEnginStateFunc, setEngineStateFunc),
    )
    |> WonderBsMost.Most.subscribe({
         "next": _ => (),
         "error": e => _handleDomEventStreamError(e),
         "complete": () => (),
       });

  engineState
  |> ManageEventMainService.setDomEventStreamSubscription(
       domEventStreamSubscription,
     )
  |> _bindDomEventToTriggerPointEvent;
};