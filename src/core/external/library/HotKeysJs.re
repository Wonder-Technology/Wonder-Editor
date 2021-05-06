type hotkeysHandler;

[@bs.module "wonder-hotkey2/dist/hotkeys"]
external hotkeys :
  (string, (ReactEventRe.Keyboard.t, hotkeysHandler) => unit) => unit =
  "hotkeysConstruct";

[@bs.module "wonder-hotkey2/dist/hotkeys"]
external removeHandlers : unit => unit = "";

[@bs.module "wonder-hotkey2/dist/hotkeys"]
external getIsBind : unit => bool = "";

[@bs.module "wonder-hotkey2/dist/hotkeys"]
external setIsBind : bool => unit = "";

external convertToJsObj : hotkeysHandler => Js.t({..}) = "%identity";