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
  | KeyUp
  | KeyDown
  | KeyPress
  | TouchTap
  | TouchEnd
  | TouchMove
  | TouchStart
  | TouchDrag
  | KeyUp_editor
  | KeyDown_editor
  | KeyPress_editor;

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