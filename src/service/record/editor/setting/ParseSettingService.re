open SettingType;

let convertToRecord = setting => {
  open WonderBsJson.Json;
  open Decode;

  let json = setting;
  {
    debug:
      json
      |> optional(
           field("debug", json =>
             {
               isDebug: json |> field("is_debug", bool),
               showMessage: json |> field("show_message", bool),
             }
           ),
         ),
    redoUndo:
      json
      |> optional(
           field("redo_undo", json =>
             {maxStackSize: json |> field("max_stack_size", int)}
           ),
         ),
    hotKeys:
      json
      |> optional(
           field("hotkeys", json =>
             {
               redo: json |> field("redo", array(string)),
               undo: json |> field("undo", array(string)),
               duplicate: json |> field("duplicate", array(string)),
               delete: json |> field("delete", array(string)),
             }
           ),
         ),
  };
};