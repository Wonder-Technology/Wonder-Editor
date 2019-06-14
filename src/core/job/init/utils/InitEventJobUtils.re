open EventType;

let rec fromDomEventAndHandleError =
        (fromDomEventFunc, editorState, engineState) =>
  fromDomEventFunc(editorState, engineState)
  |> WonderBsMost.Most.recoverWith(e => {
       Console.throwFatal(e |> Obj.magic) |> ignore;

       fromDomEventAndHandleError(fromDomEventFunc, editorState, engineState);
     });

let initJob =
    (
      (fromDomEventAndHandleErrorFunc, bindDomEventToTriggerPointEventFunc),
      engineState,
    ) => {
  let editorState = StateEditorService.getState();
  let domEventStreamSubscription =
    fromDomEventAndHandleErrorFunc(editorState, engineState)
    |> WonderBsMost.Most.subscribe({
         "next": _ => (),
         "error": e => {
           Console.throwFatal(e |> Obj.magic) |> ignore;

           ();
         },
         "complete": () => (),
       });

  engineState
  |> ManageEventEngineService.setDomEventStreamSubscription(
       domEventStreamSubscription |> Obj.magic,
     )
  |> bindDomEventToTriggerPointEventFunc(editorState);
};

module DomEvent = {
  let isMouseInView = ((mouseX, mouseY), (x, y, width, height)) =>
    mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;

  let isTargetNotCanvas = event =>
    Obj.magic(event)##target##tagName !== "CANVAS";

  let fromPointDomEvent = (eventName, engineState) =>
    WonderBsMost.Most.fromEvent(eventName, EventUtils.getBody(), false);

  let fromDomEvent = (fromPCDomEventArrFunc, editorState, engineState) =>
    WonderBsMost.Most.mergeArray(
      BrowserEngineService.isPC(engineState) ?
        fromPCDomEventArrFunc(engineState) :
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

  let fromPCDragDomEventArr =
      (
        (
          setEventTargetFunc,
          convertDomEventToMouseEventFunc:
            (Wonderjs.EventType.domEventName, Dom.event) =>
            Wonderjs.EventType.mouseEvent,
          mapMouseEventToViewFunc,
          execMouseDragStartEventHandleFunc,
          execMouseDragOverEventHandleFunc,
          execMouseDragDropEventHandleFunc,
        ),
        engineState,
      ) => [|
    fromPointDomEvent("mousedown", engineState)
    |> WonderBsMost.Most.tap(event =>
         setEventTargetFunc(
           convertDomEventToMouseEventFunc(MouseDragStart, event),
         )
         |> mapMouseEventToViewFunc
         |> execMouseDragStartEventHandleFunc
       )
    |> WonderBsMost.Most.flatMap(event =>
         fromPointDomEvent("mousemove", engineState)
         /*!
           fix chrome bug for getMovementDeltaWhenPointerLockedAndFixBug:
           the first movementDelta->x >100!
                  */
         |> WonderBsMost.Most.skip(2)
         |> WonderBsMost.Most.until(
              fromPointDomEvent("mouseup", engineState)
              |> WonderBsMost.Most.tap(event =>
                   convertDomEventToMouseEventFunc(MouseDragDrop, event)
                   |> mapMouseEventToViewFunc
                   |> execMouseDragDropEventHandleFunc
                 ),
            )
       )
    |> WonderBsMost.Most.tap(event =>
         convertDomEventToMouseEventFunc(MouseDragOver, event)
         |> mapMouseEventToViewFunc
         |> execMouseDragOverEventHandleFunc
       ),
  |];
};

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
                    (
                      convertDomEventToPointEventFunc(
                        pointEventName,
                        mouseEvent,
                      )
                      |> pointEventToUserData
                    )
                    ->Some,
                  ),
                  engineState,
                );

              engineState;
            } :
            engineState,
      ~state=engineState,
      (),
    );

  let bindMouseEventToTriggerPointEvent =
      (
        (mouseEventName, customEventName, pointEventName),
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
};