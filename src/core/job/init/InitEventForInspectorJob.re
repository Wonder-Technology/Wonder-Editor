/* TODO duplicate */

open EventType;

let _isTriggerInspectorEvent = () =>
  TargetEventEditorService.getInspectorEventTarget(
    StateEditorService.getState(),
  )
  === InspectorEventTargetType.Inspector;

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
        (domEventName, customEventName, pointEventName),
        (
          onDomEventFunc,
          convertDomEventToPointEventFunc,
          isTriggerCustomGlobalEventFunc,
        ),
        inspectorEngineState,
      ) =>
    onDomEventFunc(
      ~eventName=domEventName,
      ~handleFunc=
        (. mouseEvent, inspectorEngineState) =>
          isTriggerCustomGlobalEventFunc() ?
            {
              let (inspectorEngineState, _) =
                ManageEventEngineService.triggerCustomGlobalEvent(
                  CreateCustomEventEngineService.create(
                    customEventName,
                    (
                      convertDomEventToPointEventFunc(
                        pointEventName,
                        mouseEvent,
                      )
                      |> pointEventToUserData
                    )
                    ->Some,
                  ),
                  inspectorEngineState,
                );

              inspectorEngineState;
            } :
            inspectorEngineState,
      ~state=inspectorEngineState,
      (),
    );

  let _bindMouseEventToTriggerViewPointEvent =
      (
        (mouseEventName, customEventName, pointEventName),
        isTriggerCustomGlobalEventFunc,
        inspectorEngineState,
      ) =>
    _bindDomEventToTriggerPointEvent(
      (mouseEventName, customEventName, pointEventName),
      (
        ManageEventEngineService.onMouseEvent(~priority=0),
        _convertMouseEventToPointEvent,
        isTriggerCustomGlobalEventFunc,
      ),
      inspectorEngineState,
    );

  let _bindMouseEventToTriggerInspectorPointEvent =
      (
        (mouseEventName, customEventName, pointEventName),
        isTriggerCustomGlobalEventFunc,
        inspectorEngineState,
      ) =>
    _bindMouseEventToTriggerViewPointEvent(
      (mouseEventName, customEventName, pointEventName),
      isTriggerCustomGlobalEventFunc,
      inspectorEngineState,
    );

  let bindDomEventToTriggerPointEvent = (editorState, inspectorEngineState) =>
    BrowserEngineService.isPC(inspectorEngineState) ?
      inspectorEngineState
      |> _bindMouseEventToTriggerInspectorPointEvent(
           (
             MouseDragStart,
             InspectorEventEditorService.getPointDragStartEventName(),
             PointDragStart,
           ),
           _isTriggerInspectorEvent,
         )
      |> _bindMouseEventToTriggerInspectorPointEvent(
           (
             MouseDragOver,
             InspectorEventEditorService.getPointDragOverEventName(),
             PointDragOver,
           ),
           _isTriggerInspectorEvent,
         )
      |> _bindMouseEventToTriggerInspectorPointEvent(
           (
             MouseDragDrop,
             InspectorEventEditorService.getPointDragDropEventName(),
             PointDragDrop,
           ),
           _isTriggerInspectorEvent,
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

        inspectorEngineState;
      };
};

module DomEvent = {
  let _fromPointDomEvent = (eventName, inspectorEngineState) =>
    WonderBsMost.Most.fromEvent(eventName, EventUtils.getBody(), false);

  let _execMouseEventHandle = mouseEvent => {
    StateInspectorEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> StateInspectorEngineService.setState
    |> ignore;

    ();
  };

  let _execMouseMoveEventHandle = (mouseEventName, event) => {
    let inspectorEngineState = StateInspectorEngineService.unsafeGetState();

    let mouseEvent =
      event
      |> eventTargetToMouseDomEvent
      |> HandleMouseEventEngineService.convertMouseDomEventToMouseEvent(
           mouseEventName,
           _,
           inspectorEngineState,
         );

    inspectorEngineState
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> HandleMouseEventEngineService.setLastXYWhenMouseMove(mouseEvent)
    |> StateInspectorEngineService.setState
    |> ignore;

    ();
  };

  let _execMouseDragOverEventHandle = mouseEvent => {
    StateInspectorEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> HandleMouseEventEngineService.setLastXYByLocation(mouseEvent)
    |> StateInspectorEngineService.setState
    |> ignore;

    ();
  };

  let _execMouseDragStartEventHandle = mouseEvent => {
    StateInspectorEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> HandleMouseEventEngineService.setIsDrag(true)
    |> HandleMouseEventEngineService.setLastXY(None, None)
    |> StateInspectorEngineService.setState
    |> ignore;

    ();
  };

