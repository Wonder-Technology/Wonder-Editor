type document;

type canvas;

external convertDomToJsObj : document => Js.t({..}) = "%identity";

external canvasToEventTarget : canvas => Dom.eventTarget = "%identity";

external wonderjsHtmlElementToCanvas :
  Wonderjs.DomExtendType.htmlElement => canvas =
  "%identity";