type mouseEvent = Wonderjs.EventType.mouseEvent;

type pointEvent = Wonderjs.EventType.pointEvent;

type pointDomEvent = Wonderjs.EventType.pointDomEvent;

type customEvent = Wonderjs.EventType.customEvent;

type userData = Wonderjs.EventType.userData;

type pointEventName =
  | PointTap
  | PointDown
  | PointUp
  | PointMove
  | PointScale
  | PointDrag;

type domEventName =
  | Contextmenu
  | Click
  | MouseDown
  | MouseUp
  | MouseMove
  | MouseWheel
  | MouseDrag
  | KeyUp_GameView
  | KeyDown_GameView
  | KeyPress_GameView
  | TouchTap
  | TouchEnd
  | TouchMove
  | TouchStart
  | TouchDrag
  | KeyUp_SceneView
  | KeyDown_SceneView
  | KeyPress_SceneView;

type eventTarget =
  | Scene
  | Game
  | Other;

type eventRecord = {eventTarget};

external documentToEventTarget :
  WonderWebgl.DomExtendType.document => Dom.eventTarget =
  "%identity";

external bodyToEventTarget : WonderWebgl.DomExtendType.body => Dom.eventTarget =
  "%identity";

external eventTargetToDomEvent : Dom.event => Wonderjs.EventType.domEvent =
  "%identity";

external eventTargetToMouseDomEvent :
  Dom.event => Wonderjs.EventType.mouseDomEvent =
  "%identity";

external eventTargetToKeyboardDomEvent :
  Dom.event => Wonderjs.EventType.keyboardDomEvent =
  "%identity";

external canvasToEventTarget :
  WonderWebgl.DomExtendType.htmlElement => Dom.eventTarget =
  "%identity";

external mouseDomEventToPointDomEvent :
  Wonderjs.EventType.mouseDomEvent => pointDomEvent =
  "%identity";

external pointEventToUserData : pointEvent => Wonderjs.EventType.userData =
  "%identity";

external userDataToMouseEvent : Wonderjs.EventType.userData => mouseEvent =
  "%identity";

external userDataToPointEvent : userData => pointEvent = "%identity";

external editorDomEventNameToEngineDomEventName :
  domEventName => Wonderjs.EventType.domEventName =
  "%identity";