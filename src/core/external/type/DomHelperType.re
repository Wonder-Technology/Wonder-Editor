type document;

type canvas;

external convertDomToJsObj : document => Js.t({..}) = "%identity";

external convertDomElementToJsObj : Dom.element => Js.t({..}) = "%identity";

external canvasToEventTarget : canvas => Dom.eventTarget = "%identity";

external wonderjsHtmlElementToCanvas :
  WonderWebgl.DomExtendType.htmlElement => canvas =
  "%identity";