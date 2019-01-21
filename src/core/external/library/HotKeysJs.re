type hotkeysHandler;

[@bs.module "hotkeys-js/dist/hotkeys.esm"]
external hotkeys :
  (string, (ReactEventRe.Keyboard.t, hotkeysHandler) => unit) => unit =
  "default";

external convertToJsObj : hotkeysHandler => Js.t({..}) = "%identity";