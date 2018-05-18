/* external convertDomEventToStream : Dom.event => stream('a) = "%identity"; */
[@bs.module "most"] external buffer : (Most.stream('a), Most.stream('a)) => Most.stream('a) = "buffer";