  let _execMouseDragDropEventHandle = mouseEvent => {
    StateInspectorEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
    |> HandleMouseEventEngineService.setIsDrag(false)
    |> StateInspectorEngineService.setState
    |> ignore;

    ();
  };

  let _execKeyboardEventHandle = (keyboardEventName, event) => {
    StateInspectorEngineService.unsafeGetState()
    |> HandleKeyboardEventEngineService.execEventHandle(
         keyboardEventName,
         event |> eventTargetToKeyboardDomEvent,
       )
    |> StateInspectorEngineService.setState
    |> ignore;

    ();
  };

  let _isMouseInView = ((mouseX, mouseY), (x, y, width, height)) =>
    mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;

  let _isTargetNotCanvas = event =>
    Obj.magic(event)##target##tagName !== "CANVAS";

  let _getInspectorCanvasRect = () => {
    let (width, height) = ResizeUtils.getInspectorCanvasSize();

    (0, 0, width, height);
  };

  let _setEventTarget = (({locationInView, event}: mouseEvent) as mouseEvent) => {
    let editorState = StateEditorService.getState();

    let eventTarget =
      _isTargetNotCanvas(event) ?
        InspectorEventTargetType.Other :
        _isMouseInView(locationInView, _getInspectorCanvasRect()) ?
          InspectorEventTargetType.Inspector : InspectorEventTargetType.Other;

    editorState
    |> TargetEventEditorService.setInspectorEventTarget(eventTarget)
    |> StateEditorService.setState
    |> ignore;

    mouseEvent;
  };

  let _convertDomEventToMouseEvent = (eventName, event) => {
    let inspectorEngineState = StateInspectorEngineService.unsafeGetState();

    event
    |> eventTargetToMouseDomEvent
    |> HandleMouseEventEngineService.convertMouseDomEventToMouseEvent(
         eventName,
         _,
         inspectorEngineState,
       );
  };
  let _mapAndExecMouseEventHandle = (eventName, event) =>
    _convertDomEventToMouseEvent(eventName, event)
    /* |> _mapMouseEventToView */
    |> _execMouseEventHandle;

  let _fromPCDomEventArr = inspectorEngineState => [|
    _fromPointDomEvent("mousedown", inspectorEngineState)
    |> WonderBsMost.Most.tap(event =>
         _setEventTarget(_convertDomEventToMouseEvent(MouseDragStart, event))
         /* |> _mapMouseEventToView */
         |> _execMouseDragStartEventHandle
       )
    |> WonderBsMost.Most.flatMap(event =>
         _fromPointDomEvent("mousemove", inspectorEngineState)
         /*!
           fix chrome bug for getMovementDeltaWhenPointerLocked:
           the first movementDelta->x >100!
                  */
         |> WonderBsMost.Most.skip(2)
         |> WonderBsMost.Most.until(
              _fromPointDomEvent("mouseup", inspectorEngineState)
              |> WonderBsMost.Most.tap(event =>
                   _convertDomEventToMouseEvent(MouseDragDrop, event)
                   /* |> _mapMouseEventToView */
                   |> _execMouseDragDropEventHandle
                 ),
            )
       )
    |> WonderBsMost.Most.tap(event =>
         _convertDomEventToMouseEvent(MouseDragOver, event)
         /* |> _mapMouseEventToView */
         |> _execMouseDragOverEventHandle
       ),
  |];

  let fromDomEvent = (editorState, inspectorEngineState) =>
    WonderBsMost.Most.mergeArray(
      BrowserEngineService.isPC(inspectorEngineState) ?
        _fromPCDomEventArr(inspectorEngineState) :
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

let rec _fromDomEventAndHandleError = (editorState, inspectorEngineState) =>
  DomEvent.fromDomEvent(editorState, inspectorEngineState)
  |> WonderBsMost.Most.recoverWith(e => {
       Console.throwFatal(e |> Obj.magic) |> ignore;

       _fromDomEventAndHandleError(editorState, inspectorEngineState);
     });

let initJob = (_, inspectorEngineState) => {
  let editorState = StateEditorService.getState();
  let domEventStreamSubscription =
    _fromDomEventAndHandleError(editorState, inspectorEngineState)
    |> WonderBsMost.Most.subscribe({
         "next": _ => (),
         "error": e => {
           Console.throwFatal(e |> Obj.magic) |> ignore;

           ();
         },
         "complete": () => (),
       });

  inspectorEngineState
  |> ManageEventEngineService.setDomEventStreamSubscription(
       domEventStreamSubscription |> Obj.magic,
     )
  |> PointEvent.bindDomEventToTriggerPointEvent(editorState);
};