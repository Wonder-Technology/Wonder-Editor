external convertReactKeyboardEventToJsEvent:
  ReactEventRe.Keyboard.t => Js.t({..}) =
  "%identity";

external convertReactMouseEventToJsEvent: ReactEventRe.Mouse.t => Js.t({..}) =
  "%identity";

external convertReactFormEventToJsEvent: ReactEventRe.Form.t => Js.t({..}) =
  "%identity";