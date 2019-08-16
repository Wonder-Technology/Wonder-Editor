external convertJsExnToExn: Js.Exn.t => exn = "%identity";

external convertExnToJsExn: exn => Js.Exn.t = "%identity";

external convertStringToJsExn: string => Js.Exn.t = "%identity";

external convertJsExnToString: Js.Exn.t => string = "%identity";