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
      |> field(
           "hotkeys",
           array(json =>
             {
               name: json |> field("name", string),
               values: json |> field("values", array(string)),
             }
           ),
         ),
  };
};