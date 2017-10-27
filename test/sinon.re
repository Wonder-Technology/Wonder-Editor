type sandbox;

type stub;

/* type stubT; */
/* external sinon:sinonT = "" [@@bs.module("sinon")]; */
/* class type sandbox = {
       pub stub;
   }; */
external createSandbox : unit => sandbox = "create" [@@bs.scope "sandbox"] [@@bs.module "sinon"];

/* external createSandbox:unit => stubT = "sandbox" [@@bs.module("sinon")]; */
external stubEmpty : sandbox => unit => (unit => unit) = "stub" [@@bs.send];

external getCallCount : stub => int = "callCount" [@@bs.get];