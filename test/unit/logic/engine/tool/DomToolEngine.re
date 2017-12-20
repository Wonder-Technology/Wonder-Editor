open Sinon;

type document;

[@bs.val] external document : document = "";

external documentToObj : document => obj = "%identity";