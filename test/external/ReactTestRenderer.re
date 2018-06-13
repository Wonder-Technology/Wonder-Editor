type t;

[@bs.val] [@bs.module "react-test-renderer"]
external create : ReasonReact.reactElement => t = "";

[@bs.send] external toJSON : t => Js.Json.t = "";