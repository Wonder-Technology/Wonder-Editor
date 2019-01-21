/* not use: if want use execute yarn add react-hot-keys */
/* module Hotkeys = {
  [@bs.module "react-hot-keys/lib/index"]
  external reactClass : ReasonReact.reactClass = "default";
  let make =
      (
        ~keyName: option(string)=?,
        ~onKeyDown: option((ReactEventRe.Keyboard.t, string) => unit)=?,
        ~onKeyUp: option((ReactEventRe.Keyboard.t, string) => unit)=?,
        children,
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass,
      ~props={
        "keyName": Js.Nullable.fromOption(keyName),
        "onKeyDown": Js.Nullable.fromOption(onKeyDown),
        "onKeyUp": Js.Nullable.fromOption(onKeyUp),
      },
      children,
    );
}; */
