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
  };
};