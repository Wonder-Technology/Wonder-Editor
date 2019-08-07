external convertToJsObj: Js.Json.t => Js.t({..}) = "%identity";

external convertToString: Js.Json.t => string = "%identity";

let parseJsonConvertJsObj = str =>
  str |> Js.Json.parseExn |> convertToJsObj;