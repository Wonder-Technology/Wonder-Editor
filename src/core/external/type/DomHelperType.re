type document = WonderWebgl.DomExtendType.document ;

type canvas;

external convertDomToJsObj : document => Js.t({..}) = "%identity";

external convertDomElementToJsObj : Dom.element => Js.t({..}) = "%identity";

external canvasToEventTarget : canvas => Dom.eventTarget = "%identity";