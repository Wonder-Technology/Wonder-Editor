open EventType;

open EditorEventTargetType;

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
  let bindDomEventToTriggerPointEvent = (editorState, engineState) =>
    BrowserEngineService.isPC(engineState) ?
      engineState
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             Click,
             GameViewEventEditorService.getPointTapEventName(),
             PointTap,
           ),
           _isTriggerGameViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseUp,
             GameViewEventEditorService.getPointUpEventName(),
             PointUp,
           ),
           _isTriggerGameViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDown,
             GameViewEventEditorService.getPointDownEventName(),
             PointDown,
           ),
           _isTriggerGameViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseWheel,
             GameViewEventEditorService.getPointScaleEventName(),
             PointScale,
           ),
           _isTriggerGameViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseMove,
             GameViewEventEditorService.getPointMoveEventName(),
             PointMove,
           ),
           _isTriggerGameViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDragStart,
             GameViewEventEditorService.getPointDragStartEventName(),
             PointDragStart,
           ),
           _isTriggerGameViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDragOver,
             GameViewEventEditorService.getPointDragOverEventName(),
             PointDragOver,
           ),
           _isTriggerGameViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDragDrop,
             GameViewEventEditorService.getPointDragDropEventName(),
             PointDragDrop,
           ),
           _isTriggerGameViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             Click,
             SceneViewEventEditorService.getPointTapEventName(),
             PointTap,
           ),
           _isTriggerSceneViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseUp,
             SceneViewEventEditorService.getPointUpEventName(),
             PointUp,
           ),
           _isTriggerSceneViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDown,
             SceneViewEventEditorService.getPointDownEventName(),
             PointDown,
           ),
           _isTriggerSceneViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseWheel,
             SceneViewEventEditorService.getPointScaleEventName(),
             PointScale,
           ),
           _isTriggerSceneViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseMove,
             SceneViewEventEditorService.getPointMoveEventName(),
             PointMove,
           ),
           _isTriggerSceneViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDragStart,
             SceneViewEventEditorService.getPointDragStartEventName(),
             PointDragStart,
           ),
           _isTriggerSceneViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDragOver,
             SceneViewEventEditorService.getPointDragOverEventName(),
             PointDragOver,
           ),
           _isTriggerSceneViewEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDragDrop,
             SceneViewEventEditorService.getPointDragDropEventName(),
             PointDragDrop,
           ),
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

  let _setEventTarget = (({locationInView, event}: mouseEvent) as mouseEvent) => {
    let editorState = StateEditorService.getState();

    let eventTarget =
      InitEventJobUtils.DomEvent.isTargetNotCanvas(event) ?
        Other :
        InitEventJobUtils.DomEvent.isMouseInView(
          locationInView,
          SceneViewEditorService.unsafeGetViewRect(editorState),
        ) ?
          Scene :
          InitEventJobUtils.DomEvent.isMouseInView(
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
      switch (GameViewEditorService.getViewRect(editorState)) {
      | None => (0, 0, 0, 0)
      | Some(value) => value
      };

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
      _execKeyboardEventHandle(
        gameViewEventName |> EventType.editorDomEventNameToEngineDomEventName,
        event,
      ) :
      _isTriggerSceneViewEvent() ?
        _execKeyboardEventHandle(
          sceneViewEventName
          |> EventType.editorDomEventNameToEngineDomEventName,
          event,
        ) :
        ();

  let fromPCDomEventArr = engineState =>
    ArrayService.fastConcat(
      [|
        WonderBsMost.Most.fromEvent(
          "contextmenu",
          EventUtils.getBody(),
          false,
        )
        |> WonderBsMost.Most.tap(event => _preventContextMenuEvent(event)),
        InitEventJobUtils.DomEvent.fromPointDomEvent("click", engineState)
        |> WonderBsMost.Most.tap(event =>
             _mapAndExecMouseEventHandle(Click, event)
           ),
        InitEventJobUtils.DomEvent.fromPointDomEvent("mousedown", engineState)
        |> WonderBsMost.Most.tap(event =>
             _setEventTarget(_convertDomEventToMouseEvent(MouseDown, event))
             |> _mapMouseEventToView
             |> _execMouseEventHandle
           ),
        InitEventJobUtils.DomEvent.fromPointDomEvent("mouseup", engineState)
        |> WonderBsMost.Most.tap(event =>
             _mapAndExecMouseEventHandle(MouseUp, event)
           ),
        InitEventJobUtils.DomEvent.fromPointDomEvent("mousemove", engineState)
        |> WonderBsMost.Most.tap(event =>
             _mapAndExecMouseEventHandle(MouseMove, event)
           ),
        InitEventJobUtils.DomEvent.fromPointDomEvent(
          "mousewheel",
          engineState,
        )
        |> WonderBsMost.Most.tap(event =>
             _setEventTarget(_convertDomEventToMouseEvent(MouseWheel, event))
             |> _mapMouseEventToView
             |> _execMouseEventHandle
           ),
        _fromKeyboardDomEvent("keyup", engineState)
        |> WonderBsMost.Most.tap(event =>
             _execViewKeyboardEventHandle(
               KeyUp_SceneView,
               KeyUp_GameView,
               event,
             )
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
      |],
      InitEventJobUtils.DomEvent.fromPCDragDomEventArr(
        (
          _setEventTarget,
          _convertDomEventToMouseEvent,
          _mapMouseEventToView,
          _execMouseDragStartEventHandle,
          _execMouseDragOverEventHandle,
          _execMouseDragDropEventHandle,
        ),
        engineState,
      ),
    );
};

let initEventForEditorJob = (_, engineState) =>
  InitEventJobUtils.initJob(
    (
      InitEventJobUtils.fromDomEventAndHandleError(
        InitEventJobUtils.DomEvent.fromDomEvent(DomEvent.fromPCDomEventArr),
      ),
      PointEvent.bindDomEventToTriggerPointEvent,
    ),
    engineState,
  );