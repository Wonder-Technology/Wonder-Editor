type hotkeysHandler;

[@bs.module "hotkeys-js/dist/hotkeys.common"]
external hotkeys :
  (string, (ReactEventRe.Keyboard.t, hotkeysHandler) => unit) => unit =
  "default";

external convertToJsObj : hotkeysHandler => Js.t({..}) = "%identity";