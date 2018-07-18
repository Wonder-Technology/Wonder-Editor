type domType;

[@bs.val] [@bs.scope "document"]
external createElement : string => domType = "createElement";

[@bs.val] [@bs.scope "document"]
external getElementById : string => Dom.element = "getElementById";

external convertDomToJsObj : domType => Js.t({..}) = "%identity";