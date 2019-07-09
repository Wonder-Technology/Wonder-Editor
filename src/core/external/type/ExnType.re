external convertJsExnToExn: Js.Exn.t => exn = "%identity";

external convertExnToJsExn: exn => Js.Exn.t = "%identity";