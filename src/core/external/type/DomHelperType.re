type document;


external convertDomToJsObj : document => Js.t({..}) = "%identity";