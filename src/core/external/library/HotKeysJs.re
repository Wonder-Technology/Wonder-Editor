type hotkeysHandler;

[@bs.module "wonder-hotkey/dist/hotkeys"]
external hotkeys :
  (string, (ReactEventRe.Keyboard.t, hotkeysHandler) => unit) => unit =
  "default";

[@bs.module "wonder-hotkey/dist/hotkeys"]
external removeHandlers : unit => unit = "";

[@bs.module "wonder-hotkey/dist/hotkeys"]
external getIsBind : unit => bool = "";

[@bs.module "wonder-hotkey/dist/hotkeys"]
external setIsBind : bool => unit = "";

external convertToJsObj : hotkeysHandler => Js.t({..}) = "%identity";