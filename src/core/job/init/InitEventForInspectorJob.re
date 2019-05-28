open EventType;

let _isTriggerInspectorEvent = () =>
  TargetEventEditorService.getInspectorEventTarget(
    StateEditorService.getState(),
  )
  === InspectorEventTargetType.Inspector;

module PointEvent = {
  let bindDomEventToTriggerPointEvent = (editorState, inspectorEngineState) =>
    BrowserEngineService.isPC(inspectorEngineState) ?
      inspectorEngineState
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDragStart,
             InspectorEventEditorService.getPointDragStartEventName(),
             PointDragStart,
           ),
           _isTriggerInspectorEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
           (
             MouseDragOver,
             InspectorEventEditorService.getPointDragOverEventName(),
             PointDragOver,
           ),
           _isTriggerInspectorEvent,
         )
      |> InitEventJobUtils.PointEvent.bindMouseEventToTriggerPointEvent(
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
  let _execMouseEventHandle = mouseEvent => {
    StateInspectorEngineService.unsafeGetState()
    |> HandleMouseEventEngineService.execEventHandle(mouseEvent)
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

  let _getInspectorCanvasRect = () => {
    let (width, height) = ResizeUtils.getInspectorCanvasSize();

    (0, 0, width, height);
  };

  let _setEventTarget = (({locationInView, event}: mouseEvent) as mouseEvent) => {
    let editorState = StateEditorService.getState();

    let eventTarget =
      InitEventJobUtils.DomEvent.isTargetNotCanvas(event) ?
        InspectorEventTargetType.Other :
        InitEventJobUtils.DomEvent.isMouseInView(
          locationInView,
          _getInspectorCanvasRect(),
        ) ?
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

  let _mapMouseEventToView = mouseEvent => mouseEvent;

  let fromPCDomEventArr = inspectorEngineState =>
    InitEventJobUtils.DomEvent.fromPCDragDomEventArr(
      (
        _setEventTarget,
        _convertDomEventToMouseEvent,
        _mapMouseEventToView,
        _execMouseDragStartEventHandle,
        _execMouseDragOverEventHandle,
        _execMouseDragDropEventHandle,
      ),
      inspectorEngineState,
    );
};

let initJob = (_, inspectorEngineState) =>
  InitEventJobUtils.initJob(
    (
      InitEventJobUtils.fromDomEventAndHandleError(
        InitEventJobUtils.DomEvent.fromDomEvent(DomEvent.fromPCDomEventArr),
      ),
      PointEvent.bindDomEventToTriggerPointEvent,
    ),
    inspectorEngineState,
  );